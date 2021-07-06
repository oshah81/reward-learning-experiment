% IMPORTANT: YOU NEED TO CHANGE THE LINE FOLLOWING THIS COMMENT TO THE PATH
% OF THE Data FOLDER
basepath = "..\pianolab\data";

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

    participantType = "YoungP";
    if (any(olds(:) == responseID))
        participantType = "Old";
        nantimings = timings(isnan(timings) == 0);
        oldSum(end+1) = mean(nantimings(40:end));
    end

    if (any(pds(:) == responseID))
        participantType = "PD";
        nantimings = timings(isnan(timings) == 0);
        pdSum(end+1) = mean(nantimings(40:end));
    end

    if (any(youngs(:) == responseID))
        participantType = "Young";
        nantimings = timings(isnan(timings) == 0);
        youngSum(end+1) = mean(nantimings(40:end));
    end
    
end

% normalisation phase
youngSum = youngSum(youngSum < 4*std(youngSum));
oldSum = oldSum(oldSum < 4*std(oldSum));
pdSum = pdSum(pdSum < 4*std(pdSum));


resArray = [mean(youngSum) mean(oldSum) mean(pdSum)];
erhigh = [2*std(youngSum) 2*std(oldSum) 2*std(oldSum)];
groups = categorical(["Young", "Old", "PD"]);
groups = reordercats(groups, ["Young", "Old", "PD"]);
bar(groups, resArray, 'cyan');
ylabel("total time / ms");
title("Fig 6: Mean interstroke timings for learning task");

hold on;
errorbar(1, resArray(1), erhigh(1), "linestyle", "none");
errorbar(2, resArray(2), erhigh(2), "linestyle", "none");
errorbar(3, resArray(3), erhigh(3), "linestyle", "none");
hold off;
