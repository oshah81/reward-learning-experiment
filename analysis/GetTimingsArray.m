function timingsArray = GetTimingsArray(eventLog)
% Extracts out the interkeystroke timing intervals for each round from the
% eventLog JSON
%
% The return value is a timingsArray of 180 elements (one per round), each
% containing 

    currentTimestampBucket = zeros(4,1);
    currentBucketIndex = 1;
    timingsArray = zeros(180,1);
    lastTimestamp = NaN;
    for i = 1:numel(eventLog)
        entry = cell2mat(eventLog(i));
        if (entry.round ~= 19)
            continue
        end
        
        if (entry.type == "keydown")
            if (~isnan(lastTimestamp))
                currentTimestampBucket(currentBucketIndex) = entry.time - lastTimestamp;
                currentBucketIndex = currentBucketIndex + 1;
            end
            lastTimestamp = entry.time;
        elseif (entry.type == "startNextRound")
            round = entry.trial;
            if (currentBucketIndex == 1)
                if numel(timingsArray) == 0
                    continue
                end
                row = NaN;
            else
                row = mean(currentTimestampBucket);
            end
            timingsArray(round) = row;
            currentTimestampBucket = zeros(4,1);
            lastTimestamp = NaN;
            currentBucketIndex = 1;
        end
    end
end

