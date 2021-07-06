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
close all;
youngFlips = [];
pdFlips = [];
oldFlips = [];

for i = 1:numel(fileArray)
    f = fileArray(i);

    chartResults = ParseFile(basepath, string(f));

    responseID = string(chartResults{1, "participant"});

    probabilities = table2array(chartResults(:, "probability1"));
    timings = table2array(chartResults(:, "time"));
    y = table2array(chartResults(:, "win1"));
    u = table2array(chartResults(:,"sequence"));

    %% MODEL 5: Perceptual input data modelled with RW and response model modelled with sigmoid

    previousSequence = NaN;
    flip = 0;

    for j = 1:numel(u)
        if (isnan(previousSequence))
            flip = flip + 1;
        end
        if (previousSequence ~= u(j))
            flip = flip + 1;
        end
        previousSequence = u(j);
    end

    if (any(olds(:) == responseID))
        oldFlips(end+1) = flip;
    end

    if (any(pds(:) == responseID))
        pdFlips(end+1) = flip;
    end

    if (any(youngs(:) == responseID))
        youngFlips(end+1) = flip;
    end

end


resArray = [mean(youngFlips) mean(oldFlips) mean(pdFlips)];
erhigh = [2*std(youngFlips) 2*std(oldFlips) 2*std(oldFlips)];
groups = categorical(["Young", "Old", "PD"]);
groups = reordercats(groups, ["Young", "Old", "PD"]);
bar(groups, resArray, 'cyan');
ylabel("Total Flips");
title("Fig 8: Times sequence flipped");

hold on;
errorbar(1, resArray(1), erhigh(1), "linestyle", "none");
errorbar(2, resArray(2), erhigh(2), "linestyle", "none");
errorbar(3, resArray(3), erhigh(3), "linestyle", "none");
hold off;
