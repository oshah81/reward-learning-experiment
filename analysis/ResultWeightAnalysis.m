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

chartResults = ParseFile(basepath, "Complete-R_2EBlQn1G4helUqs-2021-05-21T08_58_05_588Z.json");

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
% ehgf_binary_config.ommu = [NaN -3 -6];

est.model{1} = tapas_fitModel([], y, 'tapas_ehgf_binary_config', 'tapas_unitsq_sgm_config', 'tapas_quasinewton_optim_config');

