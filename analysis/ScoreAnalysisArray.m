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

youngSum = [];
oldSum = [];
pdSum = [];

for i = 1:numel(fileArray)
    f = fileArray(i);
    close all;

    chartResults = ParseFile(basepath, string(f));

    responseID = string(chartResults{1, "participant"});

    probabilities = table2array(chartResults(:, "probability1"));
    timings = table2array(chartResults(:, "time"));
    y = table2array(chartResults(:, "win1"));
    y = y(~isnan(y));

    participantType = "YoungP";
    if (any(olds(:) == responseID))
        participantType = "Old";
        oldSum(end+1) = sum(y)*5;
    end

    if (any(pds(:) == responseID))
        participantType = "PD";
        pdSum(end+1) = sum(y)*5;
    end

    if (any(youngs(:) == responseID))
        participantType = "Young";
        youngSum(end+1) = sum(y)*5;
    end
    
end

%normalisation phase
