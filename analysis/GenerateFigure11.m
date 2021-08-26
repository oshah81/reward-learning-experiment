modelToTest = estModel5;
% Rerun the above line from 1 to 5

close all;

youngSum = getTraj(modelToTest, 'Young');
oldSum = getTraj(modelToTest, 'Old');
pdSum = getTraj(modelToTest, 'PD');

% Hack: Model 3 is based on the classical HGF, which results in
% different learning rate scales. It also has 
youngSum = youngSum(youngSum < 5000);
oldSum = oldSum(oldSum < 5000);
pdSum = pdSum(pdSum < 5000);

resArray = [mean(youngSum) mean(oldSum) mean(pdSum)];
erhigh = [2*std(youngSum) 2*std(oldSum) 2*std(pdSum)];
groups = categorical(["Young", "Old", "PD"]);
groups = reordercats(groups, ["Young", "Old", "PD"]);
bar(groups, resArray);
ylim([0 500]);
ylabel("Belief Uncertainties");

title("Model 5: Comparison of HGF Learning Rates for Young, Old and PD groups");

hold on;
errorbar(1, resArray(1), erhigh(1), "linestyle", "none");
errorbar(2, resArray(2), erhigh(2), "linestyle", "none");
errorbar(3, resArray(3), erhigh(3), "linestyle", "none");
hold off;



function traj = getTraj(estModel1, group)
    traj = [];
    for i = 1:numel(estModel1)
        row = struct2cell(estModel1(i));
        if (numel(row{5}) == 0 || ~isnumeric(row{5}))
            continue
        end
        if (row{3} ~= group)
            continue
        end
        if (isinf(row{5}))
            continue
        end

        traj(end+1) = row{5};
    end
end

