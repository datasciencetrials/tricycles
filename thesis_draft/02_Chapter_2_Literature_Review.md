# CHAPTER TWO
# LITERATURE REVIEW

## 2.1 Introduction
Determining Passenger Car Unit (PCU) values is a basic part of traffic engineering. It allows engineers to take a mix of different vehicles and convert them into a single, standardized number for capacity analysis. However, as public transport in developing countries continues to change—often looking very different from the organized traffic seen in North America or Europe—the existing literature on how to calculate PCU struggles to keep up. This chapter reviews the theories behind PCU estimation, looks at how tricycles operate in mixed traffic, and points out the gaps in current methods, especially regarding the aggressive weaving and heavy congestion we see in Kampala.

## 2.2 Conceptual Review

### 2.2.1 Traffic Heterogeneity
In high-income countries, traffic is generally homogenous. It mainly consists of standard passenger cars that stay in their lanes and move in orderly lines. Traffic engineering manuals, like the Highway Capacity Manual (HCM) in the US, were written specifically for these kinds of conditions (Ahmed, 2020). On the other hand, traffic in Sub-Saharan African cities like Kampala is heterogeneous. It involves a massive mix of vehicle sizes, varying speeds, and unpredictable driving behaviors.

In this kind of environment, a standard passenger car isn't a direct equivalent for a crowded matatu that stops suddenly to pick up passengers, or a group of boda-bodas riding along a pedestrian walkway. This is where the PCU comes in as a conversion factor. It basically measures how much "disruption" or friction a specific vehicle causes compared to a normal car. Big, slow vehicles like trucks usually have high PCUs (like 2.5 or 3.0), while small, quick motorcycles have lower PCUs (around 0.2 to 0.5) (Lera & Kuleno, 2020).

### 2.2.2 The Tricycle Problem
Tricycles (tuk-tuks) present a weird problem in traffic modeling because they sit somewhere between a motorcycle and a car.

**Table 2.1: Physical and Operational Characteristics Comparison**

| Feature | Motorcycles (Boda-bodas) | Tricycles (Tuk-tuks) | Passenger Cars |
| :--- | :--- | :--- | :--- |
| **Typical Width (m)** | 0.7 – 0.8 | 1.3 – 1.5 | 1.5 – 1.8 |
| **Average Speed (km/h)** | 30 – 50 | 20 – 35 | 30 – 60 |
| **Maneuverability** | High | Moderate | Low (Restricted to lanes) |
| **Lane Discipline** | Very Low | Low (Frequent weaving) | High |
| **Kampala Behavior** | Rapid gap acceptance, sidewalk riding | Sudden stops, aggressive merging | Follows queues |

As Table 2.1 shows, tricycles have the same poor lane discipline as boda-bodas, but they aren't nearly as small or agile. When a tricycle tries to weave through a busy intersection like Kibuye Roundabout, its 1.5-meter width usually ends up blocking the passenger cars behind it, forcing them to brake hard. Most existing PCU models assume vehicles either follow the lane rules (like cars) or filter cleanly through the gaps (like motorcycles). They don't have a good way to measure this "blocking friction" caused by tricycles.

## 2.3 Empirical Review of PCU Estimation Methods
Over the years, researchers have developed several methods to estimate PCUs. However, how well they apply to Kampala’s tricycles is a matter of debate.

### 2.3.1 Headway Method
The time headway method is pretty straightforward. It defines PCU as the ratio of the average time headway of a specific vehicle type to the average time headway of a passenger car. The problem is that this method assumes vehicles are following each other in a single straight lane. In Kampala, tricycles often share the exact same lateral space as a motorcycle or ride right on the lane markings, which makes calculating a true "following headway" almost impossible (Chandra & Kumar, 2023).

### 2.3.2 Multiple Linear Regression (MLR) Method
MLR looks at the total time it takes for a mixed group of vehicles to clear a section of road, based on how many vehicles of each class are present. 
The basic equation looks like this:
$$ T = \beta_0 + \beta_1(Cars) + \beta_2(Tricycles) + \beta_3(Motorcycles) + \epsilon $$

In this equation, dividing $\beta_2$ by $\beta_1$ gives you the PCU of the tricycle. Researchers in India really like the MLR method because it captures the total friction of the whole traffic stream (Raj et al., 2018). But MLR only gives a single static value. It doesn't really capture the dynamic reality of Kampala traffic—for instance, how a tricycle's PCU might spike during a rainstorm in Bwaise when flooded potholes force drivers to weave aggressively across the road.

### 2.3.3 Dynamic PCU Estimation
Recently, literature has started leaning towards Dynamic PCU values. These values fluctuate depending on the Volume-to-Capacity (V/C) ratio (how congested the road is) and the proportion of that specific vehicle class in the traffic. Studies in cities like Dhaka and Delhi have shown that as more non-standard vehicles enter the road, their individual PCU value actually goes down because they start "platooning"—grouping together and moving somewhat more efficiently (Rahman et al., 2019).

## 2.4 Tricycles in the African Urban Context
While tuk-tuks have been common in South Asia for decades, their massive growth in Sub-Saharan Africa is relatively new. This boom has been driven mostly by cheap imports from India (brands like Bajaj and TVS) and China, and lately by the introduction of locally assembled electric versions (ChinAfrica, 2024).

In Accra, Ghana, Adams et al. (2014) calculated tricycle PCUs to be between 0.67 and 0.75. But in Indian cities, Raj et al. (2018) observed values ranging from 0.91 all the way up to 1.32. This huge difference proves that PCU isn't just a physical property based on the size of the vehicle; it's a behavioral property that depends heavily on the local driving culture.

### 2.4.1 The Kampala Reality
In Kampala, tricycles are heavily used for transporting goods over short distances (like moving produce from Nakasero market) and for passenger transit in the sprawling suburbs. During the 6:30 PM evening rush hour, these tricycles converge on major bottlenecks like the Bakuli Intersection. Their behavior there is uniquely aggressive; the drivers often use "bullying" tactics against smaller boda-bodas while simultaneously cutting off larger matatus to secure a spot.

## 2.5 Identified Gaps in the Literature
Looking through the existing research on mixed traffic, there are a few glaring gaps that this study aims to fill:

1. **Lack of Behavioral PCUs for Kampala:** There is basically no literature that tries to put a number on the "aggressive weaving" and random mid-lane stopping behaviors that are unique to Kampala's tricycle drivers.
2. **Static vs. Dynamic Deficiencies:** Transport models used in East Africa still rely on static PCUs. They completely ignore the temporal shifts, especially the severe congestion window between 18:30 and 20:00 that JICA identified in their 2022 report.
3. **Simulation Calibration Void:** There are no validated parameters (like standstill distances or lateral clearance thresholds) for tricycles in microsimulation programs like VISSIM specifically tailored for Uganda's traffic conditions.

## 2.6 Conclusion
The literature shows pretty clearly that using imported, static PCU values for Kampala's highly aggressive tricycle fleet doesn't make mathematical sense. If we want to accurately model and solve Kampala's daily congestion problems, we need to establish empirical, dynamic, and locally calibrated PCU values. The next chapter will detail the methodology used to do exactly that.
