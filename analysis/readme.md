# Guide to the analysis scripts #


Here you will find a bunch of matlab scripts used to analyse the data.

## Setup ##

1. These scripts have a dependency on the [tapas analysis toolbox](https://github.com/translationalneuromodeling/tapas). Add it to your matlab path.
2. Add the Old.xlsx, PD.xlsx and Young.xlsx files to the analysis directory.
3. The first line of each file consists of the following:

        basepath = "..\data";
If the data folder is not located in this path, you will need to edit the first line of each file before running.


## AccuracyAnalysis.m ##

This is a model-free analysis which compares the playback accuracy of each group. It counts the number of timedOuts and incorrectPlay rounds for each participant, and produces a bar chart which compares the mean accuracy for each of the three groups.

## GetTimingsArray.m ##

This is a helper function used by all scripts to calculate the inter-keystroke interval for each round.

## HgfSums.m ## 

This file extracts the learning rates for each participant.

## ParseFile.m ##

This is a helper function which parses one of the json files into a matlab table.

## ResultsAnalysis.m ##

This fits all computational models to a specific participant

## ResultsAnalysisMovie.m ##

This creates the **.mp4 movies which plots the specified computational model to all participants

## ScoreAnalysis.m ##

This is a model-free analysis which compares the score for each group.

## TimingAnalysis.m ##

This is a model-free analysis which compares the interkeystroke interval for each group.

## TimingAnalysis2.m ##

The same as TimingAnalysis.m except outliers (any participants with z-scores > 4 for the mean timing) are excluded.
