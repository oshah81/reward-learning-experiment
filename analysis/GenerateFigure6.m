% IMPORTANT: YOU NEED TO CHANGE THE LINE FOLLOWING THIS COMMENT TO THE PATH
% OF THE Data FOLDER
basepath = "..\data";

olds = readcell("Old.xlsx");
olds = olds(:, 1);
olds = olds(2:numel(olds));

youngs = readcell("Young.xlsx");
youngs = youngs(:, 1);
youngs = youngs(2:numel(youngs));

pds = readcell("PD.xlsx");
pds = pds(:, 1);
pds = pds(2:numel(pds));


fileList = dir(basepath + "\" + "Complete-*.json");
fileArray = {fileList.name};


close all;

chartResults = ParseFile(basepath, "Complete-R_2c5jUoTICIYoinD-2021-04-13T12_19_50_636Z.json");

responseID = string(chartResults{1, "participant"});

participantType = "YoungP";
if (any(olds(:) == responseID))
    participantType = "Old";
end

if (any(pds(:) == responseID))
    participantType = "PD";
end

if (any(youngs(:) == responseID))
    participantType = "Young";
end

probabilities = table2array(chartResults(:, "probability1"));
timings = table2array(chartResults(:, "time"));
y = table2array(chartResults(:, "win1"));
u = table2array(chartResults(:,"sequence"));

%% MODEL 1: Perceptual input data modelled with eHGF, and response modelled with Sigmoid function.
%% hyperparameters ommu set to [NaN -4 -7]

ehgf_binary_config = tapas_ehgf_binary_config();
unitsq_sgm_config = tapas_unitsq_sgm_config();

optim_config = tapas_quasinewton_optim_config();

% hyper parameter tuning.
ehgf_binary_config.ommu = [NaN -3 -6];

est.model{1} = tapas_fitModel(y, u, ehgf_binary_config, unitsq_sgm_config, optim_config);

%% MODEL 2: Same as MODEL 1, but with different hyperparameter ommu.
%% hyperparameters ommu set to [NaN -3 -6]
ehgf_binary_config = tapas_ehgf_binary_config();
unitsq_sgm_config = tapas_unitsq_sgm_config();

optim_config = tapas_quasinewton_optim_config();

% hyper parameter tuning.
ehgf_binary_config.ommu = [NaN -3 -6];
ehgf_binary_config.omsa = [NaN 1 4];

est.model{2} = tapas_fitModel(y, u, ehgf_binary_config, unitsq_sgm_config, optim_config);

%% MODEL 4: Perceptual input data modelled with eHGF and response model modelled with mu3 sigmoid
%% See Diaconescu's paper

ehgf_binary_config = tapas_ehgf_binary_config();
ehgf_binary_config.ommu = [NaN -4 -7];

unit_sgm_mu3_config = tapas_unitsq_sgm_mu3_config();

ehgf_binary_config.mu_0mu = [NaN 0 1];
ehgf_binary_config.mu_0sa = [NaN 0 1];
ehgf_binary_config.logsa_0mu = [NaN, log(0.1), log(1)];
ehgf_binary_config.logsa_0sa = [NaN 0 1];

est.model{4} = tapas_fitModel(y, u, ehgf_binary_config, unitsq_sgm_config, optim_config);


%% MODEL 3: Perceptual input data modelled with HGF and response modelled with Sigmoid.
%% hyperparameter omsa set to [NaN 1 4]
hgf_binary_config = tapas_hgf_binary_config();
unitsq_sgm_config = tapas_unitsq_sgm_config();

optim_config = tapas_quasinewton_optim_config();

% hyper parameter tuning.

try
    est.model{3}  = tapas_fitModel(y, u, hgf_binary_config, unitsq_sgm_config, optim_config);
catch
    disp("HGF didn't work");
    est.model{3} = NaN;
end

% Plot results to video frame
tapas_ehgf_binary_plotTraj(est.model{1});

hold on;
plot(1:180, probabilities);
hold off;


figure(2);
subplot(3, 1, 1);
hold on;
yyaxis left;
title(participantType + " participant");
ylabel("Seq 1 prob.");
plot(1:180, probabilities);
yyaxis right;
ylabel("Expectation param");
plot(1:180, est.model{1}.traj.v(:, 1), "color", "red");
hold off;
subplot(3, 1, 2);
ylabel("mean keystroke timing");
plot(1:180, timings);
subplot(3, 1, 3);
xlabel("trial #");
ylabel("learning rate");
plot(1:180, est.model{1}.traj.v(:,1));

hold off;
