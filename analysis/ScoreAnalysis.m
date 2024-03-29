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
youngSum = youngSum(abs(youngSum-mean(youngSum)) < abs(2*std(youngSum)));
oldSum = oldSum(abs(oldSum-mean(oldSum)) < abs(2*std(oldSum)));
pdSum = pdSum(abs(pdSum-mean(pdSum)) < abs(2*std(pdSum)));


resArray = [mean(youngSum) mean(oldSum) mean(pdSum)];
erhigh = [2*std(youngSum) 2*std(oldSum) 2*std(pdSum)];
groups = categorical(["Young", "Old", "PD"]);
groups = reordercats(groups, ["Young", "Old", "PD"]);
bar(groups, resArray);
ylabel("Score");
title("Mean scores achieved during learning task");

hold on;
errorbar(1, resArray(1), erhigh(1), "linestyle", "none");
errorbar(2, resArray(2), erhigh(2), "linestyle", "none");
errorbar(3, resArray(3), erhigh(3), "linestyle", "none");
hold off;
