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

youngsWts = [];
oldsWts = [];
pdsWts = [];
youngspWts = [];


for i = 1:numel(fileArray)
    f = fileArray(i);
    close all;

    chartResults = ParseFile(basepath, string(f));

    % chartResults = ParseFile(basepath, "Complete-R_1LH9HlaQekAstPS-2021-04-14T22_09_58_838Z.json");

    responseID = string(chartResults{1, "participant"});

    if (size(chartResults, 1) ~= 180)
        continue;
    end

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
    %% hyperparameters ommu set to [NaN -3 -6]

    ehgf_binary_config = tapas_ehgf_binary_config();
    unitsq_sgm_config = tapas_unitsq_sgm_config();

    optim_config = tapas_quasinewton_optim_config();

    % hyper parameter tuning.
    ehgf_binary_config.ommu = [NaN -4 -7];

    est.model{1} = tapas_fitModel(y, u, ehgf_binary_config, unitsq_sgm_config, optim_config);

    weights = est.model{1, 1}.traj.wt(:,1);

    if (any(olds(:) == responseID))
        oldsWts(end+1,:) = transpose(weights);
        continue;
    end

    if (any(pds(:) == responseID))
        pdsWts(end+1,:) = transpose(weights);
        continue;
    end

    if (any(youngs(:) == responseID))
        youngsWts(end+1,:) = transpose(weights);
        continue;
    else
        youngspWts(end+1,:) = transpose(weights);
    end

end
