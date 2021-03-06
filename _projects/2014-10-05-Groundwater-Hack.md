---
layout: project-page
title: Groundwater Hack
permalink: /projects/groundwater-hack
name: Groundwater Hack
description: Underwater groundwater device that allows you to determine
  where there is groundwater using everyday equipment.
  Useful for digging for wells in your backyard.
  Project from Science Hack Day 2014
created_date: 2014-10-05
project_link: https://github.com/groundwaterhack/groundwaterhack.github.io
# image: /assets/images/flitr.jpg
# url: /projects/ng-pacman
---

# Low-Cost Groundwater Detection

## Project Details

For Science Hack Day 2014, our team created a low-cost groundwater detection is necessary to measure groundwater usage on a wide scale.

The following is from the presentation given at Science Hack Day.

## Things that you need

- wires
- electrodes
- power source
- voltmeter

## To Measure Resistivity

### Math!

![Groundwater spacing](/assets/images/groundwater-spaced.png)

Space electrodes evenly

![Groundwater outer distance](/assets/images/groundwater-outer.png)

Inject current in OUTER pair

![Groundwater inner distance](/assets/images/groundwater-inner.png)

Measure voltage across INNER pair

![Groundwater depth](/assets/images/groundwater-depth.png)

Depth:

```math
z = a / 2
```

![Groundwater resistivity](/assets/images/groundwater-resistivity.png)

Resistivity:

```math
ρ = 2 π a V/I
```

ρ low = WATER!  
ρ high = DRY!

![Groundwater distance to depth](/assets/images/groundwater-distance.png)

As distance `a` increases, the depth of signal increases

## Recap

![Groundwater prototype](/assets/images/groundwater-goal.png)

- Low-cost groundwater detection is necessary to measure groundwater usage on a wide scale!
- The Arduino was chosen to use for data logging purposes  

## Collaborators

- Mika McKinnon
- Alice Pevyhouse
- Anita Hart
- Jeremy Wong
- with extra help from Christoph, Matthew, Brian, Chris and others
