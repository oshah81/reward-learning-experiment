modelToTest = estModel1;
% Rerun the above line from 1 to 5

close all;

youngSum = getlme(modelToTest, 'Young');
oldSum = getlme(modelToTest, 'Old');
pdSum = getlme(modelToTest, 'PD');

resArray = [mean(youngSum) mean(oldSum) mean(pdSum)];
erhigh = [2*std(youngSum) 2*std(oldSum) 2*std(pdSum)];
groups = categorical(["Young", "Old", "PD"]);
groups = reordercats(groups, ["Young", "Old", "PD"]);
bar(groups, resArray);
ylabel("mean LME (SD)");
title("Model : Comparison of LMEs for Young, Old and PD groups");

hold on;
errorbar(1, resArray(1), erhigh(1), "linestyle", "none");
errorbar(2, resArray(2), erhigh(2), "linestyle", "none");
errorbar(3, resArray(3), erhigh(3), "linestyle", "none");
hold off;



function lme = getlme(estModel1, group)
    lme = [];
    for i = 1:numel(estModel1)
        row = struct2cell(estModel1(i));
        if (~isstring(row{3}))
            continue
        end
        if (row{3} ~= group)
            continue
        end

        lme(end+1) = row{4};
    end

    % Equal probabilities.
end

