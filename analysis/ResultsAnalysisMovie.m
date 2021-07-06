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


youngOutput = VideoWriter("Young.mp4", "MPEG-4");
youngOutput.FrameRate = 1;
open(youngOutput);

youngTimingOutput = VideoWriter("Young-timings.mp4", "MPEG-4");
youngTimingOutput.FrameRate = 1;
open(youngTimingOutput);

oldsOutput = VideoWriter("Old.mp4", "MPEG-4");
oldsOutput.FrameRate = 1;
open(oldsOutput);

oldsTimingOutput = VideoWriter("Old-timings.mp4", "MPEG-4");
oldsTimingOutput.FrameRate = 1;
open(oldsTimingOutput);

pdOutput = VideoWriter("PD.mp4", "MPEG-4");
pdOutput.FrameRate = 1;
open(pdOutput);

pdTimingOutput = VideoWriter("PD-timings.mp4", "MPEG-4");
pdTimingOutput.FrameRate = 1;
open(pdTimingOutput);

youngPOutput = VideoWriter("YoungP.mp4", "MPEG-4");
youngPOutput.FrameRate = 1;
open(youngPOutput);

youngPTimingOutput = VideoWriter("YoungP-timings.mp4", "MPEG-4");
youngPTimingOutput.FrameRate = 1;
open(youngPTimingOutput);


for i = 1:numel(fileArray)
    f = fileArray(i);
    close all;

    chartResults = ParseFile(basepath, string(f));

    % chartResults = ParseFile(basepath, "Complete-R_1EagX5U6YDSVOqg-2021-05-06T10_24_41_443Z.json");

    responseID = string(chartResults{1, "participant"});
    if (size(chartResults, 1) ~= 180)
        continue;
    end

    participantType = "YoungP";
    resultsTo = youngPOutput;
    timingsTo = youngPTimingOutput;

    if (any(olds(:) == responseID))
        participantType = "Old";
        resultsTo = oldsOutput;
        timingsTo = oldsTimingOutput;
    end

    if (any(pds(:) == responseID))
        participantType = "PD";
        resultsTo = pdOutput;
        timingsTo = pdTimingOutput;
    end

    if (any(youngs(:) == responseID))
        participantType = "Young";
        resultsTo = youngOutput;
        timingsTo = youngTimingOutput;
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
    ehgf_binary_config.ommu = [NaN -3 -6];

    est.model{1} = tapas_fitModel(y, u, ehgf_binary_config, unitsq_sgm_config, optim_config);

    % Plot results to video frame


    tapas_ehgf_binary_plotTraj(est.model{1});

    hold on;
    plot(1:180, probabilities);
    hold off;

    frame = getframe(gcf);
    writeVideo(resultsTo, frame);


    figure(2);
    subplot(3, 1, 1);
    hold on;
    yyaxis left;
    title(participantType + " participant");
    ylabel("Seq 1 prob.");
    plot(1:180, probabilities);
    yyaxis right;
    ylabel("Expectation param");
    plot(1:180, est.model{1}.traj.mu(:, 2), "color", "red");
    hold off;
    subplot(3, 1, 2);
    yyaxis left;
    xlabel("trial #");
    ylabel("mean keystroke timing");
    plot(1:180, timings);

    hold off;

    frame = getframe(gcf);
    writeVideo(timingsTo, frame);
    
end

close(youngOutput);
close(youngTimingOutput);
close(oldsOutput);
close(oldsTimingOutput);
close(pdOutput);
close(pdTimingOutput);
