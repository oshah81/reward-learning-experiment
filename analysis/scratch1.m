% tmp = pdsWts(:, :);
% tmp(isnan(tmp)) = 0;
% tmp(isinf(tmp)) = 0;
% tmp(tmp>1e5) = 0;
% sum(sum(tmp))

close all;

resArray = [sum(youngSum) sum(oldSum) sum(pdSum)];
erhigh = [2*std(youngSum) 2*std(oldSum) 2*std(oldSum)];
groups = categorical(["Young", "Old", "PD"]);
groups = reordercats(groups, ["Young", "Old", "PD"]);
bar(groups, resArray);
ylabel("Score");
title("Fig 4: Scores achieved during learning task");

hold on;
errorbar(1, resArray(1), erhigh(1), "linestyle", "none");
errorbar(2, resArray(2), erhigh(2), "linestyle", "none");
errorbar(3, resArray(3), erhigh(3), "linestyle", "none");
hold off;
