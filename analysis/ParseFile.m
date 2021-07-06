function resultTable = ParseFile(basepath, fName)
    %Reads off the 

    tokens = regexp(string(fName), "^Complete-(R_\w+)-2021-(\d\d)-(\d\d)T(\d\d)_(\d\d)_(\d\d)_\d\d\dZ\.json$", "tokens", "ignorecase");
    expandedTokens = tokens{1, 1};

    responseID = expandedTokens{1, 1};
    date = datetime(2021, str2double(expandedTokens{1, 2}), str2double(expandedTokens{1, 3}), str2double(expandedTokens{1, 4}), str2double(expandedTokens{1, 5}), str2double(expandedTokens{1, 6}));

    parsedData = jsondecode(fileread(basepath + "\" + string(fName)));

    eventLog = parsedData.eventLog;
    recognisedTypes = ["winRound" "lostRound" "timedOut" "incorrectPlay"];
    
    resultArray = struct("participant", "", ...
            "screen", 0, ...
            "round", 0, ...
            "probability1", 0.00, ...
            "probability2", 0.00, ...
            "mcsScore", 0.00, ...
            "sequence", 0, ...
            "type", "", ...
            "time", "", ...
            "win1", 1, ...
            "date", datetime("2020-01-01"));

    timingsArray = GetTimingsArray(eventLog);
    
    for i = 1:numel(eventLog)
        eventEntry = cell2mat(eventLog(i));

        if ~any(recognisedTypes == eventEntry.type)
            continue
        end
        
        probability1 = eventEntry.activeProbability;
        probability2 = eventEntry.unchosenProbability;
        if (eventEntry.sequence == "gjhk")
            sequence = 1;
        else
            sequence = 0;
        end
        if (eventEntry.type == "winRound")
            if (sequence == 1)
                win1 = 1;
            else
                win1 = 0;
            end
        elseif (eventEntry.type == "lostRound")
            if (sequence == 1)
                win1 = 1;
            else
                win1 = 0;
            end
        else
            win1 = NaN;
            sequence = NaN;
        end
        meaniki = timingsArray(eventEntry.trial);
        
        row = struct("participant", responseID, ...
            "screen", eventEntry.round, ...
            "round", eventEntry.trial, ...
            "probability1", probability1, ...
            "probability2", probability2, ...
            "mcsScore", eventEntry.mcsScore, ...
            "sequence", sequence, ...
            "type", eventEntry.type, ...
            "time", meaniki, ...
            "win1", win1, ...
            "date", date);

        resultArray(end+1) = row;
    end
    resultArray(1) = [];

    resultTable = struct2table(resultArray);
end

