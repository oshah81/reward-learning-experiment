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
youngFlips = [];
pdFlips = [];
oldFlips = [];
estModel4 = struct("model", 0, ...
    "id", "", ...
    "grouping", "", ...
    "LME", 0.0, ...
    "traj", 0.0);

for i = 1:numel(fileArray)
    f = fileArray(i);

    chartResults = ParseFile(basepath, string(f));

    responseID = string(chartResults{1, "participant"});

    probabilities = table2array(chartResults(:, "probability1"));
    timings = table2array(chartResults(:, "time"));
    y = table2array(chartResults(:, "win1"));
    u = table2array(chartResults(:,"sequence"));


    if (any(olds(:) == responseID))
        participantType = "Old";
    end

    if (any(pds(:) == responseID))
        participantType = "PD";
    end

    if (any(youngs(:) == responseID))
        participantType = "Young";
    end
    
    %% MODEL 4: Perceptual input data modelled with eHGF and response model modelled with mu3 sigmoid
    %% See Diaconescu's paper

    ehgf_binary_config = tapas_ehgf_binary_config();
    ehgf_binary_config.ommu = [NaN -4 -7];

    unit_sgm_mu3_config = tapas_unitsq_sgm_mu3_config();

    ehgf_binary_config.mu_0mu = [NaN 0 1];
    ehgf_binary_config.mu_0sa = [NaN 0 1];
    ehgf_binary_config.logsa_0mu = [NaN, log(0.1), log(1)];
    ehgf_binary_config.logsa_0sa = [NaN 0 1];

    tmpModel = tapas_fitModel(y, u, ehgf_binary_config, unitsq_sgm_config, optim_config);
    tmpTraj = tmpModel.traj.v(2:end,2);
    tmpTraj = tmpTraj(~isnan(tmpTraj));
    participantid = table2array(chartResults(1, "participant"));

    row.model = 1;
    row.id = participantid(1);
    row.grouping = participantType;
    row.LME = tmpModel.optim.LME;
    row.traj = sum(tmpTraj);

    estModel4(i) = row;
end

