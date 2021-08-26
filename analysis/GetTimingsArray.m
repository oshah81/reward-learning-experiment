function timingsArray = GetTimingsArray(eventLog)
% Extracts out the interkeystroke timing intervals for each round from the
% eventLog JSON
%
% The return value is a timingsArray of 180 elements (one per round), each
% containing each of the 
% The firstkey indicates what the sequence was, as determined by the 

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
            rawTime = round(entry.time/2)*2;
            if (~isnan(lastTimestamp))
                currentTimestampBucket(currentBucketIndex) = rawTime - lastTimestamp;
                currentBucketIndex = currentBucketIndex + 1;
            end
            lastTimestamp = rawTime;
        elseif (entry.type == "startNextRound")
            roundNo = entry.trial;
            if (currentBucketIndex == 1)
                if numel(timingsArray) == 0
                    continue
                end
                row = NaN;
            else
                row = mean(currentTimestampBucket);
            end
            timingsArray(roundNo - 1) = row;
            currentTimestampBucket = zeros(4,1);
            lastTimestamp = NaN;
            currentBucketIndex = 1;
        end
    end
end

