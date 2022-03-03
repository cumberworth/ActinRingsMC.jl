var documenterSearchIndex = {"docs":
[{"location":"#ActinRingsMC","page":"Home","title":"ActinRingsMC","text":"","category":"section"},{"location":"#README","page":"Home","title":"README","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"ActinRingsMC","category":"page"},{"location":"#ActinRingsMC","page":"Home","title":"ActinRingsMC","text":"Actin rings Monte Carlo simulation package\n\n(Image: Stable) (Image: Dev) (Image: Build Status) (Image: Coverage) (Image: DOI)\n\nA Julia simulation package with functions for running adaptive umbrella sampling Monte Carlo simulations of crosslinked actin rings.\n\nRepository\n\nDocumentation\n\nThis package implements the simulation protocol outlined in the Supplemental Material of Ref. 1.\n\nInstallation\n\nThe package can be installed by starting the Julia REPL, typing ] to enter package mode, and running\n\nadd ActinRingsMC\n\nto install from the General registry, or by running\n\nadd https://github.com/cumberworth/ActinRingsMC.jl\n\nto install directly from the development repository.\n\nRunning a simulation\n\nIn examples directory of the repository is a script for umbrella sampling. It has both an initial run and a continuation run. The commands can be run in the Julia REPL, or, when in the same directory as the script, it can be run with\n\njulia run-umbrella-sampling.jl\n\nTo achieve good sampling, one should experiment with the number of steps per iteration and the number of iterations.\n\nAnalysis and visualization\n\nThe simulations output two data file types per simulation, or in the case of an umbrella sampling run, per iteration. The file type with an .ops extension contains order parameters saved at steps determined by the write interval and can be read in as a dataframe for analysis and plotting. Currently the order parameters include the energy, lattice height, and ring radius. The file type with a .vtf extension is able to be read by the molecular visualization program, VMD, such that the configurations of the simulations can be spatially visualized. When viewing in VMD, it is recommended to use \"Chain\" for \"Coloring Method\" and \"VDW\" for \"Drawing Method\". The simulations also output a file containing all the system and simulation parameters used in the run to a .parms file.\n\nUmbrella sampling runs output additional file types. The output of these file is based on every step, not only those determined by the write frequency. The top row gives the lattice height (or bin, although binning has not been tested). Each subsequent row contains data from an iteration. .counts gives the number of times each lattice height was visited, .freqs gives a normalized version of this. .biases includes the biases that were used to for that iteration (in contrast to those that would be calculated from its data).\n\nA related python package, actinrings, includes code for analyzing and plotting the output from these simulations, including free energies and ring constriction forces; see its documentation for details.\n\nReferences\n\n[1] A. Cumberworth and P. R. t. Wolde, Constriction of actin rings by passive crosslinkers.\n\nLinks\n\nJulia programming language\n\nReplication analysis package\n\nVMD\n\nLattice\nSimulationParams\nSystem\nSystemParams\ncalc_Lf\ncalc_lf\ncalc_max_lattice_height\ncalc_min_lattice_height\ncalc_radius\ngenerate_starting_config\nrun!\nrun_us!\nupdate_occupancies!\n\n\n\n\n\n","category":"module"},{"location":"#API","page":"Home","title":"API","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Modules = [ActinRingsMC]\nOrder = [:type, :function]\nPrivate = false","category":"page"},{"location":"#ActinRingsMC.Lattice-Tuple{Int64, Int64, Int64}","page":"Home","title":"ActinRingsMC.Lattice","text":"Lattice(height::Int64, max_height::Int64, min_height::Int64) -> Lattice\n\n\n2D lattice with periodic conditions on y.\n\nThe max and min heights should be calculated based on the number of scaffold filaments and the length of the filaments.\n\n\n\n\n\n","category":"method"},{"location":"#ActinRingsMC.SimulationParams","page":"Home","title":"ActinRingsMC.SimulationParams","text":"Simulation parameters.\n\niters::Int64\nNumber of iterations for US\nsteps::Int64\nMC steps for a run or single iteration\nmax_bias_diff::Float64\nMaximum change in bias energy (kbT)\nwrite_interval::Int64\nNumber of steps between writing to output files\nradius_move_freq::Float64\nFrequency of radius moves (the remainder are filament translation moves)\nfilebase::String\nOutput filebase (include filepath)\nanalytical_biases::Bool\nUse analytical model to generation starting biases\nread_biases::Bool\nRead starting biases from file\nbiases_filename::String\nFile to read biases from\nrestart_iter::Int64\nIteration to to start on\nbinwidth::Int64\nWidth of bins for lattice height bias (set to 1 for no binning)\n\n\n\n\n\n","category":"type"},{"location":"#ActinRingsMC.System-Tuple{SystemParams, Vector{ActinRingsMC.Filament}, Float64}","page":"Home","title":"ActinRingsMC.System","text":"System(parms::SystemParams, filaments::Vector{ActinRingsMC.Filament}, radius::Float64) -> System\n\n\nSystem data, including parameters and positions of filaments.\n\nThe given radius should be that corresponding to the lattice height used to create the lattice and the starting configuration of the filaments.\n\n\n\n\n\n","category":"method"},{"location":"#ActinRingsMC.SystemParams","page":"Home","title":"ActinRingsMC.SystemParams","text":"System parameters.\n\nks::Float64\nDissociation constant for single crosslinker binding\nkd::Float64\nDissociation constant for double crosslinker binding\nT::Float64\nTemperature (K)\ndelta::Float64\nLattice spacing (m)\nXc::Float64\nCrosslinker concentration (M)\nEI::Float64\nBending rigidity (N m^2)\nLf::Float64\nFilament length (m)\nlf::Int64\nBinding sites per filament\nNfil::Int64\nTotal number of filaments\nNsca::Int64\nNumber of scaffold filaments\n\n\n\n\n\n","category":"type"},{"location":"#ActinRingsMC.calc_Lf-Tuple{Int64, Float64}","page":"Home","title":"ActinRingsMC.calc_Lf","text":"calc_Lf(lf::Int64, delta::Float64) -> Float64\n\n\nCalculate the length of a filament.\n\n\n\n\n\n","category":"method"},{"location":"#ActinRingsMC.calc_lf-Tuple{Float64, Float64}","page":"Home","title":"ActinRingsMC.calc_lf","text":"calc_lf(Lf::Float64, delta::Float64) -> Int64\n\n\nCalculate the number of sites per filament.\n\n\n\n\n\n","category":"method"},{"location":"#ActinRingsMC.calc_max_lattice_height-Tuple{Int64, Int64}","page":"Home","title":"ActinRingsMC.calc_max_lattice_height","text":"calc_max_lattice_height(Nsca::Int64, lf::Int64) -> Int64\n\n\nCalculate the maximum allowable height of a lattice given Nsca.\n\n\n\n\n\n","category":"method"},{"location":"#ActinRingsMC.calc_min_lattice_height-Tuple{Int64, Int64}","page":"Home","title":"ActinRingsMC.calc_min_lattice_height","text":"calc_min_lattice_height(Nsca::Int64, lf::Int64) -> Int64\n\n\nCalculate the minimum allowable height of a lattice given Nsca.\n\n\n\n\n\n","category":"method"},{"location":"#ActinRingsMC.calc_radius-Tuple{Float64, Int64}","page":"Home","title":"ActinRingsMC.calc_radius","text":"calc_radius(delta::Float64, height::Int64) -> Float64\n\n\nCalculate the radius of a ring for a given lattice height.\n\n\n\n\n\n","category":"method"},{"location":"#ActinRingsMC.generate_starting_config-Tuple{Lattice, Int64, Int64, Int64, Int64}","page":"Home","title":"ActinRingsMC.generate_starting_config","text":"generate_starting_config(lattice::Lattice, Nfil::Int64, Nsca::Int64, lf::Int64, overlap::Int64) -> Vector{ActinRingsMC.Filament}\n\n\nGenerate a starting configuration with uniform overlaps.\n\nThe number of scaffold filament Nsca and the number of lattices lf must be even.\n\n\n\n\n\n","category":"method"},{"location":"#ActinRingsMC.run!-Tuple{System, Lattice, SimulationParams, ActinRingsMC.Biases, IOStream, IOStream}","page":"Home","title":"ActinRingsMC.run!","text":"run!(system::System, lattice::Lattice, simparms::SimulationParams, biases::ActinRingsMC.Biases, ops_file::IOStream, vtf_file::IOStream)\n\n\nRun an MC simulation.\n\n\n\n\n\n","category":"method"},{"location":"#ActinRingsMC.run!-Tuple{System, Lattice, SimulationParams}","page":"Home","title":"ActinRingsMC.run!","text":"run!(system::System, lattice::Lattice, simparms::SimulationParams)\n\n\nRun an MC simulation.\n\n\n\n\n\n","category":"method"},{"location":"#ActinRingsMC.run_us!-Tuple{System, Lattice, SimulationParams}","page":"Home","title":"ActinRingsMC.run_us!","text":"run_us!(system::System, lattice::Lattice, simparms::SimulationParams)\n\n\nRun an umbrella sampling MC simulation.\n\n\n\n\n\n","category":"method"},{"location":"#ActinRingsMC.update_occupancies!-Tuple{Vector{ActinRingsMC.Filament}, Lattice}","page":"Home","title":"ActinRingsMC.update_occupancies!","text":"update_occupancies!(filaments::Vector{ActinRingsMC.Filament}, lattice::Lattice)\n\n\nClear occupancies and fully update.\n\n\n\n\n\n","category":"method"}]
}
