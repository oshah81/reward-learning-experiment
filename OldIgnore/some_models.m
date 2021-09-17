
ehgf_binary_config = tapas_ehgf_binary_config()
hgf_binary_config = tapas_hgf_binary_config()

%response model config
unitsq_sgm_config = tapas_unitsq_sgm_config()

% algorithm config
optim_config = tapas_quasinewton_optim_config()






%% Model 1a:  eHGF Perceptual and Sigmoid Response model

ehgf_binary_config.ommu = [NaN -4 -7]; % default  -3 -6
% ehgf_binary_config.omsa = [NaN 4 4]; 

est.model{1}  = tapas_fitModel(y, u, ehgf_binary_config, unitsq_sgm_config, optim_config)



%% Model 1b: eHGF Perceptual and Sigmoid Response model
ehgf_binary_config.omsa = [NaN 1 4]; % default  -3 -6
est.model{2}  = tapas_fitModel(y, u, ehgf_binary_config, unitsq_sgm_config, optim_config)


%% Model 3: HGF Perceptual and Sigmoid Response model
est.model{3}  = tapas_fitModel(y, u, hgf_binary_config, unitsq_sgm_config, optim_config)



%% Model 4a eHGF Perceptual and  Mu3 Sigmoid Response model (Diaconescu)
ehgf_binary_config = tapas_ehgf_binary_config();
ehgf_binary_config.ommu = [NaN -4 -7]; % 

unitsq_sgm_mu3_config = tapas_unitsq_sgm_mu3_config(); % Diaconescu

% The initial values mu3_0 and sigma3_0 in 'tapas_ehgf_binary_config' need to be free parametes
% We allow them to be freely estimated by making the initial variance different than 0, and using the priors from our paper:
ehgf_binary_config.mu_0mu = [NaN, 0, 1];
ehgf_binary_config.mu_0sa = [NaN, 0, 1];
ehgf_binary_config.logsa_0mu = [NaN,   log(0.1), log(1)];
ehgf_binary_config.logsa_0sa = [NaN,  0,     1];

est.model{4}  = tapas_fitModel(y, u, ehgf_binary_config, unitsq_sgm_config, optim_config)



%% Model 4b eHGF Perceptual and Mu3 Sigmoid Response model (Diaconescu)
ehgf_binary_config.omsa = [NaN 1 4]; % default  -3 -6
est.model{5}  = tapas_fitModel(y, u, ehgf_binary_config, unitsq_sgm_config, optim_config)




