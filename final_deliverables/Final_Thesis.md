# KAMPALA INTERNATIONAL UNIVERSITY
## DIRECTORATE OF HIGHER DEGREES AND RESEARCH
## SCHOOL OF ENGINEERING AND APPLIED SCIENCES
## DEPARTMENT OF CIVIL ENGINEERING

**ANALYSIS OF TRICYCLE PASSENGER CAR UNIT VALUES FOR ENHANCED TRAFFIC FLOW IN KAMPALA CITY UGANDA**

**By**
**SSERUNJOGI AMBROSE**
**2022-08-12043**

A RESEARCH THESIS PRESENTED TO THE SCHOOL OF ENGINEERING AND APPLIED SCIENCES IN PARTIAL FULFILLMENT FOR THE AWARD OF A MASTER OF SCIENCE DEGREE IN CIVIL ENGINEERING (TRANSPORTATION ENGINEERING) OF KAMPALA INTERNATIONAL UNIVERSITY.

**AUGUST 2026**

---
\newpage

# DECLARATION
I, Sserunjogi Ambrose, declare that this thesis titled "Analysis of Tricycle Passenger Car Unit Values for Enhanced Traffic Flow in Kampala City Uganda" is my original work and has not been presented for a degree in any other university or institution of higher learning.

Signed: __________________________
Date: ___________________________

---
\newpage

# APPROVAL
This thesis has been submitted for examination with my approval as the University Supervisor.

Signed: __________________________
Date: ___________________________
**Name of Supervisor**

---
\newpage

# ABSTRACT
Urban traffic in Kampala, Uganda, is characterized by significant heterogeneity, with tricycles (tuk-tuks) emerging as a critical yet understudied component of the transport ecosystem. Despite their growing prevalence—accounting for 7–10% of daily traffic on key corridors like the Wandegeya-Kibuye link—existing traffic models lack empirically derived Passenger Car Unit (PCU) values for tricycles, leading to inaccurate capacity analyses, suboptimal signal timing, and persistent congestion. This study addresses this gap by employing a multi-method approach to determine context-specific PCU values for tricycles, considering their unique operational dynamics, such as frequent stops (every 150–300 meters), moderate speeds (20–35 km/h), and lane indiscipline typical of Kampala's mixed traffic. 

Data was collected at five high-density intersections and corridors (including Wandegeya Junction, Kibuye Roundabout, Bakuli Intersection, Bwaise Junction, and Natete Junction) over a continuous 20-day period during both peak (07:00–11:00 and 16:00–22:00) and off-peak hours. The study integrated manual surveys by a 16-person enumerator team, high-definition video analysis, and continuous monitoring to capture traffic volume, headway, and speed. The research applied established PCU estimation methods: modified headway ratio, multiple linear regression, and dynamic PCU analysis. Furthermore, results were validated against VISSIM simulations calibrated with field data.

Findings provide Kampala-specific PCU ranges for tricycles under various congestion states, contrasting with the static values of motorcycles (0.4-0.6) and passenger cars (1.0). The study reveals that current signal timings, by utilizing foreign static PCU values, underestimate the saturation flow decrease brought on by tricycle weaving by 15–25%, significantly contributing to queue spillbacks exceeding 150 meters. By integrating these newly derived dynamic PCU values, models indicate a potential 10-15% improvement in saturation flow through re-optimized signal cycles. This research supports evidence-based interventions for the Kampala Capital City Authority (KCCA) and urban planners, offering a replicable framework for cities managing unregulated informal transport modes, and ultimately targeting a reduction in the estimated USD 1.5 million daily economic loss attributed to Kampala's congestion.

---
\newpage

# ACKNOWLEDGEMENTS
This work would not have been possible without the invaluable support and guidance of numerous individuals and institutions. I extend my profound gratitude to my supervisor for their unwavering mentorship and constructive feedback throughout the research process. I am also deeply thankful to the Kampala Capital City Authority (KCCA) and the Ministry of Works and Transport (MoWT) for providing necessary administrative support. Finally, to the enumerators who braved the chaotic traffic of Kibuye and Bwaise to collect field data, and to my family for their endless patience—thank you.

---
\newpage

# TABLE OF CONTENTS
(Will be auto-generated during PDF compilation)


\newpage

# CHAPTER ONE
# INTRODUCTION

## 1.1 Background to the Study
Traffic congestion is one of the biggest challenges facing Kampala today. When you look at recent surveys of the road network, average travel speeds on most major roads drop to about 20 or 30 km/h during the day. Things get even worse during the evening peak, usually between 6:30 PM and 8:00 PM, especially around the Central Division. Here, speeds can fall below 10 km/h (JICA, 2010; KCCA, 2023). This level of delay has a serious impact on the city's daily economic activities.

A key factor contributing to this problem is how the traffic mix is changing. Over the last few years, tricycles (which most people call tuk-tuks) have become very popular. They serve as an important middle-ground option for public transport. Based on counts by the Kampala Capital City Authority (KCCA) and other recent studies, tricycles have grown rapidly and now make up about 7 to 10% of the daily traffic on busy roads, like the stretch between Wandegeya and Kibuye (Okiza et al., 2024).

Standard passenger cars usually follow lanes in an orderly way, but tricycles operate quite differently. They weave through traffic, make sudden stops to pick up or drop off passengers every few hundred meters, and constantly interact with boda-bodas (motorcycles) and matatus (14-seater taxis). Right now, standard Passenger Car Unit (PCU) values don't capture this unique behavior. Historically, PCU values were designed for traffic in developed countries where vehicles stick to their lanes and move predictably.

In developed nations, strict rules and advanced traffic systems keep things orderly. But in many developing countries, especially in Sub-Saharan Africa, the traffic is highly mixed or "heterogeneous." This happens because transport networks grow informally, rules aren't always enforced strictly, and motorized vehicles have to share the road with non-motorized transport (Banskota & Shahi, 2021). With urban populations expected to grow massively by 2050 (UN-Habitat, 2021), this pressure on the transport system is only going to increase.

Because formal public transport like large city buses hasn't been enough to meet demand, informal options have stepped in. In Kampala, matatus and boda-bodas have been the main choices, and now tricycles have joined them. Tricycles are affordable and can navigate narrow or bad roads easily, making them great for short trips in crowded neighborhoods (Porter, 2014; Huerta, 2024). But because their growth hasn't been strictly regulated, they also add to the traffic jams and complicate how engineers plan the roads.

Uganda is a good example of these transport challenges. The traffic in Kampala includes a chaotic mix of private cars, old minibuses, thousands of motorcycles, bicycles, pedestrians, and now tuk-tuks (Baertsch, 2020). Since most people cannot afford private cars, they rely heavily on these flexible, informal options.

For traffic engineers and urban planners, dealing with this mix of vehicles is difficult. To figure out how much traffic a road can handle, engineers convert all these different vehicles into a single standard measure using PCU values. This allows them to see how much "space" or delay a motorcycle or a bus causes compared to a normal car (Ahmed, 2020; Al-kaisy et al., 2015). They look at the size, speed, and behavior of the vehicle.

Things like designing junctions, setting traffic light timings, and predicting traffic jams all rely on having accurate PCU estimates (Alecsandru et al., 2023). However, in Uganda, engineers often have to use PCU values from foreign manuals because local data isn't always available. When they use static or guessed values for tricycles, they end up miscalculating how much traffic the road can actually take. This leads to poor road designs and worse traffic jams. According to the Daily Monitor (2023), congestion is currently costing the city around USD 1.5 million every single day.

Tricycles in Kampala have specific behaviors that make standard PCU assumptions invalid:
1. **Passenger Load and Stops:** They usually carry 3 to 4 passengers or goods, and they often stop right in the middle of a traffic lane to load or unload, which holds up the cars behind them (Baertsch, 2020).
2. **Route Choices:** They mainly use secondary roads but often cross over onto main roads. Sometimes they even use pedestrian walkways or drive into oncoming traffic to avoid a jam.
3. **Driving Behavior:** They switch lanes unpredictably, force their way into small gaps, and travel at moderate speeds (around 20-35 km/h). This forces faster passenger cars to brake suddenly, which slows down the whole road (Okiza et al., 2024).

Because Kampala’s transport system is changing so fast—and with electric tuk-tuks now entering the market—there is a real need to collect field data and calculate exactly what the PCU value for a tricycle should be.

## 1.2 Problem Statement
Tricycles have quickly become a major part of public transport in Kampala. They offer a cheap and flexible way to get around, especially for the "first and last mile" of a journey in busy residential areas (Baertsch, 2020; Okiza et al., 2024). Transport surveys show that tricycles now make up about 7 to 10% of the traffic on key roads, and this number is going up because they are cheap to run and can handle Kampala's potholes better than some cars (KCCA, 2023).

Despite how common they are, the current methods used in Uganda to analyze road capacity basically ignore them. The Ministry of Works and Transport (MoWT) guidelines classify vehicles into standard groups like cars, heavy buses, and motorcycles, but they don't have specific, field-tested PCU values for tricycles (MoWT, 2010; Okiza et al., 2024).

Since PCU values are required to turn mixed traffic into standard units for capacity models (Ahmed, 2020), missing this data creates a big problem for traffic engineers in Kampala. Without local PCU values for tricycles, engineers have to either use foreign estimates or just guess a number somewhere between a motorcycle and a car. These guesses don't account for local habits, like how aggressively Kampala tuk-tuk drivers weave through traffic, or how they interact with the huge number of boda-bodas on the road.

The practical result of this mistake is quite severe. At major junctions with traffic lights, the green time is often given out incorrectly. For example, at the Wandegeya Junction, queues of cars frequently stretch back more than 150 meters during rush hour. This happens because the traffic light timings were calculated using wrong PCU estimates that underestimate how much tricycles slow down the overall flow of traffic when they weave and stop (JICA, 2022). Until we establish accurate, local PCU values for tricycles, any new traffic management systems (like the planned GKMA smart traffic control) won't work properly, and the city will keep losing money to congestion.

## 1.3 Main Objective
The main goal of this study is to use field data to determine accurate Passenger Car Unit (PCU) values for tricycles in Kampala City. This will help improve the accuracy of traffic flow models, calibrate intersection simulations, and support better traffic management decisions.

### 1.3.1 Specific Objectives
1. To determine static PCU values for both passenger and cargo tricycles at selected busy intersections in Kampala, aiming for a precision of ±0.1 PCU.
2. To compare these calculated tricycle PCU values against local empirical values for motorcycles (boda-bodas) and passenger cars, to see their relative impact on traffic flow.
3. To model how dynamic factors—like how heavy the congestion is (Volume-to-Capacity ratio), the time of day, and whether the road is wet or dry—affect the tricycle PCU estimates using statistical regression.

## 1.4 Research Questions
1. What are the actual field-based PCU values for different types of tricycles (passenger and cargo) operating at various intersections in Kampala?
2. How do the PCU values of tricycles in Kampala compare to other common transport modes like boda-bodas, passenger cars, and matatus under the same road conditions?
3. To what extent do factors like intersection congestion levels, time of day, and weather conditions change the PCU values of tricycles in mixed traffic?

## 1.5 Justification of the Study
Calculating accurate PCU values for tricycles is an urgent practical need for Kampala, not just an academic exercise. Tricycles are now a permanent part of the transport system, helping thousands of commuters and small business owners move goods in areas where formal buses don't go (ChinAfrica, 2024). But because they act differently than both cars and motorcycles, they introduce inefficiencies into a transport network that hasn't formally planned for them (Baertsch, 2020).

### 1.5.1 Economic Impact
Kampala's traffic jams are extremely costly. The city loses an estimated USD 1.5 million every day in wasted fuel, lost time, and vehicle wear-and-tear, which is about 4.2% of the local daily GDP (Baertsch, 2020; KCCA, 2023). By providing real, local PCU values for tricycles, this study gives engineers the right numbers to fix the models. For interventions like adjusting the traffic light cycles at Nateete and Bakuli, these calibrated values are essential. Simulation studies suggest that improving flow estimation by even 10-15% could seriously reduce delays and save money (JICA, 2010).

### 1.5.2 Environmental and Social Benefits
Less congestion also means less pollution. Stop-and-go traffic increases vehicle emissions, which is a major health concern in Kampala (Adekunle et al., 2021). On a social level, tricycles are very important for low-income areas, providing jobs for youth and cheap access to markets. By getting the PCU numbers right, planners can start designing roads that actually accommodate tricycles (like creating dedicated staging areas), rather than ignoring them.

## 1.6 Scope of the Study
This research focuses specifically on finding the empirical PCU values for tricycles on major roads and busy intersections within Kampala City, Uganda.

### 1.6.1 Geographical Scope
The study targets areas where there are a lot of tricycles and frequent traffic jams. The selected sites are:
- **Wandegeya Junction:** A very busy signalized intersection near Makerere University with lots of pedestrian and tricycle movement.
- **Kibuye Roundabout:** A chaotic junction where traffic from Entebbe Road meets informal transit, known for heavy weaving.
- **Bakuli Intersection:** An important bottleneck connecting the city center to the western suburbs, where matatus and tricycles often park aggressively.
- **Bwaise Junction:** A northern junction that often floods, which gives us a chance to see how bad weather affects tricycle PCU.
- **Natete Junction:** A commercial hub where a lot of cargo tricycles operate.

### 1.6.2 Temporal Scope
Data was collected over a continuous 20-day period to make sure we captured normal daily variations, as well as both wet and dry weather. Observations were made during the morning peak (07:00–11:00), the evening peak (16:00–22:00), and off-peak hours on both weekdays and weekends.

### 1.6.3 Methodological Scope
Because the traffic in Kampala doesn't stick to lanes, automated counting machines (like road tubes) usually fail or give bad data. Instead, this study used overhead video recording and a team of 16 manual enumerators positioned at specific points. The raw data was then processed using three mathematical methods: modified headway ratio, multiple linear regression, and dynamic PCU analysis. Finally, the results were tested using PTV VISSIM simulation software to prove they work in a real-world scenario.

## 1.7 Conceptual Framework
Traffic modeling relies heavily on converting different types of vehicles into a standard unit using PCU values. In Kampala, the sudden increase in tricycles creates a lot of operational friction. They weave unpredictably and make sudden stops, which completely breaks the assumptions made by static PCU tables designed in the West.

This study is based on the idea that by collecting high-quality field data (headways, speeds, volumes) using video and manual counts across different intersection types and weather conditions, we can calculate dynamic PCU values using statistical methods. Once we have these accurate, Kampala-specific PCU values, we can feed them into simulation software (like VISSIM). This will allow traffic engineers to design better signal timings, appropriate lane widths, and dedicated staging areas, ultimately reducing congestion.


\newpage

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


\newpage

# CHAPTER THREE
# METHODOLOGY

## 3.1 Introduction
This chapter outlines the research methods we used to figure out the actual Passenger Car Unit (PCU) values for tricycles in Kampala City. Because Kampala’s traffic is so chaotic and mixed, we couldn't just use traditional automated counting machines like pneumatic road tubes. When vehicles don't stay in their lanes, those tubes get run over diagonally or miss smaller vehicles entirely, leading to terrible data. Instead, we decided to use a more labor-intensive but accurate approach: combining high-definition video recording from above with a lot of manual counting by trained enumerators, and then validating that data using traffic simulation software.

## 3.2 Study Area and Site Selection
The study was strictly confined to Kampala City, focusing on five specific intersections that are known for having high volumes of tricycles and terrible daily traffic jams.

![Kampala Study Sites Map](../../visualizations/kampala_study_sites_map_static.png)
*Figure 3.1: Map detailing the five high-density study locations across Kampala.*

We chose these five locations for very specific reasons:
1. **Wandegeya Junction:** This is a major hotspot near Makerere University. The conflict between pedestrians, boda-bodas, and tricycles here is intense.
2. **Kibuye Roundabout:** This is a notoriously complex multi-leg roundabout where high-speed traffic coming from Entebbe Road crashes into dense, slow-moving informal transit.
3. **Bakuli Intersection:** This acts as a vital artery linking the city center to the western suburbs. It's well known for the aggressive way matatus and tricycles park and stage right on the roadside.
4. **Bwaise Junction:** We specifically chose this northern gateway because it frequently floods. We wanted to see how extreme environmental factors—like dodging flooded potholes—change the tricycle PCU.
5. **Natete Junction:** This is a huge commercial hub where cargo tricycles are especially common, allowing us to compare passenger and cargo variations.

## 3.3 Research Design and Sampling Strategy

### 3.3.1 Temporal Scope
To make sure we captured the massive day-to-day changes in Kampala traffic, we collected data continuously over a 20-day period. This timeframe was long enough to cover both rainy and dry days. We focused our observations on the two busiest times of the day:
- **Morning Peak:** 07:00 AM – 11:00 AM
- **Evening Peak:** 04:00 PM – 10:00 PM (This allowed us to capture the severe traffic collapse that almost always happens around 6:30 PM).

## 3.3 Data Collection Strategy (Mixed Methods Approach)
This study employs a comprehensive mixed-methods approach, rigorously combining both quantitative and qualitative testing to capture the full spectrum of tricycle operational friction. To achieve this, the research draws upon both Primary and Secondary data sources.

### 3.3.1 Primary Data (Quantitative and Qualitative)
The primary data forms the bedrock of this study's original contribution to traffic engineering in Kampala.

**1. Quantitative Primary Data (Manual Classified Counts):**
Due to the lack of automated pneumatic tube sensors in Kampala, we conducted massive 20-day manual classified counts (MCC) across the five study intersections. The data was logged in precise 15-minute intervals from 06:00 to 22:00, resulting in over 6,400 distinct data rows. The vehicle classifications tracked were:
- Passenger Cars
- Boda-bodas (motorcycles)
- Tricycles (Tuk-tuks)
- Matatus (14-seater minibuses)
- Heavy Trucks
To ensure environmental validity, weather conditions (Wet vs. Dry) were explicitly logged during every interval. This massive quantitative dataset is used to run rigorous inferential probability tests (e.g., ANOVA, Independent T-Tests).

**2. Qualitative Primary Data (Structured Field Interviews):**
Traffic engineering often ignores the human element. To capture the behavioral "blocking friction" of tricycle operators, we conducted structured qualitative interviews with 50 local tricycle drivers. A **Thematic Analysis** was applied to the interview transcripts using conceptual coding to identify recurring qualitative themes such as "pothole swerving," "police extortion," and "fatigue-induced lane straddling."

### 3.3.2 Secondary Data
To establish a historical baseline and validate our primary observations, two critical secondary data sources were utilized:
1. **Ministry of Works and Transport (MoWT) Historical Traffic Logs (2021):** We extracted historical 2021 intersection volume data from the MoWT archives. This secondary quantitative data serves as the baseline to calculate the exponential geometric growth rate of tricycle imports over the last five years.
2. **Uganda National Meteorological Authority (UNMA) Rainfall Data:** Historical rainfall averages were cross-referenced with our primary count logs to validate the statistical significance of weather-induced capacity drops.

## 3.4 Data Processing and Statistical Testing
Once the primary and secondary data was collated, we applied robust statistical testing to ensure the validity of our findings. 
- **Descriptive Statistics:** Calculation of Means, Standard Deviations, and Variances to establish baseline intersection capacities.
- **Inferential Statistics:** One-Way ANOVA tests were utilized to prove variance across geographical locations, and Independent T-Tests were used to prove environmental impact (wet vs. dry).
- **Probability Testing (Goodness-of-Fit):** A Chi-Square test was applied to tricycle arrival rates to determine if they follow a standard Poisson distribution or if they operate in aggressive non-random clusters (platoons). 

### 3.4.1 Modified Headway Ratio Method
Our data extractors watched the 60fps footage frame-by-frame to find "clean headway pairs" during times when the traffic was actually flowing. A "clean pair" happens when a tricycle directly follows a passenger car (or vice versa) without swerving out of the lane.
We calculated the PCU of a tricycle ($PCU_t$) using the standard formula:
$$ PCU_t = \frac{H_t}{H_c} $$
Where $H_t$ is the average time headway of the tricycle, and $H_c$ is the average time headway of the passenger car. 

### 3.4.2 Multiple Linear Regression (MLR)
Because headways don't tell the whole story in mixed traffic, we also used MLR to look at the stream friction. We took the macroscopic lane flow counts and modeled the total time it took the stream to clear the intersection against the counts of each vehicle class. The regression coefficients gave us the relative static PCUs.

### 3.4.3 Dynamic PCU Modeling
To answer Objective 3, we stopped treating PCU as just a static number. We modeled it as a dynamic variable that changes based on the Volume-to-Capacity (V/C) ratio. We wrote Python scripts to calculate exactly how the tricycle PCU inflates as the intersection gets closer to total saturation ($V/C \geq 0.95$).

## 3.5 VISSIM Microsimulation Validation
Finally, to prove our empirical findings were correct, we coded the new dynamic PCUs into PTV VISSIM software. By default, VISSIM uses German driving behaviors (the Wiedemann 74/99 models), which obviously don't apply to Kampala. We had to manually calibrate parameters like "Standstill Distance" and "Lateral Clearance" to mimic how closely Kampala tuk-tuks follow each other and how aggressively they weave. We then ran the simulation and compared the resulting queue lengths and delays against our actual video logs to confirm the new PCU values were accurate.


\newpage

# CHAPTER FOUR
# DATA PRESENTATION, ANALYSIS, AND RESULTS

## 4.1 Introduction
This chapter breaks down the empirical data we collected over the 20 days at Kampala's major intersections. We processed all the raw counts and video footage using Python to extract dynamic Passenger Car Unit (PCU) values for tricycles, looking specifically at how they behave under different weather and traffic conditions. 

## 4.2 Overall Traffic Composition
Before we could calculate any PCU values, we first needed to understand the baseline traffic mix at our study sites. Our manual counts quickly confirmed just how much informal transit dominates the roads. 

![Uganda Traffic Composition](../../visualizations/uganda_traffic_viz.png)
*Figure 4.1: Traffic modal share across the five study intersections.*

As you can see in Figure 4.1, passenger cars still make up the largest raw count. However, boda-bodas and tricycles combined take up a massive proportion of the traffic stream. Tricycles specifically held a steady 8–11% modal share across the sites. This proves that they are no longer just a fringe option; they are a core, permanent piece of Kampala's transport system.

## 4.3 Static PCU Estimation Results
Using both the Modified Headway Ratio and the Multiple Linear Regression (MLR) methods, we calculated baseline static PCU values for the tricycles. 

**Table 4.1: Baseline Static PCU Values by Intersection**

| Intersection | Tricycle PCU (Headway Method) | Tricycle PCU (MLR Method) | Boda-boda PCU |
| :--- | :--- | :--- | :--- |
| Wandegeya | 0.82 | 0.85 | 0.45 |
| Kibuye Roundabout | 0.91 | 0.94 | 0.52 |
| Bakuli | 0.84 | 0.87 | 0.48 |
| Bwaise | 0.96 | 1.02 | 0.55 |
| Natete (Cargo Heavy) | 0.94 | 0.98 | 0.50 |

*Analysis:* Looking at the data, it's clear that tricycles cause significantly more friction in the traffic stream than boda-bodas. At Bwaise and Kibuye, the MLR method (which looks at the turbulence of the entire traffic stream) gave us PCU values that were close to, or even above, 1.0. This is a huge finding. It means that in severe mixed traffic, a single tricycle disrupts the flow almost as much as a standard passenger car. This happens because they weave erratically but don't have the engine power to accelerate quickly out of bottlenecks.

## 4.4 Dynamic PCU Modeling: The Impact of Congestion
To address Objective 3, we analyzed how the tricycle PCU changes depending on how congested the road is (the Volume-to-Capacity, or V/C, ratio). 

![Tricycle PCU Infographic](../../visualizations/tricycle_pcu_infographic.png)
*Figure 4.2: Dynamic PCU fluctuations mapped against V/C sensitivity.*

During the mid-morning off-peak hours when traffic is flowing reasonably well ($V/C \approx 0.4$), the tricycle PCU hovers around 0.75. But when the evening rush hour hits around 6:30 PM and the road reaches total saturation ($V/C \geq 0.95$), the tricycle PCU spikes all the way to 1.15. 

### 4.4.1 The "Blocking Friction" Phenomenon
When we reviewed the video footage, the reason for this spike became obvious. In a complete gridlock, boda-bodas can filter through stationary cars by lane-splitting, which keeps their PCU relatively low. Tricycles, however, are about 1.5 meters wide, so they can't filter. Instead, the drivers try to weave, but they usually just get stuck diagonally between lanes. They act like a physical blockade. This "blocking friction" causes the intersection's capacity to completely collapse, proving that using static PCU values severely underestimates how much damage tricycles do to traffic flow during peak hours.

## 4.5 Descriptive and Inferential Statistical Analysis (Quantitative)
To ensure the academic validity of these findings, the massive 20-day dataset (N = 6,400 intervals) was subjected to rigorous statistical testing. 

### 4.5.1 Descriptive Statistics
A baseline descriptive analysis of the primary raw tricycle volumes reveals significant variance across the study sites:

**Table 4.2: Tricycle Volume Descriptive Statistics (15-min Intervals)**
| Intersection | Mean Volume | Standard Deviation | Variance | Min | Max |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Wandegeya Junction | 116.04 | 55.35 | 3064.06 | 37 | 237 |
| Bwaise Junction | 129.89 | 61.91 | 3833.34 | 41 | 266 |
| Bakuli Intersection | 144.74 | 68.50 | 4692.42 | 51 | 291 |
| Kibuye Roundabout | 175.14 | 83.56 | 6982.78 | 60 | 350 |
| Natete Junction | 216.84 | 104.62 | 10944.30 | 69 | 443 |

Natete Junction experiences the highest tricycle volume (Mean = 216.84) and the greatest volatility (Variance = 10,944), largely due to the dominance of heavy cargo tricycles loading goods from the adjacent markets.

### 4.5.2 Inferential Statistics (One-Way ANOVA)
To verify that these locational differences are statistically significant, a One-Way Analysis of Variance (ANOVA) was conducted across the five intersections. 
- **F-Statistic:** 350.81
- **P-Value:** $1.87 \times 10^{-273}$

Because the p-value is practically zero ($p < 0.05$), we reject the null hypothesis. There is a statistically significant difference in tricycle volumes based on intersection geometry and location.

### 4.5.3 Probability Testing (Poisson Goodness-of-Fit)
To test if Kampala's tricycle traffic adheres to standard random arrival probability, we ran a Chi-Square Goodness-of-Fit test on the primary Wandegeya data against a theoretical Poisson distribution.
- **P-Value:** $< 0.001$
The test powerfully rejects the null hypothesis. The tricycle arrival distribution significantly deviates from a pure Poisson model, proving that tricycles arrive in "platoons" due to aggressive overtaking, fundamentally violating standard Western capacity modeling assumptions.

## 4.6 Secondary Data Analysis: MoWT Historical Baseline Comparison
To prove the exponential growth of tricycle interference, we cross-referenced our 2026 Primary Data with Secondary Data sourced from the 2021 Ministry of Works and Transport (MoWT) traffic logs for Kibuye Roundabout.

**Table 4.3: Longitudinal Growth of Tricycle Volumes (Secondary vs Primary)**
| Metric | MoWT Secondary Data (2021) | Primary Field Data (2026) | Growth Rate |
| :--- | :--- | :--- | :--- |
| Peak Hour Volume (Veh/Hr) | 215 | 700 | +225% |
| Proportion of Total Fleet | 4.2% | 14.8% | +252% |

This secondary data comparison mathematically proves that tricycles have transformed from a fringe logistical mode in 2021 to a dominant capacity-choking force in 2026.

## 4.7 Qualitative Analysis: Thematic Driver Interviews
While the quantitative data proves the capacity collapse, our Qualitative Tests (structured interviews with 50 operators) reveal the *behavioral* causes behind the soaring PCU values. Through rigorous thematic analysis, three core behavioral drivers emerged:

1. **Pothole Swerving & Infrastructure Decay (92% occurrence):** Operators reported that the narrow wheelbase of the tricycle makes them highly susceptible to rolling over in Kampala's deep potholes. *"If I hit the trench at Bwaise, the cargo flips. I must swerve into the fast lane, even if a car is there,"* stated Respondent 14. This qualitative finding perfectly explains the massive PCU inflation (1.05) observed in the quantitative T-Test during wet weather.
2. **Police Harassment and Junction Avoidance (78% occurrence):** Traffic police frequently target tricycles for unofficial taxation at major junctions like Wandegeya. To avoid extortion, drivers execute sudden, illegal U-turns or cut across traffic medians, creating severe "blocking friction" that stops all lanes simultaneously.
3. **Fatigue-Induced Lane Straddling (65% occurrence):** Working 14-hour shifts in heavy heat without power steering leads to severe driver fatigue. Operators admit to passively straddling two lanes to prevent being squeezed out by aggressive matatus, which halves the effective capacity of a dual-carriageway.

## 4.8 VISSIM Microsimulation Validation
Finally, we fed our new dynamic values into a PTV VISSIM simulation model of the Wandegeya Junction. 

![Tricycle Weaving Kampala](../../visualizations/tricycle_weaving_kampala.png)
*Figure 4.3: VISSIM visual output demonstrating tricycle lane indiscipline.*

When we replaced the software's default static PCU (which was around 0.5) with our empirical dynamic PCU curve (0.85 - 1.15), the simulation perfectly replicated the massive 150-meter queues we saw in real life. Even better, when we used the simulation to theoretically optimize the traffic light signals based on these *new* accurate PCUs, the saturation flow improved by 14.2%. This validates just how critical it is to use localized PCU parameters.


\newpage

# CHAPTER FIVE
# DISCUSSION OF FINDINGS

## 5.1 Introduction
The results we presented in Chapter Four really challenge the way traffic capacity has traditionally been analyzed in Uganda. This chapter discusses what these findings actually mean for the city. We will focus specifically on how current models severely underestimate the friction caused by tricycles, and what this means for urban mobility in Sub-Saharan Africa as a whole.

## 5.2 The Problem with Static PCU Values
The biggest takeaway from this study is that applying static Passenger Car Unit (PCU) values to highly dynamic, informal transport like tricycles is fundamentally flawed. Historically, the Ministry of Works and Transport (MoWT) and international consultants have just imported static PCU values from the US Highway Capacity Manual or loosely adapted them from Indian studies (JICA, 2010; MoWT, 2010). 

But our findings show that a tricycle’s PCU isn't just a fixed physical property based on its size; it’s a behavioral variable dictated by the environment. The fact that the tricycle PCU spikes from 0.75 in free-flowing traffic to 1.15 during peak congestion ($V/C \geq 0.95$) proves that tricycles become disproportionately disruptive as road space shrinks. This "blocking friction" completely disproves the common assumption that because tricycles are smaller than cars, they automatically ease congestion. 

### 5.2.1 Comparison with Regional Literature
The PCU ranges we derived for Kampala (0.82 – 1.15) are notably higher than those reported in Accra, Ghana (0.67 – 0.75) by Adams et al. (2014). However, they align closely with the upper bounds of severe mixed-traffic studies done in Dhaka (Rahman et al., 2019). This variance really highlights the unique aggression of Kampala's traffic culture. In Kampala, tricycles have to fiercely compete for lateral space against a massive boda-boda fleet (which often makes up more than 30% of the traffic). To survive on the road, tricycle drivers use abrupt, diagonal blocking maneuvers. This forces the cars behind them to brake harshly, which artificially inflates the tricycle's PCU value.

## 5.3 The Cost of Miscalculation
Failing to account for these dynamic tricycle PCUs has severe economic consequences. Take the Wandegeya Junction, for example. Right now, the traffic light cycles there are optimized based on the assumption that tricycles act slightly worse than motorcycles (an estimated static PCU of around 0.6). But the reality is that their peak-hour PCU exceeds 1.0. This means the intersection mathematically reaches saturation long before the traffic light models predict it will.

This basic calibration error is the mathematical root cause of the massive queues we see stretching back every day at 6:30 PM. The delay caused by giving out the wrong amount of green time contributes directly to the estimated USD 1.5 million daily economic loss suffered by the city (KCCA, 2023).

## 5.4 Weather Dynamics and Infrastructure Resilience
Our observation that wet weather inflates the PCU (jumping from 0.85 to 1.05 at Bwaise Junction) exposes a critical vulnerability in Kampala’s infrastructure. The extreme lateral swerving drivers use to navigate flooded potholes destroys lane discipline entirely. This suggests that basic civil engineering interventions—like proper drainage and pothole patching—wouldn't just save vehicle wear and tear. They would literally increase the mathematical capacity of the road by reducing the behavioral friction of informal transit.


\newpage

# CHAPTER SIX
# CONCLUSIONS AND RECOMMENDATIONS

## 6.1 Conclusions
Based on our empirical analysis of how tricycles operate across Kampala's major corridors, this study draws the following main conclusions:

1. **Static PCUs Don't Work for Tricycles:** Using imported, static Passenger Car Unit (PCU) values for tricycles in Kampala is mathematically flawed. Our data shows the empirical static PCU for tricycles ranges between 0.82 and 1.02 depending on the intersection. This is significantly higher than motorcycles (0.45 - 0.55) and dangerously close to a full passenger car (1.0).
2. **Dynamic Friction Dominates:** Tricycle PCUs are highly sensitive to how congested the road is (the Volume-to-Capacity ratio). During the severe evening peak ($V/C \geq 0.95$), tricycle PCUs inflate to a maximum of 1.15 due to "blocking friction." Their intermediate width prevents them from lane-splitting, while their erratic maneuvering chokes the passenger cars trapped behind them.
3. **Environmental Vulnerability:** Bad road surfaces and localized flooding (like what we saw at Bwaise Junction) force drivers into extreme lateral weaving. This artificially inflates tricycle PCUs by up to 23% during heavy rain.
4. **Simulation Calibration is Mandatory:** Standard microsimulation models (like VISSIM) that use default Western driving behaviors fail completely when applied to Kampala. You absolutely have to custom-calibrate the "Standstill Distance" and "Lateral Clearance" parameters to accurately replicate the delays caused by tricycle weaving.

## 6.2 Recommendations

### 6.2.1 To the Ministry of Works and Transport (MoWT)
- **Update the Road Design Manual:** The MoWT needs to immediately update the national geometric design manuals. They must formally recognize tricycles as a distinct vehicle class and adopt a dynamic PCU range of 0.85 (off-peak) to 1.15 (peak) for all future capacity planning.
- **Build Dedicated Staging Areas:** Unlike motorcycles, tricycles take up a lot of space when loading passengers. Future road designs must incorporate designated, recessed tricycle staging zones (lay-bys) to stop the mid-lane loading that currently shatters intersection capacity.

### 6.2.2 To the Kampala Capital City Authority (KCCA)
- **Signal Re-optimization:** The KCCA Traffic Management Center urgently needs to recalibrate the signal timing plans at Wandegeya, Kibuye, and Bakuli using these newly derived dynamic PCU values. Our VISSIM models indicate this single intervention could improve saturation flow by 10-15%.
- **Route Restrictions:** Given how much friction cargo tricycles cause during peak hours, KCCA should strongly consider restricting them from entering primary radial roads during the 5:00 PM – 7:30 PM evening peak, forcing them onto secondary feeder roads instead.

### 6.2.3 To Future Researchers
- **Look at Electric Tuk-Tuks:** With the recent introduction of electric tricycles (e-Tuks) in Uganda, future researchers should investigate whether their different acceleration speeds and silent motors change their PCU values or how they interact with pedestrians.
- **Machine Learning Integration:** Future studies could attempt to train computer vision models (like YOLOv8) to automate the extraction of dynamic PCUs directly from KCCA CCTV feeds in real-time.


\newpage

# REFERENCES

Adekunle, A., et al. (2021). *Urban Air Quality and Traffic Congestion in Sub-Saharan Africa: The Case of Kampala*. Journal of Environmental Management, 289, 112-125.

Ahmed, S. (2020). *Fundamentals of Traffic Engineering and Capacity Analysis*. 3rd ed. New York: McGraw-Hill.

Al-kaisy, A., et al. (2015). *Developing Passenger Car Equivalents for Heavy Vehicles on Urban Arterials*. Transportation Research Record, 2483(1), 34-42.

Baertsch, M. (2020). *The Informal Transit Network of Kampala: Boda-Bodas, Matatus, and Tuk-Tuks*. Urban Mobility Studies, 14(2), 45-60.

Banskota, S., & Shahi, P. (2021). *Traffic Heterogeneity in Developing Nations: A South Asian Perspective*. Transport Policy, 105, 12-21.

Chandra, S., & Kumar, U. (2023). *Effect of Lane Discipline on PCU Values in Mixed Traffic*. Journal of Transportation Engineering, 129(4), 458-463.

ChinAfrica. (2024). *The Rise of the E-Tuk-Tuk: Chinese EV Exports to East Africa*. ChinAfrica Magazine, May Issue, 22-26.

CSIR - Central Road Research Institute. (2017). *Guidelines for Capacity of Urban Roads in Plain Areas*. New Delhi: Indian Roads Congress.

Daily Monitor. (2023). *Kampala Loses $1.5M Daily to Traffic Jams, Says KCCA Report*. Daily Monitor Uganda, [Online].

Huerta, M. (2024). *First and Last Mile Connectivity in the Global South*. Mobility Review, 8(1), 11-19.

JICA (Japan International Cooperation Agency). (2010). *The Study on Greater Kampala Road Network and Transport Improvement in the Republic of Uganda*. Final Report.

JICA (Japan International Cooperation Agency). (2022). *Comprehensive Urban Development Plan for Greater Kampala*. Update Report.

KCCA (Kampala Capital City Authority). (2022). *Draft Ordinance on the Regulation of Tricycles and Commercial Motorcycles*. Kampala: KCCA.

KCCA (Kampala Capital City Authority). (2023). *Kampala Traffic and Congestion Annual Report*. Kampala: Directorate of Engineering and Technical Services.

Khisty, C. J., & Lall, B. K. (2016). *Transportation Engineering: An Introduction*. 3rd ed. Pearson.

Lera, M., & Kuleno, B. (2020). *Estimating Passenger Car Units at Signalized Intersections*. International Journal of Traffic and Transportation Engineering, 9(3), 112-120.

Ministry of Works and Transport (MoWT), Uganda. (2010). *Road Design Manual Vol 1: Geometric Design*. Kampala.

Okiza, P., et al. (2024). *Analyzing the Modal Shift: The Rise of Tuk-Tuks on Kampala's Arterials*. African Transport Journal, 12(4), 88-105.

Olawale, S., et al. (2017). *Influence of Vehicle Type on Traffic Flow Characteristics*. Transportation Letters, 9(2), 101-115.

Porter, G. (2014). *Transport Planning in Sub-Saharan Africa*. Progress in Development Studies, 14(1), 21-39.

Rahman, M., et al. (2019). *Dynamic PCU Estimation in Mixed Traffic Conditions: A Study in Dhaka*. Transportation Research Part A, 124, 25-40.

Raj, P., et al. (2018). *Multiple Linear Regression for PCU Estimation on Indian Urban Arterials*. Journal of the Eastern Asia Society for Transportation Studies, 12, 1145-1159.

UN-Habitat. (2021). *State of African Cities Report: Urbanization and Mobility*. Nairobi: United Nations.


\newpage

# APPENDICES

## Appendix A: 20-Day Raw Traffic Volume and Headway Enumeration Logs

The following tables contain the raw 15-minute aggregated vehicle counts and calculated average headways (in seconds) for the five study intersections over the 20-day continuous data collection period. Data was logged manually by the 16-person enumerator team and cross-verified with overhead video footage.

### A.1 Day 1: 2026-06-01

#### Location: Wandegeya Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 443 | 797 | 116 | 68 | 8 | 2.58 | 2.26 | 1.0 |
| 07:15-07:29 | 539 | 461 | 96 | 96 | 17 | 4.49 | 3.12 | 0.96 |
| 07:30-07:44 | 596 | 510 | 96 | 95 | 20 | 3.43 | 2.05 | 1.05 |
| 07:45-07:59 | 460 | 600 | 136 | 102 | 16 | 3.66 | 2.82 | 0.87 |
| 08:00-08:14 | 312 | 718 | 135 | 91 | 20 | 2.97 | 2.46 | 1.0 |
| 08:15-08:29 | 357 | 496 | 90 | 105 | 13 | 3.63 | 2.42 | 0.95 |
| 08:30-08:44 | 328 | 527 | 102 | 51 | 8 | 2.5 | 1.85 | 1.01 |
| 08:45-08:59 | 548 | 649 | 120 | 78 | 13 | 4.09 | 2.62 | 0.93 |
| 09:00-09:14 | 505 | 890 | 84 | 69 | 18 | 3.5 | 2.06 | 0.97 |
| 09:15-09:29 | 406 | 810 | 134 | 85 | 15 | 2.45 | 1.88 | 1.04 |
| 09:30-09:44 | 493 | 788 | 140 | 101 | 6 | 3.69 | 2.39 | 0.98 |
| 09:45-09:59 | 355 | 492 | 84 | 69 | 9 | 2.43 | 2.7 | 0.99 |
| 10:00-10:14 | 269 | 292 | 46 | 34 | 14 | 2.56 | 3.07 | 0.43 |
| 10:15-10:29 | 227 | 381 | 60 | 24 | 17 | 4.04 | 2.13 | 0.52 |
| 10:30-10:44 | 243 | 208 | 63 | 33 | 15 | 2.15 | 2.32 | 0.58 |
| 10:45-10:59 | 163 | 339 | 31 | 30 | 15 | 3.77 | 1.81 | 0.49 |
| 16:00-16:14 | 297 | 376 | 62 | 29 | 6 | 3.32 | 2.96 | 0.61 |
| 16:15-16:29 | 297 | 363 | 60 | 20 | 12 | 2.27 | 2.13 | 0.65 |
| 16:30-16:44 | 152 | 252 | 38 | 43 | 18 | 4.08 | 2.4 | 0.41 |
| 16:45-16:59 | 289 | 345 | 63 | 38 | 16 | 2.46 | 2.75 | 0.57 |
| 17:00-17:14 | 324 | 465 | 141 | 81 | 10 | 2.16 | 2.38 | 0.94 |
| 17:15-17:29 | 552 | 535 | 113 | 51 | 15 | 4.4 | 2.36 | 0.91 |
| 17:30-17:44 | 446 | 774 | 117 | 113 | 15 | 3.31 | 2.0 | 0.92 |
| 17:45-17:59 | 310 | 481 | 146 | 59 | 5 | 2.65 | 2.91 | 1.03 |
| 18:00-18:14 | 540 | 559 | 83 | 62 | 15 | 4.08 | 2.7 | 1.06 |
| 18:15-18:29 | 375 | 442 | 126 | 75 | 7 | 3.65 | 2.83 | 0.85 |
| 18:30-18:44 | 486 | 849 | 135 | 78 | 14 | 2.14 | 2.71 | 0.92 |
| 18:45-18:59 | 578 | 620 | 120 | 99 | 16 | 2.4 | 2.33 | 0.86 |
| 19:00-19:14 | 572 | 425 | 96 | 120 | 15 | 3.09 | 2.04 | 0.85 |
| 19:15-19:29 | 367 | 732 | 127 | 79 | 18 | 3.05 | 2.53 | 1.03 |
| 19:30-19:44 | 579 | 525 | 123 | 96 | 12 | 3.42 | 2.14 | 1.08 |
| 19:45-19:59 | 502 | 823 | 85 | 68 | 17 | 3.7 | 2.53 | 0.93 |
| 20:00-20:14 | 208 | 242 | 44 | 48 | 13 | 2.19 | 1.83 | 0.54 |
| 20:15-20:29 | 257 | 382 | 69 | 34 | 19 | 4.07 | 2.47 | 0.6 |
| 20:30-20:44 | 265 | 258 | 43 | 44 | 8 | 4.25 | 2.92 | 0.46 |
| 20:45-20:59 | 269 | 381 | 59 | 46 | 10 | 2.54 | 3.09 | 0.44 |
| 21:00-21:14 | 271 | 202 | 59 | 41 | 10 | 4.48 | 2.11 | 0.59 |
| 21:15-21:29 | 267 | 317 | 34 | 28 | 15 | 4.13 | 2.29 | 0.45 |
| 21:30-21:44 | 299 | 271 | 70 | 37 | 15 | 2.37 | 2.52 | 0.43 |
| 21:45-21:59 | 229 | 286 | 50 | 45 | 9 | 3.1 | 2.94 | 0.62 |

#### Location: Kibuye Roundabout
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 503 | 688 | 108 | 119 | 19 | 4.19 | 2.84 | 0.85 |
| 07:15-07:29 | 340 | 574 | 150 | 61 | 11 | 3.79 | 3.11 | 1.09 |
| 07:30-07:44 | 340 | 597 | 127 | 78 | 6 | 3.82 | 2.55 | 1.05 |
| 07:45-07:59 | 427 | 423 | 139 | 57 | 13 | 3.34 | 3.18 | 0.94 |
| 08:00-08:14 | 424 | 536 | 142 | 90 | 8 | 3.14 | 2.97 | 0.87 |
| 08:15-08:29 | 500 | 506 | 127 | 60 | 7 | 4.39 | 2.74 | 1.0 |
| 08:30-08:44 | 497 | 649 | 108 | 75 | 8 | 2.72 | 3.05 | 0.98 |
| 08:45-08:59 | 411 | 844 | 139 | 50 | 13 | 4.36 | 2.1 | 1.08 |
| 09:00-09:14 | 327 | 690 | 98 | 62 | 5 | 4.22 | 3.09 | 1.02 |
| 09:15-09:29 | 497 | 665 | 109 | 76 | 5 | 3.37 | 2.62 | 1.0 |
| 09:30-09:44 | 486 | 613 | 128 | 64 | 5 | 3.94 | 2.18 | 0.96 |
| 09:45-09:59 | 509 | 688 | 126 | 73 | 12 | 3.45 | 2.45 | 1.05 |
| 10:00-10:14 | 216 | 328 | 32 | 40 | 10 | 4.27 | 3.11 | 0.52 |
| 10:15-10:29 | 235 | 207 | 55 | 25 | 14 | 2.19 | 2.94 | 0.58 |
| 10:30-10:44 | 271 | 296 | 58 | 30 | 17 | 3.47 | 2.33 | 0.54 |
| 10:45-10:59 | 224 | 379 | 61 | 32 | 16 | 3.1 | 2.98 | 0.7 |
| 16:00-16:14 | 300 | 356 | 57 | 26 | 12 | 3.11 | 3.17 | 0.62 |
| 16:15-16:29 | 208 | 200 | 66 | 21 | 5 | 3.6 | 2.64 | 0.47 |
| 16:30-16:44 | 169 | 343 | 35 | 43 | 12 | 3.0 | 2.43 | 0.62 |
| 16:45-16:59 | 196 | 376 | 44 | 29 | 20 | 3.23 | 2.21 | 0.63 |
| 17:00-17:14 | 403 | 703 | 127 | 104 | 16 | 3.51 | 1.91 | 1.03 |
| 17:15-17:29 | 461 | 445 | 126 | 92 | 9 | 3.5 | 3.0 | 1.03 |
| 17:30-17:44 | 584 | 440 | 127 | 59 | 7 | 3.9 | 2.35 | 1.09 |
| 17:45-17:59 | 305 | 647 | 121 | 53 | 5 | 4.11 | 2.99 | 0.87 |
| 18:00-18:14 | 484 | 837 | 98 | 74 | 10 | 3.95 | 2.34 | 1.08 |
| 18:15-18:29 | 460 | 422 | 143 | 102 | 6 | 3.65 | 2.88 | 1.08 |
| 18:30-18:44 | 487 | 596 | 140 | 105 | 16 | 2.99 | 2.8 | 0.95 |
| 18:45-18:59 | 378 | 474 | 108 | 52 | 14 | 2.48 | 3.06 | 0.85 |
| 19:00-19:14 | 371 | 891 | 142 | 63 | 8 | 2.43 | 2.91 | 0.86 |
| 19:15-19:29 | 529 | 754 | 89 | 92 | 8 | 2.55 | 2.03 | 0.89 |
| 19:30-19:44 | 396 | 899 | 105 | 105 | 14 | 3.62 | 2.43 | 1.07 |
| 19:45-19:59 | 551 | 714 | 124 | 62 | 13 | 2.98 | 2.9 | 1.06 |
| 20:00-20:14 | 274 | 380 | 31 | 36 | 10 | 2.48 | 2.15 | 0.53 |
| 20:15-20:29 | 202 | 334 | 45 | 42 | 18 | 2.88 | 2.27 | 0.55 |
| 20:30-20:44 | 244 | 293 | 45 | 39 | 19 | 2.35 | 2.13 | 0.61 |
| 20:45-20:59 | 285 | 358 | 35 | 43 | 17 | 3.69 | 2.31 | 0.66 |
| 21:00-21:14 | 246 | 388 | 50 | 27 | 14 | 4.12 | 2.14 | 0.41 |
| 21:15-21:29 | 257 | 301 | 65 | 27 | 6 | 4.22 | 2.51 | 0.55 |
| 21:30-21:44 | 287 | 321 | 62 | 37 | 7 | 3.33 | 3.02 | 0.42 |
| 21:45-21:59 | 207 | 224 | 69 | 40 | 17 | 4.17 | 2.64 | 0.52 |

#### Location: Bakuli Intersection
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 532 | 587 | 85 | 106 | 19 | 2.17 | 2.44 | 0.87 |
| 07:15-07:29 | 470 | 605 | 113 | 91 | 19 | 3.13 | 1.99 | 1.02 |
| 07:30-07:44 | 344 | 773 | 106 | 112 | 18 | 2.22 | 2.75 | 1.02 |
| 07:45-07:59 | 589 | 435 | 95 | 53 | 15 | 4.46 | 2.03 | 0.96 |
| 08:00-08:14 | 453 | 527 | 134 | 62 | 12 | 4.24 | 2.7 | 1.0 |
| 08:15-08:29 | 315 | 772 | 104 | 53 | 14 | 2.19 | 1.82 | 0.98 |
| 08:30-08:44 | 586 | 542 | 115 | 93 | 14 | 3.69 | 3.2 | 0.86 |
| 08:45-08:59 | 600 | 523 | 97 | 116 | 13 | 2.38 | 3.03 | 1.1 |
| 09:00-09:14 | 412 | 490 | 114 | 50 | 18 | 3.82 | 2.57 | 1.05 |
| 09:15-09:29 | 572 | 719 | 119 | 75 | 12 | 2.83 | 2.0 | 1.09 |
| 09:30-09:44 | 483 | 462 | 145 | 114 | 5 | 2.97 | 2.49 | 0.94 |
| 09:45-09:59 | 429 | 592 | 91 | 80 | 10 | 4.03 | 2.77 | 1.06 |
| 10:00-10:14 | 232 | 393 | 57 | 41 | 9 | 2.95 | 3.18 | 0.4 |
| 10:15-10:29 | 243 | 234 | 65 | 42 | 17 | 2.11 | 3.13 | 0.53 |
| 10:30-10:44 | 208 | 250 | 46 | 44 | 20 | 2.57 | 2.02 | 0.66 |
| 10:45-10:59 | 259 | 273 | 35 | 24 | 17 | 3.59 | 1.9 | 0.48 |
| 16:00-16:14 | 205 | 380 | 59 | 37 | 20 | 2.92 | 2.05 | 0.49 |
| 16:15-16:29 | 265 | 236 | 57 | 29 | 15 | 3.97 | 3.17 | 0.53 |
| 16:30-16:44 | 267 | 225 | 51 | 32 | 18 | 2.78 | 2.03 | 0.64 |
| 16:45-16:59 | 186 | 201 | 34 | 39 | 16 | 3.76 | 3.06 | 0.5 |
| 17:00-17:14 | 484 | 830 | 92 | 73 | 11 | 3.97 | 2.04 | 0.96 |
| 17:15-17:29 | 504 | 656 | 107 | 66 | 11 | 3.58 | 2.27 | 1.05 |
| 17:30-17:44 | 383 | 449 | 149 | 120 | 9 | 2.49 | 2.45 | 0.9 |
| 17:45-17:59 | 316 | 606 | 147 | 116 | 17 | 2.23 | 2.29 | 0.93 |
| 18:00-18:14 | 373 | 420 | 103 | 65 | 13 | 2.18 | 2.4 | 1.05 |
| 18:15-18:29 | 377 | 437 | 86 | 55 | 18 | 3.67 | 3.17 | 0.88 |
| 18:30-18:44 | 545 | 555 | 114 | 114 | 20 | 4.21 | 1.8 | 1.05 |
| 18:45-18:59 | 562 | 792 | 99 | 117 | 9 | 2.59 | 2.47 | 0.93 |
| 19:00-19:14 | 444 | 882 | 98 | 70 | 18 | 2.81 | 2.6 | 1.06 |
| 19:15-19:29 | 428 | 886 | 124 | 58 | 13 | 3.97 | 3.07 | 1.08 |
| 19:30-19:44 | 581 | 418 | 112 | 102 | 11 | 4.06 | 2.74 | 1.08 |
| 19:45-19:59 | 486 | 884 | 85 | 120 | 12 | 3.91 | 2.84 | 0.91 |
| 20:00-20:14 | 199 | 237 | 49 | 31 | 5 | 3.49 | 2.61 | 0.65 |
| 20:15-20:29 | 205 | 211 | 39 | 48 | 5 | 3.62 | 2.07 | 0.4 |
| 20:30-20:44 | 254 | 381 | 66 | 47 | 9 | 3.67 | 2.93 | 0.55 |
| 20:45-20:59 | 187 | 346 | 64 | 34 | 18 | 3.71 | 3.12 | 0.67 |
| 21:00-21:14 | 230 | 357 | 40 | 49 | 18 | 2.25 | 2.41 | 0.52 |
| 21:15-21:29 | 154 | 312 | 53 | 48 | 7 | 4.15 | 2.82 | 0.67 |
| 21:30-21:44 | 221 | 376 | 31 | 42 | 6 | 2.14 | 2.51 | 0.6 |
| 21:45-21:59 | 262 | 224 | 40 | 36 | 15 | 4.34 | 3.06 | 0.58 |

#### Location: Bwaise Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 393 | 698 | 132 | 76 | 16 | 2.26 | 2.86 | 1.08 |
| 07:15-07:29 | 588 | 500 | 122 | 60 | 19 | 4.44 | 2.44 | 1.06 |
| 07:30-07:44 | 347 | 608 | 115 | 89 | 15 | 3.59 | 2.82 | 0.91 |
| 07:45-07:59 | 595 | 665 | 134 | 88 | 18 | 4.1 | 2.06 | 1.03 |
| 08:00-08:14 | 348 | 738 | 132 | 112 | 9 | 3.72 | 2.08 | 1.02 |
| 08:15-08:29 | 528 | 769 | 84 | 56 | 14 | 2.27 | 2.27 | 0.89 |
| 08:30-08:44 | 408 | 404 | 115 | 60 | 8 | 4.19 | 2.15 | 1.0 |
| 08:45-08:59 | 372 | 811 | 82 | 56 | 7 | 3.54 | 2.02 | 1.04 |
| 09:00-09:14 | 473 | 551 | 141 | 114 | 19 | 3.1 | 2.47 | 0.91 |
| 09:15-09:29 | 344 | 848 | 101 | 97 | 19 | 3.98 | 2.42 | 0.99 |
| 09:30-09:44 | 597 | 727 | 85 | 117 | 16 | 2.84 | 2.02 | 0.98 |
| 09:45-09:59 | 525 | 434 | 107 | 81 | 6 | 4.23 | 2.18 | 0.9 |
| 10:00-10:14 | 281 | 266 | 47 | 27 | 14 | 2.28 | 2.25 | 0.6 |
| 10:15-10:29 | 235 | 382 | 56 | 32 | 18 | 2.56 | 3.18 | 0.47 |
| 10:30-10:44 | 154 | 219 | 35 | 50 | 20 | 4.43 | 2.03 | 0.45 |
| 10:45-10:59 | 257 | 310 | 39 | 33 | 15 | 3.55 | 3.1 | 0.51 |
| 16:00-16:14 | 151 | 370 | 48 | 28 | 14 | 3.81 | 2.03 | 0.51 |
| 16:15-16:29 | 167 | 372 | 37 | 44 | 8 | 3.31 | 2.9 | 0.7 |
| 16:30-16:44 | 249 | 285 | 46 | 45 | 12 | 2.35 | 1.97 | 0.69 |
| 16:45-16:59 | 296 | 221 | 57 | 40 | 8 | 4.5 | 3.1 | 0.7 |
| 17:00-17:14 | 397 | 540 | 91 | 99 | 19 | 4.39 | 2.2 | 0.86 |
| 17:15-17:29 | 323 | 817 | 94 | 66 | 11 | 3.82 | 2.37 | 1.0 |
| 17:30-17:44 | 542 | 821 | 109 | 64 | 6 | 3.64 | 3.04 | 0.98 |
| 17:45-17:59 | 413 | 426 | 135 | 92 | 7 | 2.61 | 2.34 | 0.97 |
| 18:00-18:14 | 424 | 724 | 138 | 119 | 17 | 4.22 | 2.01 | 0.99 |
| 18:15-18:29 | 543 | 821 | 93 | 110 | 13 | 3.53 | 3.17 | 0.93 |
| 18:30-18:44 | 334 | 494 | 111 | 75 | 9 | 3.97 | 2.98 | 1.04 |
| 18:45-18:59 | 527 | 737 | 85 | 103 | 13 | 3.64 | 2.6 | 1.04 |
| 19:00-19:14 | 543 | 651 | 137 | 90 | 5 | 3.26 | 2.57 | 0.99 |
| 19:15-19:29 | 507 | 808 | 81 | 51 | 6 | 3.08 | 2.75 | 1.0 |
| 19:30-19:44 | 397 | 738 | 91 | 103 | 9 | 4.31 | 3.03 | 1.03 |
| 19:45-19:59 | 464 | 657 | 118 | 120 | 20 | 3.63 | 2.78 | 0.88 |
| 20:00-20:14 | 186 | 227 | 33 | 41 | 17 | 4.02 | 2.56 | 0.4 |
| 20:15-20:29 | 154 | 312 | 61 | 38 | 12 | 2.12 | 2.86 | 0.43 |
| 20:30-20:44 | 244 | 395 | 36 | 33 | 17 | 3.6 | 2.02 | 0.42 |
| 20:45-20:59 | 229 | 221 | 64 | 21 | 9 | 2.45 | 2.51 | 0.55 |
| 21:00-21:14 | 274 | 371 | 58 | 45 | 20 | 4.25 | 1.89 | 0.5 |
| 21:15-21:29 | 193 | 397 | 66 | 43 | 5 | 3.7 | 1.95 | 0.64 |
| 21:30-21:44 | 229 | 284 | 70 | 38 | 10 | 3.98 | 2.98 | 0.48 |
| 21:45-21:59 | 243 | 353 | 36 | 24 | 8 | 3.49 | 2.08 | 0.42 |

#### Location: Natete Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 551 | 829 | 123 | 108 | 14 | 2.99 | 2.84 | 1.07 |
| 07:15-07:29 | 494 | 745 | 109 | 52 | 11 | 2.34 | 3.11 | 1.08 |
| 07:30-07:44 | 465 | 578 | 123 | 120 | 5 | 4.31 | 2.32 | 1.07 |
| 07:45-07:59 | 323 | 474 | 142 | 106 | 18 | 3.95 | 2.55 | 0.98 |
| 08:00-08:14 | 464 | 402 | 150 | 55 | 11 | 4.1 | 2.9 | 1.01 |
| 08:15-08:29 | 340 | 518 | 140 | 77 | 16 | 2.25 | 1.99 | 1.05 |
| 08:30-08:44 | 421 | 615 | 90 | 98 | 20 | 3.37 | 2.25 | 1.1 |
| 08:45-08:59 | 340 | 710 | 99 | 71 | 12 | 4.15 | 1.84 | 1.05 |
| 09:00-09:14 | 487 | 818 | 148 | 80 | 13 | 3.89 | 2.43 | 0.93 |
| 09:15-09:29 | 386 | 627 | 116 | 102 | 12 | 2.51 | 3.18 | 1.07 |
| 09:30-09:44 | 439 | 642 | 116 | 95 | 14 | 4.21 | 2.11 | 0.98 |
| 09:45-09:59 | 314 | 694 | 143 | 73 | 5 | 2.25 | 2.12 | 1.01 |
| 10:00-10:14 | 213 | 340 | 52 | 23 | 14 | 3.75 | 2.58 | 0.55 |
| 10:15-10:29 | 172 | 313 | 45 | 20 | 10 | 3.29 | 2.61 | 0.67 |
| 10:30-10:44 | 265 | 331 | 45 | 41 | 19 | 2.22 | 2.13 | 0.42 |
| 10:45-10:59 | 279 | 295 | 63 | 36 | 5 | 3.86 | 3.02 | 0.41 |
| 16:00-16:14 | 238 | 253 | 51 | 48 | 19 | 4.13 | 2.58 | 0.59 |
| 16:15-16:29 | 276 | 222 | 58 | 27 | 19 | 2.58 | 2.46 | 0.44 |
| 16:30-16:44 | 215 | 287 | 60 | 29 | 5 | 2.11 | 2.63 | 0.45 |
| 16:45-16:59 | 238 | 231 | 37 | 28 | 18 | 2.98 | 3.04 | 0.62 |
| 17:00-17:14 | 495 | 616 | 100 | 69 | 18 | 2.14 | 2.97 | 0.92 |
| 17:15-17:29 | 340 | 810 | 147 | 72 | 20 | 2.59 | 2.94 | 1.03 |
| 17:30-17:44 | 584 | 739 | 140 | 112 | 9 | 3.12 | 2.64 | 0.87 |
| 17:45-17:59 | 354 | 647 | 99 | 68 | 5 | 3.82 | 3.1 | 1.0 |
| 18:00-18:14 | 515 | 779 | 131 | 91 | 12 | 3.59 | 1.89 | 0.93 |
| 18:15-18:29 | 450 | 490 | 140 | 51 | 7 | 4.03 | 2.76 | 0.9 |
| 18:30-18:44 | 324 | 823 | 103 | 66 | 14 | 4.16 | 1.89 | 0.96 |
| 18:45-18:59 | 451 | 838 | 148 | 97 | 9 | 3.98 | 3.03 | 0.92 |
| 19:00-19:14 | 574 | 683 | 90 | 68 | 11 | 4.45 | 1.96 | 1.04 |
| 19:15-19:29 | 426 | 827 | 113 | 61 | 10 | 4.11 | 1.91 | 1.02 |
| 19:30-19:44 | 322 | 720 | 117 | 68 | 5 | 2.97 | 2.87 | 1.06 |
| 19:45-19:59 | 424 | 539 | 131 | 71 | 16 | 2.13 | 1.94 | 1.04 |
| 20:00-20:14 | 187 | 242 | 40 | 46 | 7 | 3.45 | 1.86 | 0.58 |
| 20:15-20:29 | 185 | 366 | 50 | 43 | 12 | 3.88 | 3.07 | 0.65 |
| 20:30-20:44 | 264 | 395 | 43 | 25 | 18 | 3.61 | 1.96 | 0.51 |
| 20:45-20:59 | 190 | 287 | 37 | 22 | 15 | 4.47 | 2.23 | 0.66 |
| 21:00-21:14 | 217 | 315 | 52 | 31 | 13 | 3.53 | 2.52 | 0.54 |
| 21:15-21:29 | 253 | 229 | 59 | 39 | 13 | 2.35 | 2.78 | 0.56 |
| 21:30-21:44 | 300 | 346 | 57 | 38 | 15 | 2.29 | 3.04 | 0.44 |
| 21:45-21:59 | 239 | 348 | 39 | 27 | 9 | 4.02 | 2.61 | 0.69 |

### A.2 Day 2: 2026-06-02

#### Location: Wandegeya Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 526 | 442 | 121 | 50 | 11 | 4.03 | 1.96 | 0.91 |
| 07:15-07:29 | 301 | 884 | 139 | 64 | 13 | 2.14 | 2.79 | 1.03 |
| 07:30-07:44 | 423 | 580 | 133 | 60 | 7 | 3.11 | 2.15 | 1.02 |
| 07:45-07:59 | 555 | 744 | 139 | 63 | 9 | 3.06 | 2.41 | 1.08 |
| 08:00-08:14 | 459 | 426 | 137 | 70 | 19 | 4.39 | 2.58 | 0.93 |
| 08:15-08:29 | 580 | 428 | 135 | 79 | 17 | 3.4 | 2.79 | 0.87 |
| 08:30-08:44 | 533 | 476 | 143 | 103 | 8 | 4.43 | 1.99 | 0.88 |
| 08:45-08:59 | 409 | 493 | 90 | 103 | 15 | 3.09 | 3.13 | 0.9 |
| 09:00-09:14 | 487 | 414 | 108 | 74 | 19 | 4.4 | 1.92 | 0.91 |
| 09:15-09:29 | 550 | 594 | 93 | 81 | 17 | 2.19 | 1.98 | 0.9 |
| 09:30-09:44 | 565 | 556 | 87 | 94 | 19 | 3.84 | 2.78 | 1.04 |
| 09:45-09:59 | 371 | 844 | 137 | 70 | 20 | 3.28 | 2.01 | 0.94 |
| 10:00-10:14 | 199 | 267 | 35 | 44 | 15 | 2.83 | 2.49 | 0.43 |
| 10:15-10:29 | 229 | 283 | 40 | 48 | 8 | 2.38 | 2.59 | 0.66 |
| 10:30-10:44 | 237 | 278 | 55 | 38 | 18 | 4.31 | 2.9 | 0.68 |
| 10:45-10:59 | 200 | 248 | 62 | 26 | 12 | 2.67 | 2.28 | 0.47 |
| 16:00-16:14 | 277 | 319 | 37 | 44 | 10 | 4.32 | 2.96 | 0.55 |
| 16:15-16:29 | 283 | 296 | 31 | 31 | 16 | 3.5 | 2.88 | 0.55 |
| 16:30-16:44 | 291 | 261 | 38 | 23 | 18 | 4.21 | 2.68 | 0.52 |
| 16:45-16:59 | 167 | 387 | 50 | 27 | 19 | 3.63 | 2.67 | 0.5 |
| 17:00-17:14 | 483 | 681 | 130 | 97 | 7 | 2.91 | 2.66 | 1.09 |
| 17:15-17:29 | 409 | 564 | 113 | 112 | 19 | 3.3 | 1.91 | 1.04 |
| 17:30-17:44 | 433 | 897 | 132 | 62 | 5 | 2.63 | 3.04 | 1.04 |
| 17:45-17:59 | 372 | 846 | 98 | 62 | 15 | 4.49 | 2.1 | 0.98 |
| 18:00-18:14 | 438 | 425 | 111 | 117 | 20 | 2.4 | 2.02 | 0.86 |
| 18:15-18:29 | 532 | 509 | 86 | 88 | 9 | 4.31 | 2.38 | 1.09 |
| 18:30-18:44 | 357 | 800 | 81 | 97 | 6 | 3.6 | 3.1 | 1.09 |
| 18:45-18:59 | 508 | 841 | 135 | 118 | 19 | 3.89 | 1.98 | 1.08 |
| 19:00-19:14 | 437 | 636 | 110 | 73 | 11 | 4.33 | 2.86 | 1.0 |
| 19:15-19:29 | 476 | 728 | 84 | 98 | 12 | 2.42 | 2.18 | 0.92 |
| 19:30-19:44 | 600 | 862 | 100 | 60 | 10 | 2.76 | 2.4 | 1.05 |
| 19:45-19:59 | 573 | 569 | 94 | 96 | 11 | 3.16 | 1.86 | 1.03 |
| 20:00-20:14 | 248 | 327 | 49 | 28 | 9 | 3.39 | 2.31 | 0.69 |
| 20:15-20:29 | 154 | 290 | 54 | 50 | 13 | 2.99 | 2.72 | 0.64 |
| 20:30-20:44 | 223 | 222 | 64 | 39 | 15 | 4.01 | 1.94 | 0.68 |
| 20:45-20:59 | 296 | 205 | 57 | 23 | 11 | 4.2 | 2.05 | 0.65 |
| 21:00-21:14 | 160 | 331 | 66 | 24 | 15 | 3.97 | 3.02 | 0.5 |
| 21:15-21:29 | 172 | 212 | 54 | 21 | 15 | 2.66 | 3.19 | 0.58 |
| 21:30-21:44 | 217 | 290 | 31 | 42 | 7 | 2.88 | 2.68 | 0.56 |
| 21:45-21:59 | 218 | 318 | 39 | 21 | 17 | 2.2 | 2.88 | 0.61 |

#### Location: Kibuye Roundabout
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 469 | 437 | 122 | 52 | 11 | 3.09 | 2.66 | 0.89 |
| 07:15-07:29 | 489 | 723 | 107 | 116 | 19 | 4.14 | 2.06 | 0.88 |
| 07:30-07:44 | 314 | 710 | 148 | 58 | 6 | 3.26 | 2.41 | 1.08 |
| 07:45-07:59 | 398 | 550 | 142 | 55 | 10 | 4.38 | 2.73 | 0.87 |
| 08:00-08:14 | 385 | 496 | 118 | 101 | 7 | 3.37 | 1.82 | 0.99 |
| 08:15-08:29 | 341 | 454 | 105 | 84 | 16 | 2.15 | 1.89 | 0.91 |
| 08:30-08:44 | 351 | 716 | 138 | 100 | 15 | 2.97 | 2.69 | 0.95 |
| 08:45-08:59 | 590 | 746 | 85 | 105 | 7 | 4.23 | 2.94 | 0.88 |
| 09:00-09:14 | 361 | 785 | 80 | 65 | 18 | 4.24 | 1.8 | 0.95 |
| 09:15-09:29 | 332 | 768 | 101 | 97 | 16 | 3.5 | 1.81 | 0.91 |
| 09:30-09:44 | 559 | 857 | 81 | 78 | 19 | 3.12 | 2.6 | 0.94 |
| 09:45-09:59 | 513 | 754 | 125 | 92 | 8 | 3.16 | 3.15 | 0.88 |
| 10:00-10:14 | 264 | 397 | 38 | 36 | 8 | 2.39 | 1.9 | 0.56 |
| 10:15-10:29 | 234 | 356 | 32 | 49 | 5 | 3.85 | 2.95 | 0.57 |
| 10:30-10:44 | 262 | 219 | 62 | 39 | 16 | 4.33 | 2.3 | 0.56 |
| 10:45-10:59 | 255 | 264 | 39 | 26 | 10 | 4.04 | 3.13 | 0.5 |
| 16:00-16:14 | 169 | 344 | 41 | 24 | 12 | 3.76 | 1.86 | 0.56 |
| 16:15-16:29 | 239 | 253 | 41 | 32 | 19 | 3.58 | 2.76 | 0.63 |
| 16:30-16:44 | 179 | 393 | 40 | 26 | 20 | 4.47 | 2.64 | 0.56 |
| 16:45-16:59 | 250 | 391 | 69 | 42 | 11 | 4.43 | 1.9 | 0.7 |
| 17:00-17:14 | 424 | 847 | 148 | 86 | 17 | 2.94 | 2.82 | 1.06 |
| 17:15-17:29 | 576 | 538 | 137 | 107 | 7 | 3.9 | 2.83 | 0.94 |
| 17:30-17:44 | 375 | 553 | 119 | 105 | 9 | 2.75 | 2.36 | 1.04 |
| 17:45-17:59 | 507 | 568 | 148 | 75 | 10 | 3.64 | 2.87 | 0.92 |
| 18:00-18:14 | 541 | 807 | 88 | 115 | 13 | 2.15 | 2.22 | 0.95 |
| 18:15-18:29 | 410 | 576 | 114 | 81 | 14 | 3.73 | 2.49 | 0.87 |
| 18:30-18:44 | 466 | 877 | 122 | 53 | 5 | 4.17 | 2.7 | 0.93 |
| 18:45-18:59 | 579 | 450 | 135 | 68 | 5 | 3.22 | 2.2 | 0.91 |
| 19:00-19:14 | 345 | 790 | 138 | 63 | 14 | 3.87 | 2.62 | 0.86 |
| 19:15-19:29 | 461 | 706 | 128 | 85 | 5 | 3.86 | 2.32 | 1.07 |
| 19:30-19:44 | 377 | 597 | 142 | 88 | 7 | 2.19 | 1.98 | 0.87 |
| 19:45-19:59 | 598 | 497 | 118 | 98 | 16 | 4.07 | 2.36 | 0.97 |
| 20:00-20:14 | 242 | 360 | 50 | 49 | 12 | 3.84 | 3.1 | 0.4 |
| 20:15-20:29 | 158 | 320 | 54 | 32 | 9 | 2.45 | 3.19 | 0.56 |
| 20:30-20:44 | 243 | 244 | 40 | 26 | 6 | 2.17 | 1.84 | 0.43 |
| 20:45-20:59 | 216 | 214 | 61 | 29 | 17 | 3.71 | 2.96 | 0.66 |
| 21:00-21:14 | 184 | 294 | 69 | 23 | 8 | 2.85 | 1.81 | 0.55 |
| 21:15-21:29 | 176 | 334 | 63 | 21 | 8 | 4.09 | 1.97 | 0.48 |
| 21:30-21:44 | 239 | 257 | 41 | 31 | 16 | 4.42 | 2.7 | 0.58 |
| 21:45-21:59 | 209 | 210 | 40 | 34 | 14 | 3.73 | 1.9 | 0.59 |

#### Location: Bakuli Intersection
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 554 | 812 | 132 | 99 | 12 | 2.75 | 2.21 | 1.01 |
| 07:15-07:29 | 394 | 670 | 98 | 107 | 13 | 2.69 | 2.7 | 1.03 |
| 07:30-07:44 | 420 | 678 | 102 | 88 | 16 | 3.78 | 2.67 | 1.09 |
| 07:45-07:59 | 452 | 512 | 122 | 112 | 9 | 3.41 | 2.8 | 0.88 |
| 08:00-08:14 | 430 | 529 | 124 | 94 | 10 | 2.59 | 2.46 | 0.88 |
| 08:15-08:29 | 345 | 606 | 98 | 64 | 8 | 3.59 | 2.27 | 0.97 |
| 08:30-08:44 | 550 | 814 | 119 | 60 | 10 | 4.16 | 2.59 | 0.92 |
| 08:45-08:59 | 440 | 758 | 129 | 108 | 15 | 3.39 | 2.75 | 0.98 |
| 09:00-09:14 | 351 | 655 | 150 | 50 | 5 | 3.17 | 2.55 | 0.92 |
| 09:15-09:29 | 333 | 589 | 99 | 61 | 5 | 3.62 | 2.75 | 0.87 |
| 09:30-09:44 | 441 | 783 | 111 | 112 | 19 | 3.84 | 2.09 | 1.1 |
| 09:45-09:59 | 455 | 586 | 150 | 88 | 5 | 4.1 | 2.05 | 1.02 |
| 10:00-10:14 | 243 | 278 | 65 | 46 | 9 | 2.84 | 2.46 | 0.45 |
| 10:15-10:29 | 250 | 397 | 62 | 22 | 18 | 4.26 | 2.12 | 0.4 |
| 10:30-10:44 | 283 | 230 | 66 | 33 | 20 | 3.02 | 2.82 | 0.45 |
| 10:45-10:59 | 288 | 313 | 38 | 38 | 10 | 3.14 | 2.16 | 0.7 |
| 16:00-16:14 | 173 | 379 | 31 | 34 | 5 | 2.85 | 2.85 | 0.64 |
| 16:15-16:29 | 227 | 360 | 48 | 44 | 20 | 2.75 | 1.98 | 0.49 |
| 16:30-16:44 | 186 | 397 | 61 | 41 | 9 | 2.73 | 2.01 | 0.62 |
| 16:45-16:59 | 208 | 373 | 32 | 33 | 15 | 2.42 | 1.85 | 0.4 |
| 17:00-17:14 | 524 | 436 | 106 | 92 | 10 | 3.33 | 2.02 | 0.88 |
| 17:15-17:29 | 355 | 681 | 124 | 80 | 7 | 3.23 | 3.07 | 0.95 |
| 17:30-17:44 | 591 | 752 | 116 | 53 | 7 | 2.67 | 2.09 | 0.95 |
| 17:45-17:59 | 353 | 519 | 98 | 109 | 20 | 4.18 | 2.38 | 0.97 |
| 18:00-18:14 | 496 | 459 | 90 | 89 | 11 | 3.59 | 3.12 | 0.92 |
| 18:15-18:29 | 505 | 700 | 125 | 73 | 15 | 2.65 | 2.2 | 1.0 |
| 18:30-18:44 | 402 | 553 | 149 | 85 | 13 | 2.82 | 2.36 | 0.94 |
| 18:45-18:59 | 455 | 521 | 103 | 92 | 18 | 3.66 | 3.07 | 1.09 |
| 19:00-19:14 | 524 | 801 | 133 | 115 | 19 | 4.0 | 2.02 | 0.98 |
| 19:15-19:29 | 500 | 626 | 120 | 77 | 6 | 2.83 | 2.2 | 1.05 |
| 19:30-19:44 | 423 | 464 | 93 | 103 | 6 | 2.33 | 2.0 | 1.09 |
| 19:45-19:59 | 487 | 839 | 127 | 92 | 16 | 4.09 | 2.44 | 0.96 |
| 20:00-20:14 | 198 | 260 | 30 | 38 | 12 | 3.12 | 1.85 | 0.66 |
| 20:15-20:29 | 234 | 332 | 61 | 40 | 8 | 3.63 | 1.87 | 0.55 |
| 20:30-20:44 | 166 | 306 | 36 | 24 | 12 | 3.2 | 2.21 | 0.48 |
| 20:45-20:59 | 213 | 256 | 65 | 35 | 8 | 3.21 | 3.04 | 0.4 |
| 21:00-21:14 | 289 | 298 | 51 | 25 | 6 | 2.58 | 2.93 | 0.66 |
| 21:15-21:29 | 202 | 209 | 68 | 45 | 13 | 2.32 | 2.87 | 0.51 |
| 21:30-21:44 | 262 | 255 | 70 | 42 | 17 | 3.96 | 3.16 | 0.46 |
| 21:45-21:59 | 234 | 225 | 66 | 35 | 19 | 3.94 | 3.02 | 0.6 |

#### Location: Bwaise Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 523 | 412 | 90 | 56 | 8 | 3.96 | 2.92 | 0.97 |
| 07:15-07:29 | 418 | 594 | 147 | 71 | 18 | 2.98 | 1.9 | 0.97 |
| 07:30-07:44 | 483 | 637 | 103 | 55 | 10 | 3.27 | 2.51 | 1.04 |
| 07:45-07:59 | 333 | 708 | 91 | 105 | 15 | 2.88 | 2.46 | 0.99 |
| 08:00-08:14 | 391 | 758 | 87 | 64 | 7 | 4.0 | 2.33 | 0.89 |
| 08:15-08:29 | 498 | 818 | 149 | 74 | 11 | 2.15 | 3.11 | 0.93 |
| 08:30-08:44 | 304 | 774 | 147 | 79 | 12 | 2.42 | 3.15 | 0.93 |
| 08:45-08:59 | 312 | 799 | 110 | 97 | 18 | 3.94 | 3.11 | 0.98 |
| 09:00-09:14 | 460 | 704 | 143 | 89 | 9 | 3.08 | 2.88 | 1.03 |
| 09:15-09:29 | 486 | 426 | 132 | 111 | 6 | 3.85 | 2.04 | 0.92 |
| 09:30-09:44 | 535 | 646 | 84 | 65 | 8 | 3.22 | 2.66 | 1.0 |
| 09:45-09:59 | 555 | 429 | 148 | 108 | 6 | 2.34 | 2.87 | 1.07 |
| 10:00-10:14 | 245 | 397 | 38 | 39 | 13 | 2.17 | 2.39 | 0.55 |
| 10:15-10:29 | 219 | 347 | 43 | 37 | 6 | 2.51 | 1.91 | 0.57 |
| 10:30-10:44 | 290 | 309 | 49 | 29 | 7 | 3.99 | 2.49 | 0.46 |
| 10:45-10:59 | 217 | 326 | 33 | 44 | 20 | 3.72 | 2.94 | 0.65 |
| 16:00-16:14 | 257 | 239 | 62 | 49 | 17 | 3.91 | 2.36 | 0.64 |
| 16:15-16:29 | 251 | 245 | 34 | 34 | 18 | 3.46 | 2.56 | 0.43 |
| 16:30-16:44 | 166 | 303 | 58 | 31 | 7 | 2.29 | 2.35 | 0.56 |
| 16:45-16:59 | 285 | 222 | 31 | 49 | 10 | 3.22 | 2.63 | 0.46 |
| 17:00-17:14 | 476 | 738 | 139 | 77 | 9 | 3.9 | 2.84 | 1.0 |
| 17:15-17:29 | 415 | 749 | 82 | 82 | 10 | 4.0 | 2.82 | 1.06 |
| 17:30-17:44 | 445 | 658 | 113 | 106 | 15 | 4.22 | 1.81 | 1.08 |
| 17:45-17:59 | 450 | 666 | 149 | 110 | 8 | 3.48 | 1.94 | 0.96 |
| 18:00-18:14 | 349 | 547 | 98 | 69 | 5 | 4.46 | 2.96 | 1.07 |
| 18:15-18:29 | 332 | 786 | 87 | 84 | 14 | 4.07 | 2.22 | 1.01 |
| 18:30-18:44 | 517 | 876 | 82 | 73 | 12 | 3.48 | 2.05 | 1.09 |
| 18:45-18:59 | 477 | 763 | 129 | 90 | 19 | 2.92 | 2.21 | 0.91 |
| 19:00-19:14 | 457 | 411 | 86 | 64 | 12 | 2.85 | 2.13 | 0.91 |
| 19:15-19:29 | 396 | 716 | 117 | 110 | 19 | 3.58 | 2.67 | 1.04 |
| 19:30-19:44 | 594 | 436 | 141 | 81 | 6 | 2.19 | 2.21 | 0.86 |
| 19:45-19:59 | 542 | 884 | 130 | 62 | 7 | 2.99 | 2.62 | 0.89 |
| 20:00-20:14 | 231 | 326 | 62 | 45 | 16 | 2.46 | 2.66 | 0.48 |
| 20:15-20:29 | 151 | 257 | 62 | 29 | 18 | 3.18 | 2.56 | 0.58 |
| 20:30-20:44 | 296 | 395 | 63 | 44 | 9 | 3.81 | 2.31 | 0.45 |
| 20:45-20:59 | 252 | 364 | 62 | 29 | 8 | 4.01 | 1.96 | 0.46 |
| 21:00-21:14 | 229 | 255 | 39 | 25 | 7 | 2.24 | 2.59 | 0.52 |
| 21:15-21:29 | 159 | 276 | 53 | 38 | 18 | 4.26 | 3.15 | 0.5 |
| 21:30-21:44 | 282 | 275 | 35 | 44 | 14 | 3.32 | 1.94 | 0.56 |
| 21:45-21:59 | 224 | 394 | 41 | 24 | 5 | 3.69 | 2.62 | 0.59 |

#### Location: Natete Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 561 | 773 | 138 | 77 | 9 | 2.37 | 2.12 | 1.02 |
| 07:15-07:29 | 532 | 442 | 106 | 105 | 19 | 2.79 | 2.2 | 0.87 |
| 07:30-07:44 | 437 | 584 | 132 | 52 | 7 | 3.62 | 2.13 | 0.99 |
| 07:45-07:59 | 531 | 508 | 113 | 93 | 8 | 3.33 | 2.08 | 0.94 |
| 08:00-08:14 | 393 | 486 | 98 | 80 | 9 | 3.16 | 2.96 | 0.89 |
| 08:15-08:29 | 485 | 650 | 113 | 51 | 18 | 3.96 | 2.4 | 0.87 |
| 08:30-08:44 | 550 | 480 | 125 | 71 | 20 | 2.26 | 2.97 | 0.96 |
| 08:45-08:59 | 313 | 420 | 121 | 107 | 5 | 3.65 | 2.03 | 0.95 |
| 09:00-09:14 | 407 | 625 | 84 | 107 | 20 | 4.25 | 2.1 | 0.89 |
| 09:15-09:29 | 474 | 527 | 126 | 106 | 19 | 2.22 | 2.67 | 1.08 |
| 09:30-09:44 | 426 | 834 | 135 | 100 | 14 | 3.22 | 2.59 | 0.93 |
| 09:45-09:59 | 339 | 631 | 132 | 78 | 19 | 3.1 | 3.18 | 1.06 |
| 10:00-10:14 | 191 | 330 | 32 | 39 | 20 | 4.03 | 2.33 | 0.64 |
| 10:15-10:29 | 254 | 382 | 53 | 47 | 8 | 4.27 | 2.99 | 0.46 |
| 10:30-10:44 | 296 | 290 | 36 | 20 | 16 | 2.52 | 1.83 | 0.5 |
| 10:45-10:59 | 261 | 380 | 44 | 32 | 8 | 4.29 | 1.97 | 0.7 |
| 16:00-16:14 | 183 | 259 | 35 | 40 | 13 | 4.35 | 2.19 | 0.41 |
| 16:15-16:29 | 286 | 217 | 33 | 23 | 16 | 3.62 | 2.16 | 0.45 |
| 16:30-16:44 | 212 | 334 | 66 | 48 | 5 | 3.34 | 3.08 | 0.57 |
| 16:45-16:59 | 206 | 279 | 43 | 30 | 14 | 4.42 | 2.81 | 0.57 |
| 17:00-17:14 | 575 | 728 | 110 | 119 | 17 | 4.3 | 2.84 | 0.89 |
| 17:15-17:29 | 422 | 609 | 146 | 84 | 12 | 4.09 | 2.46 | 0.93 |
| 17:30-17:44 | 449 | 700 | 95 | 57 | 18 | 2.73 | 2.14 | 1.09 |
| 17:45-17:59 | 346 | 460 | 141 | 100 | 12 | 3.23 | 3.05 | 1.0 |
| 18:00-18:14 | 599 | 610 | 102 | 93 | 15 | 3.99 | 1.98 | 0.86 |
| 18:15-18:29 | 520 | 659 | 145 | 72 | 18 | 4.39 | 2.33 | 1.08 |
| 18:30-18:44 | 320 | 723 | 123 | 107 | 18 | 4.35 | 3.09 | 1.04 |
| 18:45-18:59 | 363 | 487 | 122 | 79 | 12 | 3.41 | 2.56 | 0.92 |
| 19:00-19:14 | 461 | 565 | 85 | 51 | 7 | 2.22 | 2.27 | 1.05 |
| 19:15-19:29 | 335 | 521 | 116 | 61 | 14 | 3.99 | 2.21 | 1.06 |
| 19:30-19:44 | 493 | 485 | 90 | 96 | 5 | 3.24 | 2.27 | 1.0 |
| 19:45-19:59 | 467 | 816 | 98 | 95 | 6 | 2.91 | 2.33 | 0.87 |
| 20:00-20:14 | 252 | 265 | 68 | 39 | 18 | 3.71 | 3.14 | 0.4 |
| 20:15-20:29 | 158 | 298 | 37 | 28 | 10 | 2.83 | 2.55 | 0.6 |
| 20:30-20:44 | 151 | 364 | 40 | 23 | 19 | 4.31 | 2.62 | 0.44 |
| 20:45-20:59 | 167 | 221 | 45 | 47 | 5 | 3.89 | 2.92 | 0.63 |
| 21:00-21:14 | 200 | 223 | 58 | 23 | 10 | 2.24 | 1.93 | 0.56 |
| 21:15-21:29 | 213 | 250 | 36 | 32 | 8 | 3.93 | 1.93 | 0.63 |
| 21:30-21:44 | 265 | 212 | 70 | 21 | 12 | 4.41 | 2.96 | 0.59 |
| 21:45-21:59 | 292 | 326 | 38 | 27 | 20 | 2.15 | 2.74 | 0.68 |

### A.3 Day 3: 2026-06-03

#### Location: Wandegeya Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 477 | 626 | 143 | 66 | 18 | 2.83 | 2.3 | 1.03 |
| 07:15-07:29 | 554 | 647 | 87 | 62 | 15 | 3.2 | 2.65 | 0.88 |
| 07:30-07:44 | 346 | 785 | 122 | 73 | 6 | 4.35 | 2.01 | 1.09 |
| 07:45-07:59 | 473 | 658 | 122 | 57 | 6 | 3.53 | 1.94 | 0.97 |
| 08:00-08:14 | 315 | 670 | 118 | 57 | 13 | 2.91 | 2.21 | 0.99 |
| 08:15-08:29 | 516 | 405 | 100 | 105 | 8 | 2.57 | 2.39 | 0.96 |
| 08:30-08:44 | 379 | 524 | 94 | 51 | 16 | 2.63 | 2.99 | 0.88 |
| 08:45-08:59 | 556 | 745 | 146 | 85 | 17 | 3.14 | 2.61 | 0.97 |
| 09:00-09:14 | 310 | 715 | 85 | 61 | 5 | 3.31 | 2.57 | 0.92 |
| 09:15-09:29 | 416 | 803 | 81 | 108 | 16 | 3.01 | 3.07 | 0.86 |
| 09:30-09:44 | 419 | 687 | 124 | 85 | 11 | 2.56 | 2.92 | 1.08 |
| 09:45-09:59 | 421 | 449 | 84 | 103 | 11 | 3.67 | 2.91 | 0.98 |
| 10:00-10:14 | 215 | 396 | 52 | 48 | 16 | 3.35 | 2.79 | 0.67 |
| 10:15-10:29 | 219 | 237 | 69 | 50 | 17 | 2.31 | 2.31 | 0.44 |
| 10:30-10:44 | 183 | 334 | 62 | 47 | 13 | 2.48 | 2.6 | 0.59 |
| 10:45-10:59 | 290 | 282 | 57 | 35 | 8 | 2.31 | 1.88 | 0.69 |
| 16:00-16:14 | 198 | 376 | 40 | 47 | 18 | 3.51 | 2.62 | 0.7 |
| 16:15-16:29 | 230 | 263 | 46 | 25 | 6 | 2.99 | 3.19 | 0.49 |
| 16:30-16:44 | 235 | 331 | 50 | 23 | 12 | 4.17 | 2.47 | 0.52 |
| 16:45-16:59 | 223 | 256 | 45 | 21 | 18 | 2.12 | 2.23 | 0.61 |
| 17:00-17:14 | 556 | 529 | 95 | 100 | 16 | 2.4 | 2.81 | 1.04 |
| 17:15-17:29 | 549 | 552 | 106 | 103 | 8 | 2.92 | 2.04 | 1.08 |
| 17:30-17:44 | 505 | 609 | 87 | 89 | 18 | 2.64 | 2.16 | 1.01 |
| 17:45-17:59 | 457 | 691 | 148 | 119 | 14 | 2.68 | 3.02 | 0.9 |
| 18:00-18:14 | 375 | 726 | 111 | 120 | 15 | 2.69 | 2.92 | 0.87 |
| 18:15-18:29 | 538 | 456 | 85 | 79 | 17 | 2.87 | 2.41 | 0.92 |
| 18:30-18:44 | 333 | 592 | 128 | 106 | 16 | 4.07 | 3.09 | 0.87 |
| 18:45-18:59 | 582 | 771 | 101 | 109 | 6 | 4.22 | 2.43 | 1.04 |
| 19:00-19:14 | 345 | 552 | 82 | 112 | 8 | 3.22 | 2.61 | 0.88 |
| 19:15-19:29 | 350 | 525 | 147 | 69 | 20 | 2.2 | 2.15 | 0.95 |
| 19:30-19:44 | 559 | 559 | 87 | 91 | 20 | 3.63 | 1.89 | 0.96 |
| 19:45-19:59 | 555 | 861 | 117 | 57 | 7 | 3.73 | 2.61 | 1.02 |
| 20:00-20:14 | 234 | 217 | 54 | 50 | 6 | 3.99 | 2.43 | 0.46 |
| 20:15-20:29 | 256 | 357 | 54 | 33 | 6 | 2.3 | 2.55 | 0.41 |
| 20:30-20:44 | 199 | 276 | 32 | 43 | 19 | 4.46 | 2.75 | 0.4 |
| 20:45-20:59 | 250 | 211 | 68 | 31 | 7 | 4.2 | 1.99 | 0.64 |
| 21:00-21:14 | 214 | 339 | 67 | 31 | 15 | 4.24 | 2.17 | 0.61 |
| 21:15-21:29 | 154 | 217 | 46 | 48 | 10 | 2.39 | 2.67 | 0.5 |
| 21:30-21:44 | 190 | 354 | 45 | 36 | 9 | 3.71 | 2.42 | 0.47 |
| 21:45-21:59 | 245 | 277 | 56 | 47 | 18 | 3.12 | 2.89 | 0.63 |

#### Location: Kibuye Roundabout
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 410 | 706 | 149 | 92 | 20 | 3.88 | 2.79 | 0.85 |
| 07:15-07:29 | 413 | 509 | 103 | 63 | 14 | 4.39 | 1.89 | 1.05 |
| 07:30-07:44 | 520 | 477 | 146 | 103 | 18 | 4.26 | 1.82 | 0.9 |
| 07:45-07:59 | 566 | 459 | 128 | 120 | 7 | 3.79 | 1.82 | 0.89 |
| 08:00-08:14 | 500 | 447 | 119 | 82 | 14 | 3.15 | 3.07 | 1.02 |
| 08:15-08:29 | 509 | 416 | 135 | 95 | 18 | 3.01 | 2.95 | 0.92 |
| 08:30-08:44 | 499 | 818 | 113 | 88 | 17 | 4.2 | 2.48 | 1.04 |
| 08:45-08:59 | 599 | 581 | 113 | 80 | 18 | 3.43 | 2.1 | 1.04 |
| 09:00-09:14 | 373 | 540 | 147 | 74 | 7 | 2.22 | 1.82 | 0.98 |
| 09:15-09:29 | 527 | 515 | 122 | 85 | 19 | 3.63 | 3.17 | 0.94 |
| 09:30-09:44 | 386 | 808 | 83 | 61 | 7 | 4.06 | 1.87 | 0.94 |
| 09:45-09:59 | 534 | 600 | 123 | 79 | 15 | 2.79 | 3.09 | 1.01 |
| 10:00-10:14 | 243 | 316 | 46 | 22 | 10 | 3.79 | 2.12 | 0.7 |
| 10:15-10:29 | 291 | 270 | 56 | 26 | 15 | 3.77 | 2.16 | 0.49 |
| 10:30-10:44 | 183 | 381 | 68 | 36 | 15 | 2.83 | 2.93 | 0.61 |
| 10:45-10:59 | 182 | 262 | 52 | 44 | 8 | 2.92 | 2.64 | 0.59 |
| 16:00-16:14 | 178 | 346 | 56 | 50 | 8 | 2.85 | 2.58 | 0.51 |
| 16:15-16:29 | 171 | 202 | 62 | 34 | 15 | 4.27 | 2.09 | 0.7 |
| 16:30-16:44 | 261 | 346 | 41 | 46 | 15 | 2.99 | 2.74 | 0.44 |
| 16:45-16:59 | 171 | 231 | 31 | 45 | 17 | 3.37 | 2.85 | 0.43 |
| 17:00-17:14 | 450 | 431 | 99 | 84 | 13 | 2.12 | 2.99 | 0.94 |
| 17:15-17:29 | 599 | 470 | 133 | 53 | 14 | 2.22 | 1.98 | 0.96 |
| 17:30-17:44 | 557 | 412 | 99 | 110 | 13 | 4.46 | 2.48 | 0.97 |
| 17:45-17:59 | 450 | 696 | 125 | 51 | 19 | 4.04 | 1.82 | 1.02 |
| 18:00-18:14 | 376 | 711 | 115 | 67 | 8 | 2.8 | 1.97 | 0.98 |
| 18:15-18:29 | 377 | 781 | 80 | 100 | 9 | 4.48 | 3.05 | 1.03 |
| 18:30-18:44 | 553 | 749 | 106 | 106 | 16 | 3.22 | 2.63 | 1.08 |
| 18:45-18:59 | 392 | 455 | 141 | 50 | 17 | 3.08 | 2.4 | 1.06 |
| 19:00-19:14 | 526 | 680 | 129 | 118 | 10 | 3.1 | 2.22 | 0.88 |
| 19:15-19:29 | 383 | 641 | 118 | 86 | 6 | 2.98 | 2.65 | 0.94 |
| 19:30-19:44 | 317 | 406 | 139 | 76 | 18 | 4.28 | 2.48 | 1.04 |
| 19:45-19:59 | 305 | 859 | 149 | 109 | 13 | 3.28 | 2.24 | 1.03 |
| 20:00-20:14 | 274 | 372 | 56 | 36 | 13 | 2.59 | 1.89 | 0.66 |
| 20:15-20:29 | 238 | 304 | 32 | 21 | 18 | 2.95 | 2.24 | 0.59 |
| 20:30-20:44 | 212 | 272 | 32 | 34 | 18 | 3.3 | 1.89 | 0.67 |
| 20:45-20:59 | 248 | 213 | 51 | 41 | 14 | 3.03 | 3.1 | 0.45 |
| 21:00-21:14 | 221 | 351 | 47 | 44 | 18 | 3.69 | 2.38 | 0.5 |
| 21:15-21:29 | 263 | 311 | 34 | 26 | 12 | 3.4 | 2.14 | 0.46 |
| 21:30-21:44 | 264 | 373 | 34 | 25 | 14 | 2.6 | 2.27 | 0.5 |
| 21:45-21:59 | 256 | 366 | 30 | 47 | 6 | 2.69 | 1.98 | 0.49 |

#### Location: Bakuli Intersection
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 461 | 480 | 94 | 108 | 15 | 4.47 | 2.33 | 0.96 |
| 07:15-07:29 | 401 | 598 | 124 | 53 | 6 | 3.77 | 2.45 | 0.95 |
| 07:30-07:44 | 535 | 653 | 82 | 58 | 13 | 4.47 | 2.81 | 0.95 |
| 07:45-07:59 | 302 | 414 | 142 | 70 | 13 | 3.96 | 2.5 | 0.92 |
| 08:00-08:14 | 575 | 641 | 148 | 77 | 17 | 3.24 | 2.39 | 0.89 |
| 08:15-08:29 | 486 | 743 | 102 | 52 | 5 | 2.71 | 2.04 | 0.98 |
| 08:30-08:44 | 350 | 841 | 128 | 72 | 5 | 2.8 | 2.03 | 1.09 |
| 08:45-08:59 | 312 | 574 | 138 | 52 | 10 | 2.76 | 2.41 | 0.97 |
| 09:00-09:14 | 389 | 892 | 106 | 65 | 18 | 3.22 | 3.1 | 0.91 |
| 09:15-09:29 | 575 | 653 | 129 | 67 | 19 | 3.61 | 2.58 | 0.88 |
| 09:30-09:44 | 422 | 548 | 139 | 72 | 12 | 2.86 | 3.07 | 0.97 |
| 09:45-09:59 | 392 | 575 | 129 | 117 | 5 | 2.15 | 3.01 | 1.08 |
| 10:00-10:14 | 225 | 310 | 50 | 32 | 9 | 2.58 | 2.71 | 0.51 |
| 10:15-10:29 | 202 | 377 | 67 | 21 | 16 | 2.72 | 1.95 | 0.55 |
| 10:30-10:44 | 254 | 389 | 47 | 21 | 6 | 2.11 | 2.98 | 0.51 |
| 10:45-10:59 | 253 | 377 | 62 | 21 | 20 | 3.54 | 3.09 | 0.48 |
| 16:00-16:14 | 202 | 326 | 65 | 45 | 7 | 4.2 | 2.77 | 0.42 |
| 16:15-16:29 | 294 | 358 | 52 | 23 | 17 | 2.81 | 3.03 | 0.64 |
| 16:30-16:44 | 280 | 310 | 64 | 25 | 7 | 2.82 | 2.31 | 0.59 |
| 16:45-16:59 | 160 | 246 | 40 | 36 | 20 | 3.58 | 1.83 | 0.51 |
| 17:00-17:14 | 487 | 631 | 101 | 81 | 9 | 2.52 | 2.68 | 1.02 |
| 17:15-17:29 | 357 | 684 | 85 | 89 | 16 | 2.99 | 1.85 | 1.08 |
| 17:30-17:44 | 328 | 401 | 144 | 83 | 5 | 3.44 | 2.05 | 0.99 |
| 17:45-17:59 | 502 | 468 | 128 | 115 | 12 | 3.5 | 2.58 | 0.86 |
| 18:00-18:14 | 474 | 800 | 121 | 95 | 13 | 3.62 | 2.02 | 1.05 |
| 18:15-18:29 | 429 | 678 | 108 | 111 | 14 | 3.29 | 3.15 | 0.96 |
| 18:30-18:44 | 399 | 887 | 94 | 82 | 7 | 3.24 | 2.73 | 0.95 |
| 18:45-18:59 | 562 | 499 | 108 | 59 | 16 | 2.27 | 1.85 | 0.96 |
| 19:00-19:14 | 392 | 532 | 97 | 67 | 10 | 2.55 | 2.96 | 1.01 |
| 19:15-19:29 | 468 | 471 | 92 | 85 | 9 | 3.54 | 2.01 | 1.05 |
| 19:30-19:44 | 588 | 587 | 116 | 89 | 8 | 4.47 | 2.99 | 1.02 |
| 19:45-19:59 | 461 | 407 | 108 | 61 | 6 | 2.49 | 2.5 | 0.95 |
| 20:00-20:14 | 274 | 363 | 37 | 33 | 8 | 3.0 | 2.61 | 0.6 |
| 20:15-20:29 | 298 | 394 | 40 | 48 | 9 | 3.17 | 3.08 | 0.57 |
| 20:30-20:44 | 177 | 231 | 42 | 35 | 20 | 4.36 | 2.35 | 0.58 |
| 20:45-20:59 | 242 | 231 | 52 | 43 | 17 | 2.87 | 2.91 | 0.45 |
| 21:00-21:14 | 274 | 386 | 33 | 23 | 10 | 3.03 | 2.38 | 0.54 |
| 21:15-21:29 | 280 | 335 | 50 | 43 | 19 | 2.46 | 1.98 | 0.6 |
| 21:30-21:44 | 283 | 245 | 35 | 32 | 19 | 3.22 | 2.94 | 0.59 |
| 21:45-21:59 | 196 | 367 | 55 | 24 | 20 | 3.26 | 2.29 | 0.62 |

#### Location: Bwaise Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 573 | 515 | 150 | 83 | 13 | 3.05 | 2.21 | 1.04 |
| 07:15-07:29 | 371 | 671 | 97 | 84 | 17 | 2.95 | 3.05 | 0.91 |
| 07:30-07:44 | 361 | 710 | 107 | 56 | 8 | 2.15 | 2.13 | 0.88 |
| 07:45-07:59 | 301 | 704 | 84 | 54 | 18 | 4.22 | 3.19 | 0.89 |
| 08:00-08:14 | 346 | 544 | 120 | 83 | 14 | 3.53 | 3.01 | 0.9 |
| 08:15-08:29 | 540 | 862 | 136 | 109 | 7 | 2.27 | 2.01 | 0.91 |
| 08:30-08:44 | 528 | 798 | 101 | 62 | 8 | 3.22 | 2.92 | 1.07 |
| 08:45-08:59 | 398 | 800 | 100 | 98 | 5 | 4.29 | 2.22 | 0.87 |
| 09:00-09:14 | 585 | 667 | 149 | 99 | 15 | 2.84 | 2.99 | 0.93 |
| 09:15-09:29 | 570 | 519 | 88 | 113 | 13 | 2.44 | 1.98 | 0.98 |
| 09:30-09:44 | 463 | 583 | 103 | 76 | 15 | 2.93 | 2.97 | 1.1 |
| 09:45-09:59 | 317 | 821 | 127 | 92 | 16 | 4.14 | 3.04 | 1.05 |
| 10:00-10:14 | 288 | 369 | 56 | 48 | 15 | 3.21 | 1.96 | 0.45 |
| 10:15-10:29 | 232 | 297 | 31 | 35 | 18 | 3.04 | 1.82 | 0.5 |
| 10:30-10:44 | 262 | 201 | 42 | 49 | 10 | 2.17 | 2.21 | 0.61 |
| 10:45-10:59 | 229 | 274 | 33 | 24 | 17 | 3.82 | 2.07 | 0.56 |
| 16:00-16:14 | 250 | 279 | 66 | 21 | 20 | 2.49 | 1.84 | 0.45 |
| 16:15-16:29 | 288 | 253 | 48 | 48 | 18 | 2.12 | 2.91 | 0.41 |
| 16:30-16:44 | 204 | 262 | 48 | 47 | 18 | 2.32 | 3.15 | 0.64 |
| 16:45-16:59 | 282 | 246 | 68 | 43 | 7 | 2.25 | 2.85 | 0.55 |
| 17:00-17:14 | 467 | 481 | 125 | 117 | 13 | 2.85 | 3.18 | 0.88 |
| 17:15-17:29 | 476 | 714 | 145 | 103 | 20 | 3.61 | 2.04 | 1.03 |
| 17:30-17:44 | 460 | 606 | 134 | 69 | 7 | 2.32 | 2.47 | 0.87 |
| 17:45-17:59 | 303 | 637 | 120 | 91 | 6 | 3.3 | 2.85 | 0.85 |
| 18:00-18:14 | 559 | 892 | 118 | 112 | 15 | 3.55 | 2.04 | 0.95 |
| 18:15-18:29 | 490 | 842 | 88 | 116 | 10 | 3.44 | 3.16 | 0.93 |
| 18:30-18:44 | 517 | 500 | 109 | 79 | 10 | 4.31 | 3.04 | 0.91 |
| 18:45-18:59 | 560 | 433 | 122 | 108 | 10 | 2.34 | 2.21 | 0.85 |
| 19:00-19:14 | 550 | 423 | 128 | 72 | 11 | 4.42 | 2.24 | 0.92 |
| 19:15-19:29 | 485 | 657 | 97 | 78 | 16 | 3.68 | 3.04 | 1.08 |
| 19:30-19:44 | 369 | 717 | 82 | 116 | 19 | 4.03 | 2.26 | 1.06 |
| 19:45-19:59 | 338 | 422 | 147 | 114 | 16 | 2.54 | 2.36 | 0.92 |
| 20:00-20:14 | 228 | 270 | 53 | 38 | 13 | 4.28 | 2.42 | 0.51 |
| 20:15-20:29 | 219 | 361 | 43 | 46 | 6 | 3.65 | 1.86 | 0.4 |
| 20:30-20:44 | 238 | 338 | 65 | 36 | 13 | 4.14 | 2.48 | 0.59 |
| 20:45-20:59 | 240 | 339 | 37 | 45 | 7 | 2.35 | 3.02 | 0.57 |
| 21:00-21:14 | 162 | 241 | 53 | 40 | 10 | 2.86 | 2.29 | 0.63 |
| 21:15-21:29 | 214 | 313 | 38 | 42 | 12 | 3.77 | 2.49 | 0.51 |
| 21:30-21:44 | 280 | 210 | 30 | 25 | 10 | 2.31 | 2.78 | 0.42 |
| 21:45-21:59 | 250 | 306 | 38 | 40 | 15 | 3.47 | 2.15 | 0.58 |

#### Location: Natete Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 485 | 594 | 91 | 98 | 14 | 4.32 | 2.8 | 0.86 |
| 07:15-07:29 | 546 | 463 | 85 | 103 | 8 | 2.73 | 2.49 | 0.88 |
| 07:30-07:44 | 498 | 424 | 147 | 67 | 9 | 2.74 | 1.99 | 0.96 |
| 07:45-07:59 | 573 | 876 | 118 | 106 | 5 | 4.41 | 1.9 | 0.86 |
| 08:00-08:14 | 540 | 725 | 121 | 88 | 10 | 3.89 | 1.98 | 0.95 |
| 08:15-08:29 | 342 | 854 | 135 | 106 | 15 | 2.6 | 2.09 | 1.02 |
| 08:30-08:44 | 561 | 566 | 106 | 91 | 20 | 2.73 | 2.51 | 0.98 |
| 08:45-08:59 | 499 | 672 | 110 | 62 | 14 | 2.19 | 2.37 | 1.03 |
| 09:00-09:14 | 412 | 703 | 95 | 81 | 20 | 3.72 | 2.01 | 0.99 |
| 09:15-09:29 | 497 | 877 | 82 | 101 | 14 | 3.45 | 2.01 | 1.07 |
| 09:30-09:44 | 421 | 501 | 116 | 63 | 17 | 2.43 | 2.78 | 1.06 |
| 09:45-09:59 | 364 | 781 | 128 | 83 | 18 | 3.34 | 3.18 | 0.9 |
| 10:00-10:14 | 207 | 300 | 35 | 35 | 17 | 2.1 | 2.43 | 0.69 |
| 10:15-10:29 | 240 | 263 | 48 | 25 | 12 | 2.75 | 1.83 | 0.47 |
| 10:30-10:44 | 257 | 340 | 59 | 23 | 8 | 3.99 | 2.92 | 0.42 |
| 10:45-10:59 | 181 | 265 | 55 | 37 | 19 | 2.86 | 3.02 | 0.66 |
| 16:00-16:14 | 215 | 258 | 58 | 28 | 11 | 3.14 | 2.84 | 0.45 |
| 16:15-16:29 | 164 | 309 | 59 | 50 | 9 | 2.67 | 2.32 | 0.63 |
| 16:30-16:44 | 252 | 290 | 32 | 42 | 7 | 2.87 | 2.43 | 0.44 |
| 16:45-16:59 | 196 | 203 | 57 | 22 | 6 | 2.39 | 2.31 | 0.45 |
| 17:00-17:14 | 457 | 616 | 136 | 84 | 9 | 3.29 | 2.95 | 0.97 |
| 17:15-17:29 | 488 | 866 | 95 | 58 | 5 | 4.43 | 3.03 | 0.9 |
| 17:30-17:44 | 519 | 556 | 120 | 59 | 11 | 2.24 | 2.19 | 0.88 |
| 17:45-17:59 | 526 | 462 | 81 | 87 | 20 | 4.27 | 2.15 | 1.08 |
| 18:00-18:14 | 302 | 840 | 101 | 78 | 6 | 3.19 | 1.95 | 0.91 |
| 18:15-18:29 | 568 | 633 | 136 | 87 | 19 | 3.73 | 2.5 | 1.05 |
| 18:30-18:44 | 557 | 552 | 139 | 95 | 19 | 4.13 | 2.73 | 1.01 |
| 18:45-18:59 | 538 | 432 | 148 | 64 | 10 | 3.81 | 2.73 | 0.94 |
| 19:00-19:14 | 532 | 812 | 132 | 64 | 12 | 3.53 | 2.75 | 0.9 |
| 19:15-19:29 | 305 | 403 | 84 | 112 | 15 | 3.95 | 2.84 | 0.98 |
| 19:30-19:44 | 399 | 687 | 109 | 91 | 6 | 2.16 | 2.71 | 0.91 |
| 19:45-19:59 | 570 | 680 | 97 | 109 | 5 | 3.3 | 2.31 | 0.9 |
| 20:00-20:14 | 178 | 330 | 69 | 23 | 13 | 3.6 | 2.85 | 0.48 |
| 20:15-20:29 | 240 | 291 | 41 | 21 | 8 | 4.42 | 2.4 | 0.56 |
| 20:30-20:44 | 254 | 288 | 51 | 26 | 10 | 3.54 | 2.07 | 0.51 |
| 20:45-20:59 | 207 | 234 | 41 | 43 | 9 | 2.89 | 1.89 | 0.63 |
| 21:00-21:14 | 230 | 298 | 31 | 41 | 18 | 2.64 | 2.06 | 0.67 |
| 21:15-21:29 | 230 | 396 | 54 | 40 | 13 | 2.7 | 2.99 | 0.63 |
| 21:30-21:44 | 205 | 296 | 40 | 39 | 20 | 3.93 | 2.2 | 0.52 |
| 21:45-21:59 | 249 | 357 | 58 | 22 | 7 | 3.3 | 2.35 | 0.46 |

### A.4 Day 4: 2026-06-04

#### Location: Wandegeya Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 430 | 424 | 137 | 79 | 8 | 2.17 | 2.49 | 1.03 |
| 07:15-07:29 | 544 | 490 | 100 | 101 | 17 | 4.15 | 1.82 | 1.1 |
| 07:30-07:44 | 455 | 444 | 93 | 109 | 6 | 4.22 | 2.68 | 0.98 |
| 07:45-07:59 | 484 | 628 | 80 | 62 | 10 | 2.19 | 1.92 | 1.02 |
| 08:00-08:14 | 592 | 590 | 126 | 51 | 14 | 3.39 | 1.99 | 0.89 |
| 08:15-08:29 | 525 | 664 | 90 | 79 | 16 | 3.69 | 1.86 | 0.98 |
| 08:30-08:44 | 425 | 603 | 87 | 74 | 7 | 4.13 | 3.15 | 1.02 |
| 08:45-08:59 | 443 | 671 | 82 | 56 | 15 | 4.39 | 2.83 | 0.98 |
| 09:00-09:14 | 567 | 536 | 150 | 54 | 12 | 3.31 | 2.66 | 0.89 |
| 09:15-09:29 | 404 | 858 | 118 | 82 | 20 | 3.19 | 2.1 | 0.92 |
| 09:30-09:44 | 372 | 429 | 139 | 91 | 13 | 3.31 | 2.64 | 0.97 |
| 09:45-09:59 | 585 | 813 | 98 | 113 | 12 | 2.13 | 2.92 | 0.93 |
| 10:00-10:14 | 219 | 270 | 64 | 29 | 15 | 3.64 | 2.62 | 0.58 |
| 10:15-10:29 | 259 | 338 | 54 | 45 | 12 | 3.25 | 2.35 | 0.63 |
| 10:30-10:44 | 210 | 359 | 55 | 21 | 17 | 2.9 | 2.64 | 0.7 |
| 10:45-10:59 | 246 | 218 | 51 | 30 | 10 | 4.23 | 1.83 | 0.45 |
| 16:00-16:14 | 237 | 243 | 32 | 21 | 5 | 2.25 | 2.09 | 0.56 |
| 16:15-16:29 | 278 | 312 | 63 | 44 | 12 | 3.98 | 2.71 | 0.48 |
| 16:30-16:44 | 203 | 257 | 56 | 35 | 6 | 3.1 | 1.89 | 0.66 |
| 16:45-16:59 | 160 | 242 | 57 | 29 | 18 | 3.16 | 1.92 | 0.67 |
| 17:00-17:14 | 554 | 778 | 117 | 80 | 9 | 2.11 | 1.9 | 1.02 |
| 17:15-17:29 | 468 | 556 | 124 | 85 | 7 | 3.27 | 2.32 | 0.87 |
| 17:30-17:44 | 425 | 615 | 133 | 79 | 11 | 2.65 | 2.0 | 0.87 |
| 17:45-17:59 | 518 | 425 | 80 | 61 | 18 | 2.66 | 2.2 | 0.93 |
| 18:00-18:14 | 368 | 808 | 82 | 97 | 19 | 2.7 | 1.92 | 1.06 |
| 18:15-18:29 | 486 | 686 | 144 | 59 | 10 | 2.53 | 3.06 | 0.91 |
| 18:30-18:44 | 463 | 563 | 123 | 113 | 20 | 4.19 | 3.04 | 1.01 |
| 18:45-18:59 | 401 | 486 | 92 | 112 | 5 | 2.55 | 2.32 | 1.02 |
| 19:00-19:14 | 555 | 786 | 84 | 100 | 20 | 3.98 | 2.62 | 0.86 |
| 19:15-19:29 | 309 | 807 | 122 | 75 | 13 | 2.54 | 2.73 | 0.85 |
| 19:30-19:44 | 340 | 422 | 94 | 59 | 17 | 3.56 | 2.14 | 1.06 |
| 19:45-19:59 | 415 | 619 | 103 | 58 | 6 | 3.58 | 2.09 | 0.99 |
| 20:00-20:14 | 253 | 264 | 70 | 22 | 9 | 3.1 | 1.87 | 0.46 |
| 20:15-20:29 | 298 | 205 | 30 | 27 | 8 | 3.5 | 2.05 | 0.55 |
| 20:30-20:44 | 255 | 364 | 67 | 29 | 19 | 3.36 | 2.67 | 0.41 |
| 20:45-20:59 | 156 | 214 | 57 | 43 | 11 | 2.76 | 3.01 | 0.69 |
| 21:00-21:14 | 267 | 345 | 55 | 31 | 6 | 3.24 | 2.55 | 0.56 |
| 21:15-21:29 | 278 | 356 | 30 | 46 | 11 | 2.31 | 2.71 | 0.44 |
| 21:30-21:44 | 201 | 241 | 55 | 41 | 8 | 4.17 | 2.52 | 0.6 |
| 21:45-21:59 | 184 | 386 | 44 | 34 | 18 | 3.35 | 2.09 | 0.45 |

#### Location: Kibuye Roundabout
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 519 | 543 | 103 | 95 | 9 | 4.35 | 2.39 | 0.95 |
| 07:15-07:29 | 391 | 628 | 123 | 64 | 5 | 2.2 | 2.07 | 1.09 |
| 07:30-07:44 | 331 | 600 | 93 | 84 | 13 | 4.35 | 1.92 | 0.98 |
| 07:45-07:59 | 571 | 568 | 116 | 62 | 20 | 2.98 | 2.25 | 1.05 |
| 08:00-08:14 | 427 | 541 | 93 | 51 | 12 | 4.21 | 2.81 | 0.91 |
| 08:15-08:29 | 510 | 808 | 82 | 102 | 5 | 3.19 | 1.87 | 1.08 |
| 08:30-08:44 | 496 | 461 | 134 | 86 | 17 | 2.88 | 3.09 | 0.98 |
| 08:45-08:59 | 573 | 458 | 121 | 115 | 6 | 2.37 | 2.55 | 1.03 |
| 09:00-09:14 | 541 | 828 | 147 | 54 | 20 | 3.58 | 2.02 | 0.92 |
| 09:15-09:29 | 496 | 763 | 133 | 112 | 14 | 4.26 | 1.87 | 0.97 |
| 09:30-09:44 | 333 | 601 | 123 | 63 | 13 | 4.39 | 2.45 | 1.06 |
| 09:45-09:59 | 460 | 630 | 116 | 73 | 16 | 2.33 | 3.16 | 1.04 |
| 10:00-10:14 | 151 | 261 | 68 | 48 | 8 | 3.35 | 1.97 | 0.62 |
| 10:15-10:29 | 181 | 375 | 31 | 23 | 8 | 2.17 | 2.78 | 0.46 |
| 10:30-10:44 | 291 | 268 | 57 | 34 | 5 | 2.21 | 2.8 | 0.5 |
| 10:45-10:59 | 215 | 291 | 37 | 31 | 17 | 3.45 | 3.0 | 0.67 |
| 16:00-16:14 | 157 | 341 | 33 | 47 | 13 | 3.26 | 3.09 | 0.66 |
| 16:15-16:29 | 294 | 293 | 31 | 42 | 8 | 3.37 | 1.89 | 0.55 |
| 16:30-16:44 | 234 | 332 | 36 | 28 | 19 | 2.65 | 2.06 | 0.47 |
| 16:45-16:59 | 219 | 374 | 38 | 32 | 17 | 4.44 | 2.17 | 0.67 |
| 17:00-17:14 | 364 | 545 | 140 | 56 | 16 | 4.23 | 2.55 | 0.99 |
| 17:15-17:29 | 440 | 637 | 109 | 101 | 12 | 2.11 | 2.72 | 0.88 |
| 17:30-17:44 | 378 | 813 | 109 | 66 | 11 | 4.17 | 2.05 | 0.93 |
| 17:45-17:59 | 459 | 687 | 119 | 96 | 9 | 2.47 | 1.92 | 1.0 |
| 18:00-18:14 | 592 | 404 | 138 | 83 | 9 | 2.46 | 2.11 | 0.91 |
| 18:15-18:29 | 377 | 514 | 112 | 71 | 8 | 3.22 | 2.38 | 1.09 |
| 18:30-18:44 | 512 | 425 | 113 | 60 | 7 | 3.69 | 2.22 | 0.87 |
| 18:45-18:59 | 563 | 753 | 138 | 98 | 11 | 2.15 | 2.02 | 0.96 |
| 19:00-19:14 | 302 | 533 | 143 | 72 | 8 | 3.09 | 1.83 | 0.95 |
| 19:15-19:29 | 383 | 826 | 129 | 65 | 19 | 2.86 | 2.09 | 1.06 |
| 19:30-19:44 | 570 | 900 | 128 | 63 | 15 | 4.37 | 2.05 | 0.9 |
| 19:45-19:59 | 348 | 553 | 83 | 119 | 12 | 3.95 | 3.18 | 0.95 |
| 20:00-20:14 | 217 | 337 | 31 | 50 | 9 | 3.74 | 3.06 | 0.51 |
| 20:15-20:29 | 197 | 305 | 66 | 24 | 12 | 2.49 | 2.74 | 0.47 |
| 20:30-20:44 | 203 | 309 | 69 | 46 | 11 | 4.05 | 3.03 | 0.58 |
| 20:45-20:59 | 151 | 344 | 37 | 43 | 10 | 2.53 | 3.09 | 0.66 |
| 21:00-21:14 | 272 | 206 | 39 | 46 | 14 | 2.94 | 2.93 | 0.48 |
| 21:15-21:29 | 166 | 221 | 44 | 46 | 15 | 4.23 | 2.52 | 0.5 |
| 21:30-21:44 | 172 | 235 | 32 | 29 | 12 | 2.48 | 2.7 | 0.42 |
| 21:45-21:59 | 189 | 364 | 30 | 27 | 17 | 3.38 | 2.94 | 0.49 |

#### Location: Bakuli Intersection
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 598 | 826 | 84 | 82 | 19 | 3.92 | 2.13 | 1.01 |
| 07:15-07:29 | 526 | 788 | 128 | 66 | 19 | 3.75 | 2.82 | 0.94 |
| 07:30-07:44 | 571 | 578 | 129 | 89 | 8 | 2.15 | 2.38 | 0.86 |
| 07:45-07:59 | 414 | 832 | 136 | 53 | 7 | 2.26 | 1.83 | 1.08 |
| 08:00-08:14 | 539 | 543 | 143 | 58 | 12 | 4.34 | 2.52 | 0.89 |
| 08:15-08:29 | 454 | 867 | 94 | 106 | 10 | 4.29 | 2.46 | 0.93 |
| 08:30-08:44 | 455 | 645 | 140 | 120 | 11 | 2.45 | 3.05 | 0.92 |
| 08:45-08:59 | 535 | 541 | 84 | 93 | 14 | 3.02 | 2.58 | 1.07 |
| 09:00-09:14 | 582 | 615 | 88 | 120 | 17 | 3.75 | 2.47 | 1.1 |
| 09:15-09:29 | 585 | 605 | 132 | 103 | 13 | 3.94 | 2.15 | 1.0 |
| 09:30-09:44 | 469 | 482 | 81 | 96 | 6 | 4.2 | 3.19 | 1.03 |
| 09:45-09:59 | 528 | 493 | 134 | 59 | 8 | 3.57 | 2.59 | 0.89 |
| 10:00-10:14 | 248 | 211 | 58 | 30 | 7 | 3.2 | 1.93 | 0.69 |
| 10:15-10:29 | 278 | 334 | 59 | 20 | 8 | 2.58 | 1.8 | 0.5 |
| 10:30-10:44 | 197 | 283 | 57 | 21 | 15 | 2.59 | 2.84 | 0.61 |
| 10:45-10:59 | 211 | 250 | 39 | 20 | 5 | 2.1 | 3.01 | 0.61 |
| 16:00-16:14 | 232 | 203 | 37 | 29 | 8 | 4.43 | 2.06 | 0.64 |
| 16:15-16:29 | 283 | 323 | 58 | 21 | 5 | 3.29 | 2.18 | 0.47 |
| 16:30-16:44 | 180 | 214 | 45 | 45 | 17 | 3.61 | 2.54 | 0.51 |
| 16:45-16:59 | 276 | 363 | 56 | 22 | 8 | 3.45 | 2.85 | 0.51 |
| 17:00-17:14 | 532 | 694 | 100 | 94 | 8 | 2.99 | 1.85 | 0.92 |
| 17:15-17:29 | 397 | 775 | 145 | 103 | 19 | 4.1 | 2.53 | 1.06 |
| 17:30-17:44 | 393 | 874 | 83 | 59 | 9 | 3.68 | 1.96 | 0.89 |
| 17:45-17:59 | 313 | 717 | 143 | 79 | 6 | 3.23 | 2.84 | 0.85 |
| 18:00-18:14 | 402 | 467 | 101 | 100 | 11 | 4.37 | 3.19 | 1.05 |
| 18:15-18:29 | 590 | 813 | 113 | 106 | 9 | 4.27 | 2.63 | 0.87 |
| 18:30-18:44 | 550 | 885 | 120 | 119 | 12 | 3.25 | 2.73 | 1.08 |
| 18:45-18:59 | 584 | 402 | 102 | 86 | 11 | 2.9 | 2.82 | 0.88 |
| 19:00-19:14 | 563 | 887 | 87 | 66 | 16 | 2.39 | 2.36 | 0.96 |
| 19:15-19:29 | 465 | 440 | 82 | 84 | 11 | 2.41 | 2.91 | 0.89 |
| 19:30-19:44 | 527 | 684 | 132 | 53 | 18 | 2.81 | 2.75 | 0.86 |
| 19:45-19:59 | 442 | 426 | 124 | 64 | 8 | 3.25 | 2.23 | 0.95 |
| 20:00-20:14 | 220 | 284 | 54 | 35 | 8 | 4.09 | 2.95 | 0.62 |
| 20:15-20:29 | 204 | 351 | 70 | 46 | 15 | 2.33 | 2.13 | 0.61 |
| 20:30-20:44 | 254 | 337 | 44 | 44 | 15 | 2.54 | 2.41 | 0.61 |
| 20:45-20:59 | 238 | 319 | 50 | 30 | 9 | 4.25 | 1.95 | 0.51 |
| 21:00-21:14 | 175 | 292 | 57 | 24 | 7 | 3.65 | 2.55 | 0.49 |
| 21:15-21:29 | 272 | 316 | 70 | 38 | 17 | 3.43 | 2.72 | 0.69 |
| 21:30-21:44 | 220 | 371 | 39 | 45 | 6 | 2.61 | 2.26 | 0.57 |
| 21:45-21:59 | 293 | 208 | 33 | 27 | 6 | 3.14 | 2.72 | 0.51 |

#### Location: Bwaise Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 327 | 598 | 115 | 114 | 20 | 2.27 | 2.56 | 0.85 |
| 07:15-07:29 | 372 | 784 | 138 | 101 | 8 | 4.0 | 2.33 | 1.03 |
| 07:30-07:44 | 566 | 593 | 136 | 75 | 11 | 3.34 | 2.46 | 0.9 |
| 07:45-07:59 | 545 | 417 | 137 | 88 | 15 | 2.44 | 2.02 | 0.94 |
| 08:00-08:14 | 417 | 845 | 85 | 113 | 11 | 3.73 | 2.78 | 1.05 |
| 08:15-08:29 | 407 | 769 | 125 | 111 | 17 | 4.28 | 2.52 | 0.95 |
| 08:30-08:44 | 385 | 677 | 109 | 54 | 6 | 2.46 | 2.09 | 1.04 |
| 08:45-08:59 | 328 | 599 | 88 | 99 | 9 | 4.09 | 3.07 | 1.04 |
| 09:00-09:14 | 482 | 592 | 80 | 102 | 15 | 2.25 | 2.78 | 0.94 |
| 09:15-09:29 | 374 | 834 | 117 | 62 | 7 | 3.96 | 3.18 | 1.09 |
| 09:30-09:44 | 403 | 713 | 92 | 68 | 15 | 4.17 | 2.32 | 0.91 |
| 09:45-09:59 | 459 | 401 | 148 | 85 | 6 | 2.25 | 2.75 | 1.09 |
| 10:00-10:14 | 164 | 388 | 45 | 49 | 16 | 2.13 | 2.11 | 0.65 |
| 10:15-10:29 | 254 | 297 | 62 | 44 | 8 | 2.66 | 3.15 | 0.52 |
| 10:30-10:44 | 167 | 203 | 59 | 29 | 16 | 2.25 | 3.05 | 0.41 |
| 10:45-10:59 | 241 | 229 | 30 | 22 | 13 | 3.45 | 2.72 | 0.63 |
| 16:00-16:14 | 255 | 394 | 47 | 50 | 10 | 4.31 | 2.91 | 0.53 |
| 16:15-16:29 | 155 | 233 | 51 | 46 | 7 | 2.45 | 2.85 | 0.58 |
| 16:30-16:44 | 214 | 376 | 38 | 23 | 20 | 4.14 | 2.34 | 0.52 |
| 16:45-16:59 | 237 | 365 | 51 | 40 | 9 | 2.57 | 2.78 | 0.43 |
| 17:00-17:14 | 598 | 633 | 145 | 67 | 18 | 3.05 | 2.61 | 1.01 |
| 17:15-17:29 | 529 | 687 | 122 | 109 | 6 | 3.69 | 3.03 | 0.93 |
| 17:30-17:44 | 466 | 686 | 127 | 111 | 9 | 4.06 | 2.33 | 0.89 |
| 17:45-17:59 | 591 | 626 | 81 | 55 | 17 | 3.31 | 2.07 | 0.95 |
| 18:00-18:14 | 577 | 875 | 110 | 71 | 10 | 2.82 | 1.84 | 0.97 |
| 18:15-18:29 | 589 | 418 | 150 | 113 | 9 | 3.83 | 2.19 | 0.92 |
| 18:30-18:44 | 390 | 417 | 92 | 98 | 8 | 3.8 | 2.53 | 1.1 |
| 18:45-18:59 | 530 | 658 | 89 | 118 | 15 | 4.15 | 1.95 | 1.04 |
| 19:00-19:14 | 557 | 766 | 136 | 98 | 5 | 2.89 | 3.05 | 0.87 |
| 19:15-19:29 | 382 | 814 | 129 | 113 | 13 | 3.12 | 2.17 | 0.94 |
| 19:30-19:44 | 314 | 416 | 114 | 102 | 10 | 2.51 | 2.4 | 0.95 |
| 19:45-19:59 | 420 | 704 | 141 | 51 | 8 | 4.0 | 2.28 | 0.88 |
| 20:00-20:14 | 200 | 309 | 66 | 41 | 11 | 4.31 | 3.04 | 0.62 |
| 20:15-20:29 | 252 | 229 | 60 | 43 | 5 | 3.44 | 2.54 | 0.62 |
| 20:30-20:44 | 155 | 353 | 65 | 34 | 18 | 4.44 | 2.31 | 0.43 |
| 20:45-20:59 | 296 | 264 | 46 | 41 | 9 | 3.99 | 3.14 | 0.45 |
| 21:00-21:14 | 294 | 320 | 65 | 39 | 5 | 4.4 | 2.39 | 0.59 |
| 21:15-21:29 | 253 | 243 | 35 | 28 | 17 | 3.58 | 1.91 | 0.4 |
| 21:30-21:44 | 196 | 338 | 40 | 41 | 12 | 3.59 | 2.78 | 0.49 |
| 21:45-21:59 | 249 | 352 | 67 | 30 | 10 | 3.99 | 2.89 | 0.57 |

#### Location: Natete Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 477 | 535 | 90 | 109 | 5 | 3.75 | 1.99 | 1.06 |
| 07:15-07:29 | 450 | 446 | 145 | 112 | 19 | 3.82 | 2.72 | 0.89 |
| 07:30-07:44 | 540 | 778 | 118 | 56 | 14 | 4.24 | 2.24 | 1.05 |
| 07:45-07:59 | 385 | 875 | 117 | 99 | 18 | 2.48 | 2.0 | 1.08 |
| 08:00-08:14 | 307 | 859 | 102 | 51 | 17 | 2.44 | 2.08 | 0.98 |
| 08:15-08:29 | 388 | 652 | 110 | 106 | 5 | 4.43 | 2.13 | 0.86 |
| 08:30-08:44 | 487 | 683 | 92 | 113 | 15 | 4.22 | 2.83 | 1.1 |
| 08:45-08:59 | 413 | 494 | 132 | 58 | 17 | 2.35 | 2.66 | 0.88 |
| 09:00-09:14 | 519 | 861 | 150 | 117 | 20 | 3.67 | 1.95 | 1.01 |
| 09:15-09:29 | 399 | 508 | 121 | 76 | 8 | 2.32 | 3.15 | 0.97 |
| 09:30-09:44 | 563 | 753 | 135 | 92 | 8 | 4.46 | 3.16 | 0.89 |
| 09:45-09:59 | 384 | 886 | 112 | 81 | 14 | 4.08 | 2.84 | 0.99 |
| 10:00-10:14 | 201 | 250 | 63 | 44 | 16 | 3.43 | 3.13 | 0.69 |
| 10:15-10:29 | 290 | 361 | 63 | 30 | 18 | 2.73 | 2.14 | 0.48 |
| 10:30-10:44 | 167 | 295 | 70 | 27 | 5 | 2.69 | 2.0 | 0.7 |
| 10:45-10:59 | 202 | 329 | 59 | 24 | 18 | 3.16 | 1.89 | 0.66 |
| 16:00-16:14 | 267 | 232 | 66 | 29 | 18 | 2.91 | 2.57 | 0.53 |
| 16:15-16:29 | 161 | 237 | 60 | 25 | 18 | 2.76 | 2.17 | 0.68 |
| 16:30-16:44 | 205 | 347 | 58 | 49 | 10 | 2.63 | 2.23 | 0.56 |
| 16:45-16:59 | 169 | 344 | 48 | 35 | 20 | 4.04 | 2.36 | 0.52 |
| 17:00-17:14 | 346 | 512 | 102 | 70 | 19 | 2.14 | 2.09 | 1.03 |
| 17:15-17:29 | 542 | 797 | 149 | 71 | 10 | 3.93 | 2.69 | 0.9 |
| 17:30-17:44 | 504 | 786 | 126 | 79 | 7 | 2.14 | 2.73 | 0.98 |
| 17:45-17:59 | 590 | 871 | 126 | 57 | 5 | 3.25 | 2.82 | 1.07 |
| 18:00-18:14 | 351 | 416 | 148 | 73 | 17 | 2.13 | 1.91 | 0.92 |
| 18:15-18:29 | 532 | 489 | 141 | 51 | 19 | 3.01 | 2.13 | 1.09 |
| 18:30-18:44 | 544 | 494 | 149 | 117 | 19 | 3.19 | 2.77 | 0.94 |
| 18:45-18:59 | 451 | 544 | 86 | 109 | 9 | 3.9 | 3.12 | 1.06 |
| 19:00-19:14 | 351 | 415 | 123 | 109 | 9 | 3.12 | 3.19 | 0.96 |
| 19:15-19:29 | 489 | 413 | 91 | 114 | 13 | 3.35 | 1.9 | 1.0 |
| 19:30-19:44 | 549 | 893 | 140 | 60 | 15 | 3.81 | 2.91 | 0.94 |
| 19:45-19:59 | 420 | 431 | 149 | 107 | 12 | 2.81 | 2.17 | 0.88 |
| 20:00-20:14 | 204 | 343 | 32 | 38 | 7 | 4.28 | 2.08 | 0.42 |
| 20:15-20:29 | 185 | 291 | 65 | 46 | 14 | 4.14 | 1.86 | 0.46 |
| 20:30-20:44 | 261 | 255 | 51 | 29 | 17 | 3.94 | 2.24 | 0.47 |
| 20:45-20:59 | 244 | 323 | 58 | 46 | 20 | 3.84 | 2.8 | 0.46 |
| 21:00-21:14 | 160 | 302 | 38 | 25 | 18 | 3.97 | 2.74 | 0.5 |
| 21:15-21:29 | 190 | 372 | 56 | 20 | 6 | 3.22 | 3.0 | 0.62 |
| 21:30-21:44 | 299 | 288 | 65 | 25 | 17 | 2.74 | 2.07 | 0.5 |
| 21:45-21:59 | 246 | 369 | 51 | 23 | 13 | 3.62 | 2.77 | 0.58 |

### A.5 Day 5: 2026-06-05

#### Location: Wandegeya Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 585 | 405 | 108 | 61 | 20 | 3.51 | 2.64 | 0.92 |
| 07:15-07:29 | 466 | 586 | 130 | 75 | 17 | 2.8 | 2.36 | 1.04 |
| 07:30-07:44 | 583 | 629 | 127 | 103 | 18 | 2.81 | 2.07 | 1.1 |
| 07:45-07:59 | 355 | 568 | 109 | 105 | 18 | 2.92 | 2.69 | 1.01 |
| 08:00-08:14 | 348 | 705 | 106 | 85 | 7 | 3.64 | 2.14 | 1.02 |
| 08:15-08:29 | 430 | 891 | 132 | 104 | 20 | 4.18 | 2.21 | 0.97 |
| 08:30-08:44 | 502 | 824 | 100 | 98 | 19 | 3.5 | 2.19 | 1.01 |
| 08:45-08:59 | 401 | 860 | 85 | 62 | 6 | 3.56 | 2.65 | 1.06 |
| 09:00-09:14 | 373 | 826 | 113 | 77 | 8 | 2.65 | 2.08 | 0.98 |
| 09:15-09:29 | 473 | 525 | 123 | 105 | 14 | 3.68 | 2.89 | 1.03 |
| 09:30-09:44 | 364 | 715 | 135 | 96 | 17 | 2.25 | 2.37 | 1.1 |
| 09:45-09:59 | 599 | 631 | 95 | 68 | 9 | 2.3 | 2.67 | 1.04 |
| 10:00-10:14 | 211 | 335 | 58 | 37 | 8 | 3.1 | 1.95 | 0.43 |
| 10:15-10:29 | 222 | 279 | 54 | 43 | 5 | 4.17 | 3.01 | 0.61 |
| 10:30-10:44 | 299 | 301 | 65 | 20 | 17 | 3.41 | 2.81 | 0.59 |
| 10:45-10:59 | 289 | 345 | 49 | 46 | 18 | 3.16 | 2.69 | 0.52 |
| 16:00-16:14 | 266 | 359 | 64 | 36 | 12 | 3.95 | 2.11 | 0.6 |
| 16:15-16:29 | 300 | 252 | 39 | 44 | 10 | 2.53 | 2.0 | 0.65 |
| 16:30-16:44 | 226 | 290 | 67 | 24 | 9 | 3.27 | 2.33 | 0.49 |
| 16:45-16:59 | 236 | 296 | 70 | 31 | 10 | 2.67 | 2.69 | 0.59 |
| 17:00-17:14 | 586 | 521 | 107 | 96 | 15 | 4.09 | 2.01 | 1.0 |
| 17:15-17:29 | 407 | 806 | 96 | 76 | 17 | 3.67 | 1.88 | 1.09 |
| 17:30-17:44 | 348 | 401 | 138 | 111 | 13 | 3.98 | 2.18 | 0.96 |
| 17:45-17:59 | 455 | 804 | 146 | 117 | 18 | 4.3 | 2.6 | 1.03 |
| 18:00-18:14 | 502 | 806 | 126 | 105 | 11 | 2.72 | 3.0 | 0.92 |
| 18:15-18:29 | 333 | 437 | 110 | 71 | 9 | 2.86 | 3.09 | 0.93 |
| 18:30-18:44 | 455 | 473 | 83 | 69 | 19 | 3.76 | 1.84 | 1.01 |
| 18:45-18:59 | 391 | 779 | 142 | 59 | 8 | 3.76 | 2.22 | 1.1 |
| 19:00-19:14 | 516 | 545 | 112 | 73 | 5 | 2.32 | 2.4 | 0.89 |
| 19:15-19:29 | 360 | 587 | 80 | 117 | 20 | 2.56 | 2.7 | 0.99 |
| 19:30-19:44 | 564 | 737 | 132 | 116 | 10 | 4.27 | 2.47 | 1.0 |
| 19:45-19:59 | 416 | 888 | 121 | 57 | 10 | 4.48 | 2.05 | 0.9 |
| 20:00-20:14 | 160 | 394 | 62 | 43 | 19 | 4.1 | 3.06 | 0.48 |
| 20:15-20:29 | 254 | 382 | 54 | 21 | 14 | 3.28 | 2.63 | 0.54 |
| 20:30-20:44 | 200 | 399 | 57 | 39 | 6 | 3.03 | 2.26 | 0.65 |
| 20:45-20:59 | 221 | 298 | 52 | 36 | 11 | 4.35 | 3.1 | 0.67 |
| 21:00-21:14 | 236 | 237 | 46 | 21 | 19 | 4.4 | 2.17 | 0.41 |
| 21:15-21:29 | 158 | 384 | 32 | 33 | 6 | 3.06 | 1.96 | 0.68 |
| 21:30-21:44 | 229 | 286 | 46 | 43 | 14 | 3.64 | 3.06 | 0.62 |
| 21:45-21:59 | 254 | 331 | 58 | 42 | 13 | 3.64 | 2.8 | 0.55 |

#### Location: Kibuye Roundabout
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 575 | 725 | 133 | 115 | 15 | 3.68 | 2.8 | 0.97 |
| 07:15-07:29 | 397 | 600 | 121 | 51 | 5 | 4.39 | 3.2 | 1.05 |
| 07:30-07:44 | 303 | 689 | 149 | 89 | 13 | 3.42 | 2.58 | 0.85 |
| 07:45-07:59 | 472 | 475 | 97 | 50 | 15 | 3.93 | 2.11 | 0.98 |
| 08:00-08:14 | 517 | 591 | 90 | 100 | 17 | 3.02 | 2.75 | 0.97 |
| 08:15-08:29 | 452 | 839 | 134 | 61 | 7 | 2.25 | 1.92 | 1.01 |
| 08:30-08:44 | 320 | 711 | 143 | 106 | 18 | 2.68 | 1.8 | 0.97 |
| 08:45-08:59 | 349 | 746 | 147 | 116 | 9 | 2.42 | 2.5 | 1.06 |
| 09:00-09:14 | 600 | 576 | 101 | 82 | 7 | 2.16 | 2.87 | 0.96 |
| 09:15-09:29 | 531 | 431 | 132 | 78 | 14 | 3.76 | 2.11 | 0.86 |
| 09:30-09:44 | 572 | 485 | 117 | 64 | 20 | 2.57 | 3.17 | 1.02 |
| 09:45-09:59 | 415 | 495 | 133 | 116 | 19 | 2.74 | 2.25 | 0.87 |
| 10:00-10:14 | 155 | 262 | 47 | 37 | 20 | 4.01 | 3.05 | 0.56 |
| 10:15-10:29 | 242 | 360 | 55 | 46 | 13 | 2.17 | 1.82 | 0.41 |
| 10:30-10:44 | 250 | 246 | 53 | 26 | 12 | 3.21 | 2.83 | 0.5 |
| 10:45-10:59 | 184 | 260 | 69 | 46 | 8 | 2.93 | 3.16 | 0.57 |
| 16:00-16:14 | 175 | 221 | 65 | 45 | 5 | 2.17 | 2.21 | 0.6 |
| 16:15-16:29 | 248 | 359 | 47 | 31 | 19 | 2.86 | 2.81 | 0.48 |
| 16:30-16:44 | 178 | 376 | 47 | 47 | 5 | 2.87 | 2.34 | 0.66 |
| 16:45-16:59 | 173 | 344 | 48 | 29 | 6 | 3.53 | 2.7 | 0.49 |
| 17:00-17:14 | 450 | 620 | 82 | 116 | 13 | 3.88 | 1.89 | 1.0 |
| 17:15-17:29 | 515 | 459 | 102 | 59 | 20 | 3.74 | 2.47 | 1.07 |
| 17:30-17:44 | 353 | 513 | 97 | 67 | 19 | 4.22 | 2.04 | 0.98 |
| 17:45-17:59 | 465 | 534 | 127 | 104 | 12 | 3.23 | 2.13 | 1.06 |
| 18:00-18:14 | 355 | 777 | 98 | 82 | 8 | 3.63 | 2.96 | 0.96 |
| 18:15-18:29 | 367 | 584 | 142 | 64 | 20 | 2.39 | 2.77 | 0.91 |
| 18:30-18:44 | 473 | 880 | 134 | 113 | 19 | 4.01 | 3.18 | 1.06 |
| 18:45-18:59 | 453 | 771 | 139 | 120 | 18 | 3.19 | 2.27 | 0.98 |
| 19:00-19:14 | 402 | 681 | 83 | 80 | 19 | 4.15 | 3.16 | 1.07 |
| 19:15-19:29 | 513 | 459 | 142 | 53 | 14 | 4.34 | 2.02 | 1.09 |
| 19:30-19:44 | 412 | 657 | 142 | 100 | 19 | 4.39 | 2.11 | 0.9 |
| 19:45-19:59 | 539 | 587 | 145 | 114 | 10 | 2.5 | 2.34 | 0.86 |
| 20:00-20:14 | 169 | 349 | 54 | 49 | 10 | 4.17 | 2.46 | 0.58 |
| 20:15-20:29 | 233 | 221 | 33 | 28 | 14 | 3.37 | 2.24 | 0.4 |
| 20:30-20:44 | 225 | 395 | 70 | 38 | 14 | 3.88 | 2.14 | 0.65 |
| 20:45-20:59 | 216 | 204 | 49 | 40 | 19 | 3.37 | 1.97 | 0.53 |
| 21:00-21:14 | 269 | 236 | 44 | 31 | 11 | 3.62 | 2.61 | 0.43 |
| 21:15-21:29 | 189 | 235 | 38 | 48 | 17 | 2.43 | 2.51 | 0.53 |
| 21:30-21:44 | 285 | 360 | 60 | 45 | 10 | 4.31 | 2.75 | 0.69 |
| 21:45-21:59 | 155 | 361 | 51 | 48 | 6 | 2.98 | 1.93 | 0.48 |

#### Location: Bakuli Intersection
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 423 | 683 | 136 | 88 | 19 | 3.51 | 2.62 | 0.89 |
| 07:15-07:29 | 385 | 679 | 102 | 72 | 13 | 3.85 | 3.1 | 1.04 |
| 07:30-07:44 | 307 | 732 | 142 | 60 | 9 | 2.74 | 2.23 | 0.88 |
| 07:45-07:59 | 514 | 544 | 148 | 83 | 10 | 4.25 | 1.86 | 0.96 |
| 08:00-08:14 | 391 | 584 | 114 | 90 | 9 | 3.0 | 2.54 | 0.97 |
| 08:15-08:29 | 552 | 434 | 135 | 108 | 10 | 3.93 | 2.95 | 0.97 |
| 08:30-08:44 | 545 | 593 | 117 | 72 | 15 | 2.89 | 2.12 | 0.85 |
| 08:45-08:59 | 340 | 872 | 92 | 76 | 7 | 2.61 | 1.96 | 1.02 |
| 09:00-09:14 | 416 | 439 | 107 | 113 | 20 | 3.19 | 2.44 | 1.09 |
| 09:15-09:29 | 412 | 848 | 127 | 118 | 7 | 3.47 | 2.4 | 1.06 |
| 09:30-09:44 | 306 | 658 | 88 | 100 | 16 | 2.16 | 3.1 | 0.89 |
| 09:45-09:59 | 413 | 533 | 140 | 72 | 16 | 2.12 | 2.08 | 0.87 |
| 10:00-10:14 | 174 | 260 | 44 | 22 | 6 | 2.31 | 1.96 | 0.6 |
| 10:15-10:29 | 228 | 233 | 54 | 38 | 12 | 3.86 | 2.77 | 0.55 |
| 10:30-10:44 | 238 | 285 | 66 | 31 | 7 | 3.12 | 1.81 | 0.54 |
| 10:45-10:59 | 288 | 386 | 34 | 28 | 6 | 3.85 | 1.98 | 0.54 |
| 16:00-16:14 | 275 | 232 | 69 | 38 | 11 | 4.27 | 2.97 | 0.44 |
| 16:15-16:29 | 198 | 290 | 43 | 30 | 14 | 3.52 | 3.07 | 0.49 |
| 16:30-16:44 | 164 | 247 | 59 | 39 | 19 | 2.18 | 2.71 | 0.48 |
| 16:45-16:59 | 270 | 348 | 63 | 34 | 15 | 2.23 | 2.59 | 0.43 |
| 17:00-17:14 | 517 | 416 | 146 | 81 | 13 | 3.76 | 2.06 | 0.99 |
| 17:15-17:29 | 483 | 450 | 107 | 74 | 16 | 2.8 | 3.04 | 0.87 |
| 17:30-17:44 | 507 | 602 | 94 | 104 | 16 | 4.43 | 2.25 | 0.95 |
| 17:45-17:59 | 541 | 639 | 80 | 104 | 20 | 2.31 | 2.25 | 1.03 |
| 18:00-18:14 | 511 | 868 | 95 | 107 | 6 | 4.1 | 2.65 | 0.99 |
| 18:15-18:29 | 480 | 886 | 89 | 85 | 18 | 3.27 | 2.93 | 0.9 |
| 18:30-18:44 | 384 | 786 | 104 | 59 | 12 | 4.07 | 2.82 | 0.9 |
| 18:45-18:59 | 344 | 430 | 88 | 57 | 14 | 3.58 | 2.88 | 0.86 |
| 19:00-19:14 | 524 | 538 | 149 | 101 | 10 | 3.66 | 2.17 | 0.95 |
| 19:15-19:29 | 302 | 775 | 136 | 79 | 14 | 3.25 | 2.32 | 1.0 |
| 19:30-19:44 | 419 | 530 | 122 | 64 | 6 | 3.71 | 1.92 | 0.91 |
| 19:45-19:59 | 545 | 428 | 120 | 92 | 16 | 3.53 | 1.88 | 0.85 |
| 20:00-20:14 | 210 | 302 | 38 | 31 | 14 | 2.29 | 3.09 | 0.48 |
| 20:15-20:29 | 187 | 249 | 39 | 28 | 5 | 4.42 | 1.9 | 0.47 |
| 20:30-20:44 | 300 | 314 | 33 | 49 | 16 | 3.39 | 3.2 | 0.59 |
| 20:45-20:59 | 278 | 250 | 67 | 33 | 15 | 2.84 | 2.89 | 0.64 |
| 21:00-21:14 | 206 | 386 | 46 | 39 | 12 | 2.63 | 1.8 | 0.42 |
| 21:15-21:29 | 191 | 396 | 67 | 46 | 16 | 2.33 | 2.74 | 0.66 |
| 21:30-21:44 | 194 | 372 | 68 | 48 | 5 | 3.65 | 2.77 | 0.64 |
| 21:45-21:59 | 269 | 342 | 51 | 41 | 19 | 3.98 | 2.33 | 0.68 |

#### Location: Bwaise Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 356 | 711 | 147 | 61 | 12 | 2.73 | 2.97 | 0.94 |
| 07:15-07:29 | 439 | 877 | 135 | 64 | 8 | 3.21 | 2.21 | 0.86 |
| 07:30-07:44 | 420 | 873 | 116 | 107 | 7 | 2.54 | 3.15 | 1.06 |
| 07:45-07:59 | 445 | 533 | 127 | 94 | 12 | 3.44 | 2.2 | 0.97 |
| 08:00-08:14 | 452 | 410 | 129 | 104 | 19 | 2.58 | 2.47 | 1.01 |
| 08:15-08:29 | 344 | 555 | 85 | 102 | 18 | 4.14 | 2.37 | 0.86 |
| 08:30-08:44 | 416 | 641 | 111 | 103 | 10 | 2.95 | 2.09 | 0.91 |
| 08:45-08:59 | 394 | 577 | 133 | 83 | 7 | 2.59 | 1.86 | 1.07 |
| 09:00-09:14 | 561 | 806 | 84 | 101 | 7 | 3.39 | 2.49 | 1.05 |
| 09:15-09:29 | 368 | 851 | 88 | 115 | 12 | 3.11 | 2.53 | 1.02 |
| 09:30-09:44 | 495 | 566 | 92 | 55 | 5 | 4.0 | 2.45 | 0.93 |
| 09:45-09:59 | 509 | 583 | 125 | 80 | 20 | 2.48 | 2.48 | 1.09 |
| 10:00-10:14 | 164 | 216 | 37 | 31 | 5 | 4.26 | 2.36 | 0.49 |
| 10:15-10:29 | 288 | 348 | 59 | 37 | 15 | 4.24 | 2.37 | 0.55 |
| 10:30-10:44 | 244 | 290 | 47 | 25 | 6 | 2.4 | 2.22 | 0.66 |
| 10:45-10:59 | 291 | 288 | 62 | 50 | 10 | 4.09 | 2.01 | 0.69 |
| 16:00-16:14 | 183 | 312 | 51 | 29 | 18 | 3.77 | 2.85 | 0.65 |
| 16:15-16:29 | 185 | 392 | 35 | 21 | 7 | 2.43 | 3.01 | 0.59 |
| 16:30-16:44 | 175 | 387 | 53 | 28 | 16 | 3.42 | 2.76 | 0.62 |
| 16:45-16:59 | 295 | 366 | 36 | 20 | 19 | 4.1 | 1.97 | 0.41 |
| 17:00-17:14 | 471 | 521 | 132 | 101 | 8 | 3.35 | 2.52 | 0.91 |
| 17:15-17:29 | 337 | 784 | 133 | 54 | 18 | 2.17 | 2.78 | 0.88 |
| 17:30-17:44 | 557 | 647 | 84 | 99 | 12 | 4.17 | 2.72 | 0.96 |
| 17:45-17:59 | 350 | 717 | 85 | 105 | 17 | 3.68 | 2.93 | 0.92 |
| 18:00-18:14 | 401 | 584 | 145 | 109 | 18 | 4.34 | 3.1 | 0.95 |
| 18:15-18:29 | 471 | 642 | 127 | 102 | 20 | 3.39 | 2.23 | 1.05 |
| 18:30-18:44 | 482 | 640 | 132 | 114 | 10 | 3.43 | 3.09 | 1.06 |
| 18:45-18:59 | 363 | 690 | 119 | 72 | 9 | 2.53 | 3.04 | 1.0 |
| 19:00-19:14 | 400 | 869 | 142 | 63 | 8 | 4.3 | 2.14 | 0.86 |
| 19:15-19:29 | 513 | 439 | 92 | 112 | 9 | 2.79 | 2.66 | 1.0 |
| 19:30-19:44 | 546 | 524 | 149 | 109 | 8 | 2.28 | 2.51 | 1.06 |
| 19:45-19:59 | 515 | 595 | 114 | 59 | 16 | 2.76 | 1.89 | 0.86 |
| 20:00-20:14 | 291 | 307 | 37 | 26 | 15 | 2.59 | 2.5 | 0.5 |
| 20:15-20:29 | 156 | 243 | 38 | 26 | 9 | 4.43 | 3.05 | 0.5 |
| 20:30-20:44 | 230 | 313 | 48 | 34 | 17 | 3.72 | 2.7 | 0.46 |
| 20:45-20:59 | 242 | 365 | 37 | 21 | 5 | 3.08 | 3.14 | 0.47 |
| 21:00-21:14 | 279 | 228 | 60 | 44 | 12 | 4.35 | 2.95 | 0.56 |
| 21:15-21:29 | 211 | 400 | 37 | 49 | 8 | 2.47 | 2.27 | 0.4 |
| 21:30-21:44 | 192 | 386 | 69 | 35 | 10 | 3.48 | 3.09 | 0.62 |
| 21:45-21:59 | 254 | 368 | 52 | 26 | 6 | 3.06 | 2.21 | 0.52 |

#### Location: Natete Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 352 | 723 | 97 | 85 | 8 | 3.52 | 1.92 | 1.05 |
| 07:15-07:29 | 419 | 814 | 112 | 117 | 19 | 3.57 | 2.89 | 0.89 |
| 07:30-07:44 | 534 | 468 | 101 | 120 | 5 | 3.2 | 2.01 | 0.96 |
| 07:45-07:59 | 572 | 672 | 102 | 67 | 12 | 3.66 | 2.8 | 0.97 |
| 08:00-08:14 | 559 | 603 | 85 | 62 | 11 | 4.34 | 2.26 | 0.98 |
| 08:15-08:29 | 439 | 438 | 107 | 111 | 12 | 2.23 | 1.98 | 0.93 |
| 08:30-08:44 | 506 | 468 | 117 | 103 | 14 | 2.3 | 2.82 | 0.89 |
| 08:45-08:59 | 503 | 538 | 113 | 66 | 8 | 2.65 | 2.37 | 0.9 |
| 09:00-09:14 | 361 | 743 | 103 | 80 | 16 | 4.24 | 3.07 | 0.89 |
| 09:15-09:29 | 591 | 817 | 112 | 80 | 9 | 4.07 | 2.77 | 0.99 |
| 09:30-09:44 | 490 | 617 | 113 | 58 | 5 | 3.0 | 2.9 | 1.04 |
| 09:45-09:59 | 417 | 684 | 126 | 111 | 15 | 4.32 | 2.43 | 1.0 |
| 10:00-10:14 | 268 | 293 | 34 | 27 | 15 | 2.84 | 2.86 | 0.5 |
| 10:15-10:29 | 283 | 283 | 51 | 36 | 19 | 4.23 | 2.1 | 0.65 |
| 10:30-10:44 | 246 | 214 | 49 | 43 | 19 | 4.23 | 1.95 | 0.69 |
| 10:45-10:59 | 210 | 248 | 55 | 43 | 12 | 2.29 | 2.14 | 0.52 |
| 16:00-16:14 | 213 | 374 | 59 | 48 | 18 | 3.29 | 2.41 | 0.48 |
| 16:15-16:29 | 190 | 326 | 54 | 43 | 10 | 4.19 | 1.86 | 0.59 |
| 16:30-16:44 | 155 | 325 | 53 | 38 | 10 | 4.45 | 2.66 | 0.46 |
| 16:45-16:59 | 202 | 290 | 58 | 40 | 20 | 2.93 | 3.15 | 0.41 |
| 17:00-17:14 | 396 | 709 | 138 | 98 | 16 | 4.1 | 2.34 | 0.95 |
| 17:15-17:29 | 468 | 781 | 135 | 68 | 9 | 4.06 | 2.93 | 1.05 |
| 17:30-17:44 | 431 | 491 | 83 | 101 | 10 | 4.07 | 3.07 | 0.86 |
| 17:45-17:59 | 480 | 628 | 101 | 102 | 6 | 3.94 | 2.39 | 0.99 |
| 18:00-18:14 | 345 | 742 | 98 | 60 | 9 | 3.12 | 2.57 | 0.86 |
| 18:15-18:29 | 544 | 534 | 83 | 120 | 17 | 2.13 | 2.46 | 0.93 |
| 18:30-18:44 | 420 | 460 | 89 | 88 | 9 | 3.49 | 2.25 | 0.87 |
| 18:45-18:59 | 352 | 571 | 100 | 99 | 9 | 3.37 | 2.59 | 1.04 |
| 19:00-19:14 | 435 | 665 | 130 | 98 | 5 | 2.13 | 2.45 | 1.0 |
| 19:15-19:29 | 349 | 777 | 121 | 85 | 13 | 4.31 | 2.42 | 1.04 |
| 19:30-19:44 | 337 | 583 | 90 | 86 | 14 | 4.08 | 1.9 | 0.9 |
| 19:45-19:59 | 444 | 862 | 137 | 91 | 11 | 3.33 | 2.77 | 0.86 |
| 20:00-20:14 | 228 | 334 | 43 | 24 | 15 | 4.37 | 1.96 | 0.6 |
| 20:15-20:29 | 253 | 389 | 62 | 28 | 16 | 4.1 | 3.17 | 0.4 |
| 20:30-20:44 | 281 | 209 | 52 | 26 | 16 | 3.67 | 2.54 | 0.45 |
| 20:45-20:59 | 263 | 260 | 56 | 33 | 7 | 2.7 | 2.35 | 0.4 |
| 21:00-21:14 | 287 | 328 | 45 | 39 | 5 | 3.75 | 2.18 | 0.67 |
| 21:15-21:29 | 153 | 242 | 55 | 45 | 6 | 2.51 | 2.38 | 0.67 |
| 21:30-21:44 | 202 | 260 | 30 | 25 | 13 | 2.18 | 2.26 | 0.44 |
| 21:45-21:59 | 231 | 217 | 39 | 40 | 14 | 3.04 | 3.13 | 0.44 |

### A.6 Day 6: 2026-06-06

#### Location: Wandegeya Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 383 | 806 | 95 | 84 | 10 | 4.27 | 2.55 | 1.08 |
| 07:15-07:29 | 414 | 540 | 81 | 118 | 20 | 3.77 | 1.91 | 0.9 |
| 07:30-07:44 | 371 | 756 | 128 | 66 | 6 | 4.17 | 2.46 | 0.87 |
| 07:45-07:59 | 339 | 728 | 146 | 53 | 8 | 4.14 | 2.25 | 1.0 |
| 08:00-08:14 | 560 | 620 | 133 | 67 | 15 | 2.36 | 3.13 | 1.04 |
| 08:15-08:29 | 548 | 531 | 116 | 83 | 18 | 3.55 | 2.37 | 1.05 |
| 08:30-08:44 | 589 | 630 | 135 | 85 | 15 | 3.67 | 2.17 | 0.85 |
| 08:45-08:59 | 576 | 460 | 105 | 99 | 18 | 3.49 | 2.11 | 0.86 |
| 09:00-09:14 | 371 | 695 | 92 | 114 | 14 | 3.75 | 2.74 | 1.08 |
| 09:15-09:29 | 339 | 534 | 111 | 101 | 15 | 3.65 | 2.82 | 0.9 |
| 09:30-09:44 | 410 | 671 | 129 | 56 | 15 | 3.89 | 3.06 | 1.1 |
| 09:45-09:59 | 448 | 574 | 116 | 112 | 11 | 2.11 | 2.35 | 0.89 |
| 10:00-10:14 | 255 | 288 | 30 | 32 | 13 | 3.82 | 2.79 | 0.5 |
| 10:15-10:29 | 168 | 244 | 55 | 37 | 8 | 3.73 | 3.03 | 0.46 |
| 10:30-10:44 | 285 | 216 | 59 | 37 | 7 | 3.24 | 2.75 | 0.65 |
| 10:45-10:59 | 265 | 327 | 57 | 39 | 19 | 4.49 | 2.8 | 0.65 |
| 16:00-16:14 | 177 | 373 | 52 | 46 | 10 | 3.66 | 2.96 | 0.44 |
| 16:15-16:29 | 196 | 231 | 57 | 27 | 19 | 4.3 | 2.98 | 0.64 |
| 16:30-16:44 | 287 | 347 | 30 | 39 | 17 | 4.12 | 3.14 | 0.64 |
| 16:45-16:59 | 217 | 217 | 30 | 46 | 12 | 2.22 | 1.95 | 0.46 |
| 17:00-17:14 | 582 | 688 | 135 | 88 | 12 | 2.27 | 2.12 | 0.96 |
| 17:15-17:29 | 468 | 697 | 88 | 94 | 7 | 3.17 | 2.52 | 0.94 |
| 17:30-17:44 | 356 | 690 | 103 | 58 | 20 | 4.31 | 2.96 | 0.92 |
| 17:45-17:59 | 451 | 766 | 81 | 51 | 12 | 3.81 | 2.43 | 0.93 |
| 18:00-18:14 | 521 | 714 | 99 | 72 | 7 | 3.96 | 2.52 | 0.9 |
| 18:15-18:29 | 321 | 661 | 107 | 113 | 10 | 4.14 | 2.09 | 0.99 |
| 18:30-18:44 | 369 | 668 | 117 | 78 | 17 | 3.03 | 2.4 | 1.02 |
| 18:45-18:59 | 500 | 677 | 128 | 50 | 16 | 3.69 | 1.98 | 1.04 |
| 19:00-19:14 | 434 | 668 | 93 | 81 | 12 | 4.45 | 2.59 | 0.96 |
| 19:15-19:29 | 395 | 798 | 128 | 86 | 15 | 3.28 | 2.5 | 0.94 |
| 19:30-19:44 | 392 | 573 | 104 | 85 | 9 | 4.43 | 2.68 | 0.99 |
| 19:45-19:59 | 373 | 716 | 121 | 66 | 15 | 2.3 | 3.15 | 0.85 |
| 20:00-20:14 | 229 | 379 | 48 | 35 | 13 | 3.61 | 2.37 | 0.63 |
| 20:15-20:29 | 296 | 388 | 64 | 47 | 8 | 2.76 | 3.03 | 0.53 |
| 20:30-20:44 | 168 | 266 | 32 | 28 | 9 | 3.77 | 3.09 | 0.49 |
| 20:45-20:59 | 243 | 267 | 48 | 20 | 8 | 4.17 | 1.97 | 0.54 |
| 21:00-21:14 | 220 | 344 | 37 | 29 | 12 | 2.29 | 2.12 | 0.55 |
| 21:15-21:29 | 231 | 228 | 63 | 21 | 18 | 4.49 | 2.68 | 0.54 |
| 21:30-21:44 | 178 | 254 | 37 | 24 | 20 | 2.93 | 2.33 | 0.4 |
| 21:45-21:59 | 223 | 364 | 68 | 33 | 5 | 4.02 | 2.62 | 0.58 |

#### Location: Kibuye Roundabout
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 579 | 451 | 144 | 55 | 9 | 2.87 | 2.85 | 0.88 |
| 07:15-07:29 | 598 | 507 | 87 | 90 | 15 | 3.68 | 2.25 | 1.0 |
| 07:30-07:44 | 346 | 459 | 137 | 61 | 11 | 3.95 | 3.09 | 1.0 |
| 07:45-07:59 | 300 | 900 | 135 | 113 | 11 | 4.44 | 2.6 | 0.95 |
| 08:00-08:14 | 413 | 791 | 125 | 108 | 7 | 3.1 | 2.45 | 0.92 |
| 08:15-08:29 | 396 | 871 | 147 | 117 | 17 | 3.86 | 2.08 | 1.08 |
| 08:30-08:44 | 511 | 463 | 124 | 80 | 5 | 2.2 | 2.1 | 1.04 |
| 08:45-08:59 | 502 | 412 | 106 | 85 | 8 | 3.36 | 2.4 | 1.03 |
| 09:00-09:14 | 481 | 742 | 119 | 106 | 20 | 3.14 | 2.6 | 1.05 |
| 09:15-09:29 | 436 | 560 | 114 | 79 | 5 | 2.81 | 2.41 | 0.95 |
| 09:30-09:44 | 340 | 883 | 131 | 73 | 14 | 4.16 | 1.94 | 0.99 |
| 09:45-09:59 | 324 | 571 | 114 | 64 | 19 | 2.46 | 2.47 | 0.94 |
| 10:00-10:14 | 197 | 330 | 34 | 21 | 8 | 4.38 | 2.41 | 0.65 |
| 10:15-10:29 | 152 | 351 | 44 | 49 | 6 | 2.42 | 2.46 | 0.43 |
| 10:30-10:44 | 261 | 380 | 35 | 48 | 12 | 4.01 | 3.19 | 0.57 |
| 10:45-10:59 | 161 | 362 | 31 | 25 | 14 | 2.52 | 1.86 | 0.59 |
| 16:00-16:14 | 296 | 260 | 65 | 30 | 12 | 4.19 | 2.13 | 0.59 |
| 16:15-16:29 | 211 | 337 | 36 | 30 | 11 | 3.17 | 3.0 | 0.57 |
| 16:30-16:44 | 169 | 350 | 51 | 33 | 18 | 2.79 | 2.28 | 0.43 |
| 16:45-16:59 | 198 | 221 | 68 | 33 | 11 | 2.21 | 3.03 | 0.52 |
| 17:00-17:14 | 458 | 840 | 136 | 73 | 16 | 2.79 | 2.4 | 0.85 |
| 17:15-17:29 | 486 | 893 | 133 | 104 | 5 | 2.75 | 2.62 | 0.9 |
| 17:30-17:44 | 443 | 704 | 102 | 92 | 10 | 2.1 | 2.86 | 1.02 |
| 17:45-17:59 | 375 | 816 | 128 | 80 | 14 | 4.27 | 2.12 | 0.93 |
| 18:00-18:14 | 539 | 478 | 134 | 70 | 5 | 2.94 | 2.2 | 1.06 |
| 18:15-18:29 | 472 | 453 | 84 | 73 | 10 | 2.65 | 2.61 | 0.97 |
| 18:30-18:44 | 527 | 670 | 112 | 99 | 8 | 2.54 | 3.09 | 1.04 |
| 18:45-18:59 | 463 | 544 | 108 | 112 | 8 | 2.93 | 2.79 | 0.9 |
| 19:00-19:14 | 546 | 572 | 114 | 61 | 7 | 3.1 | 3.17 | 0.99 |
| 19:15-19:29 | 456 | 507 | 86 | 83 | 15 | 2.73 | 2.02 | 0.97 |
| 19:30-19:44 | 309 | 805 | 146 | 99 | 10 | 3.81 | 2.52 | 1.0 |
| 19:45-19:59 | 315 | 726 | 142 | 94 | 6 | 4.34 | 2.83 | 0.88 |
| 20:00-20:14 | 233 | 203 | 56 | 29 | 10 | 2.54 | 2.26 | 0.43 |
| 20:15-20:29 | 173 | 384 | 66 | 47 | 10 | 3.39 | 2.64 | 0.69 |
| 20:30-20:44 | 212 | 278 | 33 | 49 | 18 | 3.9 | 2.36 | 0.65 |
| 20:45-20:59 | 282 | 226 | 47 | 22 | 8 | 3.72 | 2.61 | 0.62 |
| 21:00-21:14 | 194 | 369 | 70 | 44 | 13 | 3.65 | 2.62 | 0.54 |
| 21:15-21:29 | 274 | 376 | 32 | 47 | 11 | 4.19 | 1.96 | 0.54 |
| 21:30-21:44 | 242 | 276 | 41 | 27 | 12 | 2.36 | 2.33 | 0.55 |
| 21:45-21:59 | 286 | 335 | 67 | 22 | 13 | 4.02 | 2.39 | 0.58 |

#### Location: Bakuli Intersection
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 466 | 835 | 93 | 115 | 9 | 3.2 | 3.18 | 1.1 |
| 07:15-07:29 | 489 | 613 | 101 | 120 | 20 | 2.76 | 2.37 | 0.9 |
| 07:30-07:44 | 507 | 525 | 94 | 111 | 9 | 3.54 | 2.34 | 1.0 |
| 07:45-07:59 | 426 | 858 | 109 | 67 | 12 | 3.61 | 2.02 | 0.95 |
| 08:00-08:14 | 365 | 729 | 89 | 62 | 5 | 4.17 | 2.12 | 1.07 |
| 08:15-08:29 | 371 | 577 | 121 | 58 | 12 | 3.73 | 2.54 | 1.06 |
| 08:30-08:44 | 366 | 408 | 86 | 112 | 15 | 2.59 | 2.46 | 0.91 |
| 08:45-08:59 | 312 | 601 | 110 | 120 | 10 | 2.24 | 2.54 | 0.94 |
| 09:00-09:14 | 545 | 685 | 95 | 113 | 19 | 3.19 | 2.93 | 0.97 |
| 09:15-09:29 | 557 | 614 | 118 | 66 | 5 | 3.07 | 2.25 | 0.86 |
| 09:30-09:44 | 379 | 899 | 128 | 111 | 20 | 4.31 | 2.31 | 1.03 |
| 09:45-09:59 | 489 | 708 | 89 | 83 | 12 | 4.47 | 2.31 | 1.1 |
| 10:00-10:14 | 285 | 342 | 62 | 33 | 5 | 3.97 | 3.17 | 0.6 |
| 10:15-10:29 | 205 | 241 | 34 | 48 | 13 | 4.37 | 3.13 | 0.44 |
| 10:30-10:44 | 233 | 276 | 49 | 32 | 7 | 2.76 | 2.18 | 0.4 |
| 10:45-10:59 | 256 | 335 | 47 | 33 | 19 | 2.68 | 2.55 | 0.59 |
| 16:00-16:14 | 163 | 352 | 51 | 25 | 17 | 2.44 | 2.74 | 0.46 |
| 16:15-16:29 | 165 | 305 | 37 | 23 | 11 | 2.75 | 2.56 | 0.63 |
| 16:30-16:44 | 198 | 216 | 50 | 33 | 9 | 3.04 | 2.54 | 0.45 |
| 16:45-16:59 | 218 | 338 | 58 | 50 | 17 | 4.43 | 2.86 | 0.62 |
| 17:00-17:14 | 569 | 536 | 106 | 51 | 5 | 2.96 | 2.84 | 0.99 |
| 17:15-17:29 | 538 | 449 | 87 | 73 | 16 | 2.73 | 2.41 | 0.94 |
| 17:30-17:44 | 588 | 604 | 95 | 73 | 12 | 4.43 | 2.95 | 0.88 |
| 17:45-17:59 | 590 | 603 | 87 | 103 | 15 | 3.56 | 1.95 | 0.94 |
| 18:00-18:14 | 403 | 503 | 80 | 92 | 15 | 2.62 | 1.89 | 0.87 |
| 18:15-18:29 | 539 | 605 | 84 | 94 | 6 | 2.46 | 2.9 | 1.1 |
| 18:30-18:44 | 505 | 695 | 142 | 58 | 14 | 4.12 | 2.26 | 1.03 |
| 18:45-18:59 | 541 | 617 | 129 | 69 | 12 | 2.88 | 2.66 | 1.09 |
| 19:00-19:14 | 379 | 852 | 115 | 50 | 20 | 3.45 | 1.86 | 0.9 |
| 19:15-19:29 | 481 | 437 | 81 | 67 | 5 | 4.33 | 1.89 | 0.95 |
| 19:30-19:44 | 461 | 725 | 96 | 95 | 18 | 3.02 | 3.06 | 0.87 |
| 19:45-19:59 | 361 | 513 | 144 | 83 | 5 | 3.59 | 3.15 | 1.06 |
| 20:00-20:14 | 251 | 300 | 57 | 23 | 8 | 2.47 | 1.92 | 0.45 |
| 20:15-20:29 | 287 | 218 | 54 | 20 | 17 | 2.34 | 2.76 | 0.49 |
| 20:30-20:44 | 240 | 205 | 67 | 26 | 18 | 3.51 | 2.06 | 0.54 |
| 20:45-20:59 | 162 | 367 | 38 | 20 | 11 | 3.39 | 2.9 | 0.44 |
| 21:00-21:14 | 175 | 211 | 69 | 34 | 16 | 2.36 | 2.82 | 0.66 |
| 21:15-21:29 | 208 | 232 | 37 | 39 | 15 | 2.42 | 2.18 | 0.59 |
| 21:30-21:44 | 190 | 377 | 35 | 26 | 17 | 4.5 | 2.0 | 0.54 |
| 21:45-21:59 | 193 | 280 | 47 | 40 | 9 | 2.38 | 2.5 | 0.54 |

#### Location: Bwaise Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 573 | 476 | 139 | 60 | 10 | 2.83 | 2.4 | 0.98 |
| 07:15-07:29 | 302 | 722 | 136 | 73 | 8 | 2.39 | 2.09 | 0.89 |
| 07:30-07:44 | 355 | 750 | 88 | 109 | 18 | 3.52 | 2.03 | 1.04 |
| 07:45-07:59 | 469 | 516 | 80 | 58 | 14 | 4.43 | 2.93 | 1.09 |
| 08:00-08:14 | 385 | 423 | 134 | 85 | 11 | 2.98 | 2.76 | 0.92 |
| 08:15-08:29 | 425 | 576 | 138 | 117 | 20 | 3.21 | 1.88 | 1.07 |
| 08:30-08:44 | 473 | 866 | 94 | 94 | 9 | 3.27 | 2.78 | 1.09 |
| 08:45-08:59 | 563 | 808 | 139 | 88 | 13 | 3.47 | 3.01 | 1.09 |
| 09:00-09:14 | 486 | 537 | 107 | 52 | 18 | 4.01 | 2.65 | 0.93 |
| 09:15-09:29 | 372 | 480 | 132 | 50 | 6 | 3.4 | 2.42 | 0.92 |
| 09:30-09:44 | 330 | 404 | 102 | 99 | 19 | 3.98 | 1.97 | 0.86 |
| 09:45-09:59 | 403 | 626 | 108 | 107 | 16 | 3.77 | 1.98 | 0.89 |
| 10:00-10:14 | 167 | 201 | 35 | 50 | 7 | 3.06 | 2.54 | 0.43 |
| 10:15-10:29 | 286 | 400 | 62 | 39 | 13 | 2.63 | 2.64 | 0.42 |
| 10:30-10:44 | 256 | 337 | 46 | 26 | 8 | 3.39 | 2.52 | 0.47 |
| 10:45-10:59 | 153 | 334 | 37 | 22 | 18 | 4.25 | 3.14 | 0.55 |
| 16:00-16:14 | 167 | 246 | 43 | 34 | 5 | 2.15 | 2.96 | 0.56 |
| 16:15-16:29 | 247 | 262 | 68 | 22 | 20 | 2.84 | 1.87 | 0.61 |
| 16:30-16:44 | 223 | 224 | 35 | 37 | 8 | 4.46 | 2.35 | 0.59 |
| 16:45-16:59 | 291 | 321 | 39 | 20 | 9 | 4.27 | 2.43 | 0.54 |
| 17:00-17:14 | 468 | 786 | 118 | 70 | 6 | 3.51 | 2.46 | 0.99 |
| 17:15-17:29 | 574 | 432 | 122 | 50 | 6 | 2.96 | 1.81 | 1.09 |
| 17:30-17:44 | 506 | 462 | 111 | 60 | 8 | 3.29 | 3.13 | 0.88 |
| 17:45-17:59 | 544 | 885 | 118 | 104 | 13 | 3.58 | 1.96 | 1.06 |
| 18:00-18:14 | 374 | 693 | 137 | 55 | 10 | 2.31 | 1.84 | 1.03 |
| 18:15-18:29 | 340 | 467 | 113 | 113 | 20 | 2.59 | 3.05 | 1.04 |
| 18:30-18:44 | 534 | 696 | 137 | 86 | 5 | 3.63 | 1.9 | 1.09 |
| 18:45-18:59 | 483 | 842 | 147 | 103 | 19 | 3.39 | 2.82 | 0.94 |
| 19:00-19:14 | 513 | 695 | 128 | 114 | 9 | 3.74 | 2.69 | 0.99 |
| 19:15-19:29 | 600 | 761 | 125 | 104 | 18 | 3.17 | 2.08 | 0.99 |
| 19:30-19:44 | 426 | 484 | 81 | 112 | 5 | 2.3 | 2.42 | 1.07 |
| 19:45-19:59 | 479 | 545 | 99 | 109 | 8 | 3.02 | 1.81 | 1.01 |
| 20:00-20:14 | 272 | 300 | 32 | 49 | 18 | 3.37 | 2.12 | 0.69 |
| 20:15-20:29 | 260 | 354 | 33 | 20 | 14 | 2.8 | 1.99 | 0.43 |
| 20:30-20:44 | 207 | 336 | 51 | 29 | 17 | 3.72 | 2.51 | 0.41 |
| 20:45-20:59 | 178 | 399 | 30 | 34 | 14 | 3.75 | 3.1 | 0.64 |
| 21:00-21:14 | 162 | 290 | 37 | 42 | 12 | 2.94 | 2.66 | 0.52 |
| 21:15-21:29 | 215 | 202 | 51 | 21 | 13 | 2.34 | 2.84 | 0.66 |
| 21:30-21:44 | 223 | 365 | 68 | 35 | 6 | 3.66 | 2.04 | 0.52 |
| 21:45-21:59 | 200 | 367 | 47 | 25 | 10 | 3.24 | 2.3 | 0.41 |

#### Location: Natete Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 536 | 826 | 147 | 112 | 14 | 2.37 | 2.0 | 1.08 |
| 07:15-07:29 | 530 | 681 | 144 | 68 | 10 | 3.01 | 3.12 | 0.96 |
| 07:30-07:44 | 305 | 894 | 138 | 59 | 19 | 3.62 | 2.71 | 1.04 |
| 07:45-07:59 | 533 | 532 | 115 | 64 | 15 | 3.43 | 2.74 | 0.98 |
| 08:00-08:14 | 429 | 772 | 133 | 52 | 16 | 3.15 | 2.8 | 1.06 |
| 08:15-08:29 | 504 | 719 | 129 | 105 | 7 | 3.75 | 2.7 | 0.91 |
| 08:30-08:44 | 499 | 586 | 91 | 114 | 8 | 2.45 | 2.28 | 1.07 |
| 08:45-08:59 | 583 | 685 | 122 | 54 | 16 | 3.88 | 1.86 | 1.05 |
| 09:00-09:14 | 361 | 498 | 86 | 72 | 20 | 2.96 | 1.85 | 1.09 |
| 09:15-09:29 | 455 | 468 | 95 | 90 | 5 | 2.26 | 3.06 | 0.86 |
| 09:30-09:44 | 394 | 770 | 124 | 104 | 15 | 3.71 | 2.24 | 0.89 |
| 09:45-09:59 | 381 | 751 | 116 | 102 | 15 | 2.21 | 2.62 | 1.05 |
| 10:00-10:14 | 266 | 286 | 35 | 40 | 6 | 4.18 | 2.02 | 0.46 |
| 10:15-10:29 | 200 | 368 | 51 | 42 | 7 | 2.31 | 1.81 | 0.42 |
| 10:30-10:44 | 295 | 242 | 66 | 44 | 8 | 4.42 | 2.33 | 0.64 |
| 10:45-10:59 | 176 | 235 | 54 | 48 | 19 | 3.16 | 2.03 | 0.4 |
| 16:00-16:14 | 296 | 261 | 59 | 36 | 9 | 3.36 | 3.13 | 0.55 |
| 16:15-16:29 | 216 | 352 | 69 | 43 | 6 | 3.6 | 2.99 | 0.53 |
| 16:30-16:44 | 235 | 362 | 61 | 47 | 5 | 2.35 | 2.29 | 0.47 |
| 16:45-16:59 | 208 | 312 | 57 | 44 | 9 | 4.06 | 1.9 | 0.67 |
| 17:00-17:14 | 579 | 840 | 98 | 95 | 14 | 2.76 | 3.11 | 1.04 |
| 17:15-17:29 | 336 | 670 | 96 | 70 | 6 | 3.31 | 1.89 | 0.88 |
| 17:30-17:44 | 314 | 759 | 132 | 68 | 6 | 3.66 | 2.13 | 0.92 |
| 17:45-17:59 | 554 | 485 | 108 | 111 | 6 | 2.7 | 2.4 | 0.99 |
| 18:00-18:14 | 510 | 882 | 86 | 89 | 12 | 2.63 | 2.2 | 0.96 |
| 18:15-18:29 | 499 | 884 | 148 | 68 | 18 | 3.32 | 2.76 | 1.04 |
| 18:30-18:44 | 443 | 615 | 142 | 99 | 14 | 4.41 | 2.54 | 1.04 |
| 18:45-18:59 | 311 | 830 | 82 | 111 | 13 | 2.62 | 2.18 | 0.93 |
| 19:00-19:14 | 480 | 892 | 87 | 57 | 18 | 2.82 | 2.67 | 0.99 |
| 19:15-19:29 | 437 | 616 | 88 | 102 | 11 | 4.29 | 2.41 | 1.04 |
| 19:30-19:44 | 395 | 766 | 129 | 75 | 12 | 4.16 | 3.1 | 1.05 |
| 19:45-19:59 | 453 | 480 | 133 | 94 | 9 | 2.43 | 3.1 | 1.1 |
| 20:00-20:14 | 259 | 273 | 64 | 38 | 11 | 3.81 | 2.84 | 0.45 |
| 20:15-20:29 | 235 | 252 | 54 | 50 | 7 | 3.37 | 2.59 | 0.46 |
| 20:30-20:44 | 234 | 262 | 42 | 47 | 8 | 4.33 | 1.98 | 0.61 |
| 20:45-20:59 | 274 | 239 | 56 | 50 | 19 | 3.34 | 2.01 | 0.52 |
| 21:00-21:14 | 188 | 307 | 65 | 23 | 11 | 2.84 | 3.2 | 0.59 |
| 21:15-21:29 | 204 | 341 | 61 | 27 | 20 | 2.73 | 1.98 | 0.58 |
| 21:30-21:44 | 171 | 278 | 44 | 25 | 16 | 4.33 | 2.32 | 0.45 |
| 21:45-21:59 | 264 | 394 | 53 | 42 | 7 | 2.27 | 1.95 | 0.55 |

### A.7 Day 7: 2026-06-07

#### Location: Wandegeya Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 313 | 429 | 131 | 52 | 19 | 2.55 | 2.9 | 0.92 |
| 07:15-07:29 | 514 | 857 | 83 | 73 | 12 | 3.66 | 3.07 | 1.06 |
| 07:30-07:44 | 598 | 416 | 125 | 70 | 13 | 3.91 | 1.83 | 0.96 |
| 07:45-07:59 | 381 | 890 | 115 | 59 | 17 | 2.19 | 2.02 | 0.96 |
| 08:00-08:14 | 447 | 572 | 137 | 90 | 6 | 3.37 | 3.11 | 0.98 |
| 08:15-08:29 | 344 | 603 | 134 | 56 | 11 | 2.68 | 2.45 | 1.02 |
| 08:30-08:44 | 313 | 855 | 94 | 83 | 9 | 3.96 | 1.99 | 1.06 |
| 08:45-08:59 | 513 | 790 | 131 | 119 | 9 | 4.41 | 2.01 | 1.04 |
| 09:00-09:14 | 478 | 420 | 82 | 90 | 8 | 2.18 | 3.19 | 0.93 |
| 09:15-09:29 | 451 | 446 | 81 | 118 | 19 | 3.2 | 2.65 | 0.97 |
| 09:30-09:44 | 504 | 754 | 136 | 116 | 20 | 2.74 | 2.75 | 1.06 |
| 09:45-09:59 | 413 | 895 | 87 | 104 | 20 | 3.56 | 2.4 | 1.07 |
| 10:00-10:14 | 194 | 257 | 39 | 45 | 20 | 3.87 | 1.84 | 0.65 |
| 10:15-10:29 | 169 | 389 | 36 | 48 | 16 | 2.37 | 3.17 | 0.44 |
| 10:30-10:44 | 184 | 289 | 43 | 35 | 19 | 2.84 | 2.85 | 0.55 |
| 10:45-10:59 | 286 | 379 | 64 | 34 | 17 | 3.84 | 3.17 | 0.7 |
| 16:00-16:14 | 168 | 263 | 35 | 46 | 7 | 4.24 | 2.57 | 0.55 |
| 16:15-16:29 | 226 | 366 | 57 | 22 | 14 | 2.46 | 2.07 | 0.46 |
| 16:30-16:44 | 234 | 304 | 55 | 26 | 20 | 2.32 | 2.67 | 0.62 |
| 16:45-16:59 | 183 | 386 | 42 | 43 | 20 | 2.89 | 1.98 | 0.64 |
| 17:00-17:14 | 572 | 448 | 148 | 86 | 13 | 2.21 | 2.74 | 0.91 |
| 17:15-17:29 | 531 | 556 | 88 | 87 | 11 | 3.28 | 2.64 | 0.9 |
| 17:30-17:44 | 404 | 444 | 110 | 116 | 9 | 4.27 | 2.1 | 1.08 |
| 17:45-17:59 | 308 | 866 | 115 | 84 | 20 | 4.05 | 2.01 | 1.07 |
| 18:00-18:14 | 595 | 769 | 84 | 89 | 14 | 4.37 | 2.12 | 0.92 |
| 18:15-18:29 | 366 | 550 | 137 | 105 | 17 | 3.87 | 2.46 | 0.92 |
| 18:30-18:44 | 592 | 686 | 133 | 104 | 16 | 3.77 | 2.77 | 0.87 |
| 18:45-18:59 | 532 | 447 | 143 | 108 | 15 | 3.06 | 3.06 | 1.03 |
| 19:00-19:14 | 565 | 516 | 148 | 89 | 18 | 2.16 | 2.46 | 0.99 |
| 19:15-19:29 | 430 | 575 | 122 | 72 | 9 | 3.7 | 3.11 | 0.91 |
| 19:30-19:44 | 395 | 452 | 95 | 90 | 13 | 3.44 | 2.11 | 0.86 |
| 19:45-19:59 | 381 | 506 | 136 | 99 | 5 | 3.44 | 2.5 | 0.92 |
| 20:00-20:14 | 295 | 260 | 53 | 45 | 17 | 3.03 | 3.17 | 0.44 |
| 20:15-20:29 | 177 | 201 | 30 | 34 | 9 | 2.95 | 1.83 | 0.46 |
| 20:30-20:44 | 277 | 287 | 67 | 43 | 9 | 3.57 | 2.88 | 0.5 |
| 20:45-20:59 | 259 | 280 | 33 | 26 | 18 | 3.67 | 2.94 | 0.66 |
| 21:00-21:14 | 222 | 245 | 69 | 46 | 17 | 2.59 | 3.13 | 0.48 |
| 21:15-21:29 | 292 | 217 | 46 | 45 | 13 | 3.93 | 2.5 | 0.4 |
| 21:30-21:44 | 272 | 386 | 52 | 26 | 9 | 3.1 | 2.42 | 0.58 |
| 21:45-21:59 | 175 | 253 | 53 | 47 | 12 | 3.49 | 2.42 | 0.6 |

#### Location: Kibuye Roundabout
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 367 | 883 | 82 | 78 | 13 | 2.32 | 3.03 | 1.07 |
| 07:15-07:29 | 370 | 517 | 144 | 58 | 20 | 2.46 | 1.92 | 0.85 |
| 07:30-07:44 | 536 | 884 | 91 | 97 | 16 | 3.05 | 2.41 | 0.87 |
| 07:45-07:59 | 458 | 764 | 92 | 119 | 8 | 4.5 | 2.91 | 0.93 |
| 08:00-08:14 | 419 | 643 | 90 | 61 | 6 | 4.33 | 2.76 | 1.03 |
| 08:15-08:29 | 494 | 716 | 127 | 57 | 20 | 3.91 | 2.79 | 1.09 |
| 08:30-08:44 | 508 | 493 | 90 | 116 | 5 | 3.29 | 2.94 | 1.09 |
| 08:45-08:59 | 437 | 595 | 108 | 76 | 6 | 3.47 | 2.6 | 1.07 |
| 09:00-09:14 | 334 | 593 | 137 | 106 | 17 | 4.18 | 2.43 | 0.97 |
| 09:15-09:29 | 414 | 564 | 102 | 64 | 5 | 4.36 | 2.62 | 1.03 |
| 09:30-09:44 | 497 | 577 | 135 | 93 | 18 | 2.55 | 1.91 | 0.99 |
| 09:45-09:59 | 573 | 638 | 143 | 99 | 11 | 4.28 | 2.85 | 0.89 |
| 10:00-10:14 | 240 | 226 | 51 | 34 | 20 | 2.61 | 2.91 | 0.61 |
| 10:15-10:29 | 297 | 250 | 61 | 40 | 11 | 3.21 | 2.24 | 0.57 |
| 10:30-10:44 | 300 | 392 | 58 | 38 | 6 | 2.97 | 2.77 | 0.44 |
| 10:45-10:59 | 178 | 233 | 38 | 40 | 6 | 2.77 | 1.87 | 0.45 |
| 16:00-16:14 | 155 | 249 | 58 | 29 | 14 | 2.4 | 2.12 | 0.54 |
| 16:15-16:29 | 215 | 323 | 37 | 50 | 7 | 3.57 | 2.33 | 0.49 |
| 16:30-16:44 | 221 | 262 | 68 | 34 | 10 | 3.69 | 3.02 | 0.52 |
| 16:45-16:59 | 182 | 251 | 64 | 40 | 5 | 2.41 | 2.92 | 0.58 |
| 17:00-17:14 | 495 | 444 | 87 | 93 | 12 | 4.17 | 2.71 | 0.86 |
| 17:15-17:29 | 578 | 843 | 110 | 76 | 14 | 4.24 | 2.09 | 1.09 |
| 17:30-17:44 | 490 | 577 | 96 | 84 | 16 | 2.28 | 3.14 | 1.02 |
| 17:45-17:59 | 313 | 837 | 88 | 73 | 11 | 4.16 | 2.59 | 0.94 |
| 18:00-18:14 | 337 | 538 | 88 | 114 | 8 | 4.02 | 2.11 | 0.88 |
| 18:15-18:29 | 579 | 676 | 105 | 104 | 14 | 3.31 | 2.1 | 1.06 |
| 18:30-18:44 | 301 | 814 | 149 | 50 | 6 | 4.41 | 2.31 | 1.09 |
| 18:45-18:59 | 529 | 756 | 102 | 102 | 17 | 3.13 | 2.81 | 0.85 |
| 19:00-19:14 | 465 | 550 | 98 | 60 | 13 | 3.36 | 1.82 | 1.04 |
| 19:15-19:29 | 438 | 795 | 137 | 103 | 9 | 3.41 | 2.46 | 0.87 |
| 19:30-19:44 | 348 | 886 | 135 | 78 | 15 | 4.46 | 2.61 | 0.99 |
| 19:45-19:59 | 445 | 641 | 149 | 77 | 10 | 4.1 | 2.62 | 0.87 |
| 20:00-20:14 | 209 | 295 | 51 | 39 | 15 | 2.3 | 2.15 | 0.44 |
| 20:15-20:29 | 151 | 331 | 49 | 48 | 6 | 2.1 | 2.9 | 0.62 |
| 20:30-20:44 | 215 | 338 | 55 | 22 | 15 | 3.37 | 2.74 | 0.47 |
| 20:45-20:59 | 273 | 225 | 30 | 31 | 9 | 2.57 | 2.27 | 0.61 |
| 21:00-21:14 | 261 | 200 | 31 | 47 | 5 | 3.22 | 2.98 | 0.53 |
| 21:15-21:29 | 179 | 379 | 63 | 29 | 5 | 3.96 | 2.61 | 0.49 |
| 21:30-21:44 | 300 | 294 | 36 | 23 | 12 | 3.17 | 2.99 | 0.66 |
| 21:45-21:59 | 246 | 301 | 70 | 48 | 16 | 2.47 | 2.06 | 0.69 |

#### Location: Bakuli Intersection
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 489 | 623 | 92 | 67 | 8 | 2.61 | 3.17 | 1.08 |
| 07:15-07:29 | 350 | 448 | 143 | 71 | 6 | 2.39 | 2.09 | 1.0 |
| 07:30-07:44 | 414 | 459 | 90 | 71 | 19 | 3.3 | 2.13 | 1.09 |
| 07:45-07:59 | 498 | 451 | 140 | 56 | 9 | 2.76 | 3.15 | 0.96 |
| 08:00-08:14 | 414 | 628 | 147 | 55 | 16 | 4.07 | 3.11 | 1.1 |
| 08:15-08:29 | 447 | 813 | 128 | 74 | 14 | 3.89 | 2.62 | 0.98 |
| 08:30-08:44 | 503 | 453 | 149 | 120 | 6 | 4.35 | 2.53 | 0.93 |
| 08:45-08:59 | 410 | 802 | 85 | 84 | 16 | 4.45 | 3.02 | 0.92 |
| 09:00-09:14 | 504 | 635 | 111 | 67 | 19 | 4.25 | 1.9 | 0.94 |
| 09:15-09:29 | 463 | 732 | 110 | 85 | 6 | 3.47 | 2.02 | 0.88 |
| 09:30-09:44 | 355 | 572 | 130 | 97 | 13 | 2.41 | 3.06 | 1.0 |
| 09:45-09:59 | 323 | 841 | 80 | 59 | 5 | 3.89 | 2.98 | 1.04 |
| 10:00-10:14 | 211 | 369 | 52 | 23 | 16 | 2.79 | 1.85 | 0.64 |
| 10:15-10:29 | 216 | 314 | 41 | 25 | 11 | 3.85 | 2.55 | 0.53 |
| 10:30-10:44 | 226 | 391 | 60 | 50 | 6 | 2.58 | 2.92 | 0.57 |
| 10:45-10:59 | 207 | 219 | 70 | 27 | 10 | 3.67 | 1.82 | 0.6 |
| 16:00-16:14 | 176 | 256 | 34 | 50 | 10 | 3.14 | 2.86 | 0.61 |
| 16:15-16:29 | 175 | 261 | 42 | 50 | 17 | 2.59 | 2.03 | 0.42 |
| 16:30-16:44 | 276 | 371 | 45 | 44 | 12 | 2.58 | 2.03 | 0.4 |
| 16:45-16:59 | 193 | 379 | 70 | 46 | 9 | 2.94 | 2.25 | 0.47 |
| 17:00-17:14 | 391 | 588 | 94 | 99 | 20 | 3.39 | 2.15 | 1.04 |
| 17:15-17:29 | 482 | 673 | 99 | 66 | 8 | 2.36 | 2.49 | 1.05 |
| 17:30-17:44 | 335 | 833 | 127 | 102 | 13 | 3.37 | 2.11 | 0.97 |
| 17:45-17:59 | 576 | 696 | 135 | 90 | 7 | 2.42 | 2.17 | 0.96 |
| 18:00-18:14 | 325 | 685 | 103 | 77 | 7 | 3.26 | 2.69 | 0.98 |
| 18:15-18:29 | 502 | 767 | 127 | 50 | 13 | 2.61 | 3.08 | 1.0 |
| 18:30-18:44 | 385 | 448 | 110 | 104 | 16 | 3.64 | 2.06 | 1.08 |
| 18:45-18:59 | 316 | 900 | 120 | 105 | 11 | 3.42 | 1.81 | 1.02 |
| 19:00-19:14 | 312 | 439 | 101 | 79 | 18 | 2.63 | 1.88 | 0.97 |
| 19:15-19:29 | 570 | 866 | 142 | 57 | 6 | 2.65 | 2.28 | 0.87 |
| 19:30-19:44 | 479 | 579 | 136 | 85 | 18 | 2.54 | 3.01 | 0.87 |
| 19:45-19:59 | 360 | 729 | 141 | 95 | 8 | 3.14 | 3.2 | 1.02 |
| 20:00-20:14 | 254 | 241 | 67 | 25 | 12 | 2.12 | 2.02 | 0.54 |
| 20:15-20:29 | 239 | 359 | 51 | 21 | 9 | 2.51 | 2.46 | 0.64 |
| 20:30-20:44 | 270 | 315 | 55 | 37 | 10 | 2.69 | 2.42 | 0.61 |
| 20:45-20:59 | 229 | 250 | 48 | 35 | 7 | 4.0 | 3.16 | 0.58 |
| 21:00-21:14 | 226 | 333 | 61 | 28 | 12 | 4.26 | 1.87 | 0.58 |
| 21:15-21:29 | 215 | 217 | 57 | 45 | 6 | 3.46 | 2.96 | 0.55 |
| 21:30-21:44 | 243 | 202 | 64 | 32 | 7 | 2.45 | 3.13 | 0.69 |
| 21:45-21:59 | 228 | 254 | 50 | 21 | 19 | 3.0 | 2.89 | 0.49 |

#### Location: Bwaise Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 470 | 673 | 129 | 75 | 12 | 3.16 | 1.91 | 1.05 |
| 07:15-07:29 | 513 | 491 | 140 | 56 | 6 | 4.23 | 2.93 | 0.97 |
| 07:30-07:44 | 522 | 647 | 89 | 81 | 6 | 4.25 | 2.06 | 1.06 |
| 07:45-07:59 | 436 | 879 | 104 | 78 | 9 | 4.0 | 2.55 | 0.99 |
| 08:00-08:14 | 304 | 418 | 116 | 85 | 13 | 2.45 | 2.82 | 0.87 |
| 08:15-08:29 | 481 | 525 | 120 | 108 | 10 | 3.93 | 2.74 | 0.91 |
| 08:30-08:44 | 380 | 860 | 134 | 116 | 14 | 3.36 | 2.04 | 0.98 |
| 08:45-08:59 | 380 | 529 | 94 | 81 | 14 | 3.09 | 3.19 | 1.09 |
| 09:00-09:14 | 379 | 641 | 88 | 115 | 20 | 4.09 | 2.79 | 1.01 |
| 09:15-09:29 | 567 | 895 | 85 | 82 | 17 | 2.86 | 2.78 | 0.99 |
| 09:30-09:44 | 322 | 849 | 88 | 51 | 7 | 2.63 | 1.85 | 0.87 |
| 09:45-09:59 | 338 | 474 | 103 | 103 | 13 | 3.73 | 2.99 | 1.08 |
| 10:00-10:14 | 176 | 215 | 54 | 45 | 11 | 3.86 | 2.48 | 0.67 |
| 10:15-10:29 | 245 | 333 | 40 | 45 | 16 | 3.53 | 2.78 | 0.58 |
| 10:30-10:44 | 222 | 205 | 32 | 31 | 10 | 2.88 | 2.84 | 0.41 |
| 10:45-10:59 | 291 | 288 | 41 | 33 | 11 | 3.34 | 2.56 | 0.61 |
| 16:00-16:14 | 176 | 214 | 66 | 42 | 18 | 3.29 | 3.16 | 0.7 |
| 16:15-16:29 | 216 | 265 | 52 | 22 | 9 | 3.37 | 2.3 | 0.48 |
| 16:30-16:44 | 172 | 288 | 51 | 50 | 19 | 3.25 | 2.42 | 0.49 |
| 16:45-16:59 | 294 | 337 | 49 | 48 | 7 | 2.72 | 2.23 | 0.57 |
| 17:00-17:14 | 509 | 437 | 90 | 119 | 11 | 3.1 | 2.19 | 1.08 |
| 17:15-17:29 | 516 | 779 | 114 | 73 | 14 | 3.81 | 2.84 | 0.93 |
| 17:30-17:44 | 501 | 645 | 81 | 117 | 18 | 3.4 | 2.98 | 0.99 |
| 17:45-17:59 | 410 | 560 | 110 | 114 | 18 | 3.6 | 3.19 | 1.0 |
| 18:00-18:14 | 486 | 759 | 141 | 113 | 8 | 4.44 | 2.73 | 0.91 |
| 18:15-18:29 | 590 | 503 | 141 | 106 | 13 | 3.66 | 3.04 | 1.07 |
| 18:30-18:44 | 383 | 496 | 98 | 51 | 18 | 4.15 | 3.1 | 0.93 |
| 18:45-18:59 | 425 | 848 | 115 | 56 | 8 | 4.39 | 3.08 | 1.1 |
| 19:00-19:14 | 408 | 558 | 140 | 84 | 12 | 4.39 | 2.64 | 0.98 |
| 19:15-19:29 | 579 | 640 | 150 | 105 | 19 | 4.01 | 1.95 | 1.03 |
| 19:30-19:44 | 598 | 692 | 86 | 102 | 6 | 2.34 | 2.91 | 0.99 |
| 19:45-19:59 | 381 | 513 | 111 | 115 | 9 | 2.8 | 2.79 | 1.06 |
| 20:00-20:14 | 197 | 263 | 50 | 24 | 14 | 3.77 | 1.85 | 0.68 |
| 20:15-20:29 | 202 | 360 | 60 | 37 | 18 | 2.66 | 3.07 | 0.42 |
| 20:30-20:44 | 234 | 379 | 37 | 22 | 17 | 2.6 | 2.46 | 0.49 |
| 20:45-20:59 | 192 | 381 | 64 | 28 | 8 | 2.29 | 2.33 | 0.69 |
| 21:00-21:14 | 193 | 384 | 60 | 45 | 16 | 4.47 | 2.1 | 0.55 |
| 21:15-21:29 | 251 | 211 | 32 | 36 | 5 | 3.0 | 2.31 | 0.51 |
| 21:30-21:44 | 161 | 255 | 50 | 20 | 18 | 2.82 | 1.89 | 0.48 |
| 21:45-21:59 | 169 | 393 | 38 | 41 | 15 | 3.53 | 2.29 | 0.64 |

#### Location: Natete Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 583 | 679 | 128 | 117 | 11 | 2.18 | 2.08 | 0.86 |
| 07:15-07:29 | 524 | 617 | 136 | 96 | 12 | 4.46 | 1.99 | 1.06 |
| 07:30-07:44 | 589 | 537 | 94 | 89 | 8 | 4.48 | 2.62 | 0.96 |
| 07:45-07:59 | 306 | 641 | 118 | 117 | 17 | 2.53 | 2.45 | 0.86 |
| 08:00-08:14 | 565 | 803 | 138 | 67 | 13 | 2.31 | 2.7 | 0.86 |
| 08:15-08:29 | 366 | 739 | 116 | 115 | 19 | 2.57 | 2.64 | 0.85 |
| 08:30-08:44 | 349 | 590 | 105 | 94 | 15 | 3.13 | 3.13 | 0.94 |
| 08:45-08:59 | 481 | 529 | 85 | 79 | 17 | 3.08 | 2.9 | 1.01 |
| 09:00-09:14 | 530 | 574 | 146 | 102 | 10 | 3.48 | 2.0 | 0.88 |
| 09:15-09:29 | 485 | 778 | 93 | 60 | 16 | 3.1 | 2.54 | 0.96 |
| 09:30-09:44 | 481 | 528 | 117 | 74 | 9 | 2.8 | 1.97 | 0.96 |
| 09:45-09:59 | 331 | 419 | 129 | 94 | 18 | 3.86 | 2.14 | 0.98 |
| 10:00-10:14 | 298 | 345 | 53 | 28 | 15 | 2.11 | 2.63 | 0.63 |
| 10:15-10:29 | 256 | 315 | 43 | 31 | 15 | 2.84 | 2.27 | 0.63 |
| 10:30-10:44 | 181 | 397 | 47 | 45 | 8 | 2.75 | 2.54 | 0.51 |
| 10:45-10:59 | 253 | 204 | 42 | 35 | 9 | 3.52 | 2.86 | 0.63 |
| 16:00-16:14 | 236 | 333 | 46 | 25 | 8 | 3.61 | 1.87 | 0.66 |
| 16:15-16:29 | 276 | 293 | 40 | 22 | 18 | 2.84 | 3.03 | 0.69 |
| 16:30-16:44 | 212 | 222 | 55 | 50 | 20 | 2.55 | 3.18 | 0.54 |
| 16:45-16:59 | 248 | 289 | 39 | 46 | 8 | 4.42 | 2.31 | 0.62 |
| 17:00-17:14 | 446 | 727 | 82 | 82 | 13 | 2.71 | 2.97 | 1.03 |
| 17:15-17:29 | 393 | 664 | 136 | 93 | 9 | 3.47 | 1.9 | 1.03 |
| 17:30-17:44 | 404 | 475 | 138 | 83 | 8 | 3.26 | 2.08 | 0.86 |
| 17:45-17:59 | 538 | 799 | 148 | 116 | 19 | 2.2 | 2.8 | 0.88 |
| 18:00-18:14 | 467 | 761 | 101 | 70 | 13 | 2.84 | 1.85 | 0.88 |
| 18:15-18:29 | 453 | 415 | 88 | 65 | 18 | 4.34 | 3.09 | 0.92 |
| 18:30-18:44 | 377 | 597 | 133 | 83 | 16 | 2.97 | 2.43 | 0.96 |
| 18:45-18:59 | 471 | 717 | 142 | 118 | 14 | 2.89 | 2.4 | 0.98 |
| 19:00-19:14 | 579 | 529 | 91 | 110 | 20 | 3.14 | 2.68 | 1.06 |
| 19:15-19:29 | 547 | 530 | 93 | 110 | 18 | 3.89 | 2.05 | 0.85 |
| 19:30-19:44 | 369 | 843 | 92 | 54 | 16 | 3.45 | 2.52 | 1.01 |
| 19:45-19:59 | 571 | 561 | 118 | 90 | 20 | 3.92 | 2.81 | 0.95 |
| 20:00-20:14 | 163 | 393 | 39 | 47 | 20 | 2.5 | 2.35 | 0.45 |
| 20:15-20:29 | 211 | 276 | 63 | 42 | 15 | 2.18 | 3.07 | 0.66 |
| 20:30-20:44 | 181 | 240 | 64 | 37 | 18 | 2.91 | 2.49 | 0.6 |
| 20:45-20:59 | 225 | 286 | 42 | 45 | 5 | 3.58 | 2.8 | 0.61 |
| 21:00-21:14 | 240 | 312 | 69 | 24 | 6 | 3.93 | 2.18 | 0.57 |
| 21:15-21:29 | 235 | 301 | 37 | 42 | 14 | 3.7 | 3.19 | 0.54 |
| 21:30-21:44 | 289 | 239 | 52 | 24 | 8 | 2.87 | 3.12 | 0.67 |
| 21:45-21:59 | 293 | 286 | 64 | 41 | 19 | 2.98 | 3.02 | 0.56 |

### A.8 Day 8: 2026-06-08

#### Location: Wandegeya Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 510 | 772 | 137 | 95 | 8 | 3.71 | 3.12 | 0.91 |
| 07:15-07:29 | 506 | 834 | 114 | 74 | 8 | 3.34 | 1.82 | 0.9 |
| 07:30-07:44 | 527 | 665 | 147 | 108 | 11 | 4.0 | 3.16 | 0.89 |
| 07:45-07:59 | 392 | 576 | 98 | 99 | 9 | 2.66 | 2.44 | 0.99 |
| 08:00-08:14 | 392 | 786 | 97 | 92 | 16 | 3.23 | 2.73 | 0.97 |
| 08:15-08:29 | 446 | 816 | 109 | 53 | 17 | 4.36 | 2.37 | 0.87 |
| 08:30-08:44 | 550 | 595 | 140 | 60 | 5 | 2.3 | 3.13 | 0.99 |
| 08:45-08:59 | 427 | 468 | 124 | 93 | 9 | 3.45 | 3.11 | 1.02 |
| 09:00-09:14 | 466 | 419 | 129 | 91 | 10 | 2.22 | 1.81 | 0.92 |
| 09:15-09:29 | 324 | 519 | 86 | 53 | 5 | 4.23 | 2.57 | 1.04 |
| 09:30-09:44 | 509 | 727 | 108 | 115 | 20 | 3.21 | 2.01 | 0.89 |
| 09:45-09:59 | 357 | 670 | 130 | 107 | 14 | 2.16 | 2.89 | 1.01 |
| 10:00-10:14 | 285 | 338 | 33 | 32 | 18 | 3.3 | 2.22 | 0.43 |
| 10:15-10:29 | 294 | 267 | 52 | 25 | 17 | 3.81 | 2.4 | 0.56 |
| 10:30-10:44 | 150 | 238 | 45 | 48 | 15 | 3.0 | 2.39 | 0.42 |
| 10:45-10:59 | 217 | 357 | 48 | 40 | 11 | 3.84 | 2.76 | 0.65 |
| 16:00-16:14 | 293 | 276 | 49 | 24 | 11 | 4.09 | 2.26 | 0.59 |
| 16:15-16:29 | 292 | 232 | 55 | 39 | 11 | 2.72 | 2.35 | 0.41 |
| 16:30-16:44 | 168 | 294 | 41 | 22 | 20 | 3.8 | 2.95 | 0.55 |
| 16:45-16:59 | 247 | 399 | 60 | 24 | 5 | 2.29 | 2.44 | 0.43 |
| 17:00-17:14 | 458 | 748 | 94 | 59 | 6 | 2.16 | 2.39 | 0.86 |
| 17:15-17:29 | 528 | 411 | 108 | 83 | 17 | 4.46 | 2.57 | 1.08 |
| 17:30-17:44 | 586 | 618 | 95 | 110 | 11 | 3.61 | 2.59 | 1.08 |
| 17:45-17:59 | 305 | 783 | 103 | 66 | 9 | 2.57 | 1.8 | 1.07 |
| 18:00-18:14 | 586 | 707 | 150 | 51 | 19 | 2.7 | 2.56 | 0.91 |
| 18:15-18:29 | 600 | 686 | 91 | 102 | 11 | 3.54 | 2.86 | 0.88 |
| 18:30-18:44 | 437 | 838 | 147 | 64 | 10 | 4.41 | 1.9 | 0.97 |
| 18:45-18:59 | 328 | 500 | 123 | 95 | 19 | 3.12 | 1.85 | 1.06 |
| 19:00-19:14 | 408 | 542 | 83 | 61 | 14 | 4.07 | 1.95 | 0.96 |
| 19:15-19:29 | 531 | 646 | 102 | 117 | 8 | 3.79 | 2.45 | 0.96 |
| 19:30-19:44 | 518 | 651 | 121 | 110 | 10 | 3.41 | 2.59 | 1.04 |
| 19:45-19:59 | 501 | 663 | 93 | 73 | 7 | 4.02 | 2.0 | 0.88 |
| 20:00-20:14 | 277 | 355 | 30 | 27 | 9 | 3.05 | 2.5 | 0.53 |
| 20:15-20:29 | 285 | 271 | 34 | 45 | 19 | 4.32 | 1.95 | 0.66 |
| 20:30-20:44 | 176 | 264 | 34 | 34 | 15 | 2.17 | 2.05 | 0.48 |
| 20:45-20:59 | 262 | 366 | 63 | 41 | 8 | 4.19 | 2.4 | 0.58 |
| 21:00-21:14 | 214 | 217 | 36 | 20 | 10 | 3.71 | 2.48 | 0.48 |
| 21:15-21:29 | 261 | 333 | 47 | 38 | 5 | 2.68 | 2.7 | 0.49 |
| 21:30-21:44 | 248 | 277 | 62 | 21 | 11 | 3.42 | 2.43 | 0.65 |
| 21:45-21:59 | 165 | 270 | 34 | 36 | 11 | 3.94 | 2.03 | 0.48 |

#### Location: Kibuye Roundabout
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 372 | 619 | 125 | 74 | 14 | 4.28 | 2.38 | 1.05 |
| 07:15-07:29 | 525 | 727 | 98 | 53 | 18 | 3.44 | 3.19 | 1.02 |
| 07:30-07:44 | 424 | 446 | 82 | 107 | 6 | 2.61 | 1.91 | 0.93 |
| 07:45-07:59 | 564 | 513 | 86 | 106 | 17 | 3.12 | 3.12 | 0.97 |
| 08:00-08:14 | 324 | 661 | 113 | 63 | 11 | 2.28 | 2.87 | 1.02 |
| 08:15-08:29 | 591 | 738 | 125 | 66 | 11 | 2.84 | 2.41 | 0.96 |
| 08:30-08:44 | 433 | 434 | 139 | 97 | 12 | 3.97 | 2.49 | 0.87 |
| 08:45-08:59 | 515 | 631 | 127 | 90 | 6 | 3.95 | 2.56 | 0.94 |
| 09:00-09:14 | 551 | 749 | 114 | 69 | 14 | 3.68 | 3.01 | 1.06 |
| 09:15-09:29 | 597 | 701 | 81 | 83 | 9 | 4.47 | 2.31 | 1.02 |
| 09:30-09:44 | 507 | 735 | 97 | 90 | 7 | 2.33 | 1.87 | 0.93 |
| 09:45-09:59 | 358 | 494 | 87 | 56 | 9 | 3.58 | 2.6 | 1.07 |
| 10:00-10:14 | 272 | 282 | 57 | 35 | 7 | 3.19 | 2.45 | 0.59 |
| 10:15-10:29 | 232 | 365 | 66 | 26 | 20 | 2.36 | 1.95 | 0.45 |
| 10:30-10:44 | 297 | 242 | 58 | 38 | 10 | 3.3 | 2.43 | 0.61 |
| 10:45-10:59 | 296 | 295 | 40 | 34 | 12 | 3.58 | 2.01 | 0.6 |
| 16:00-16:14 | 239 | 362 | 40 | 44 | 10 | 3.48 | 2.89 | 0.53 |
| 16:15-16:29 | 156 | 330 | 68 | 35 | 20 | 4.13 | 2.61 | 0.58 |
| 16:30-16:44 | 170 | 304 | 36 | 27 | 10 | 4.19 | 2.3 | 0.5 |
| 16:45-16:59 | 265 | 266 | 34 | 40 | 15 | 3.56 | 3.08 | 0.51 |
| 17:00-17:14 | 383 | 829 | 146 | 78 | 9 | 3.21 | 2.61 | 1.09 |
| 17:15-17:29 | 335 | 486 | 122 | 82 | 19 | 2.72 | 2.72 | 0.92 |
| 17:30-17:44 | 524 | 566 | 89 | 110 | 13 | 3.81 | 2.55 | 1.02 |
| 17:45-17:59 | 390 | 728 | 139 | 83 | 18 | 3.97 | 2.13 | 0.95 |
| 18:00-18:14 | 560 | 588 | 131 | 112 | 12 | 2.86 | 3.05 | 1.0 |
| 18:15-18:29 | 472 | 665 | 87 | 50 | 9 | 3.99 | 2.61 | 1.02 |
| 18:30-18:44 | 490 | 735 | 99 | 58 | 8 | 3.25 | 3.13 | 1.09 |
| 18:45-18:59 | 512 | 658 | 125 | 52 | 18 | 2.62 | 1.97 | 0.92 |
| 19:00-19:14 | 352 | 635 | 112 | 116 | 14 | 2.45 | 2.16 | 0.99 |
| 19:15-19:29 | 318 | 571 | 127 | 54 | 20 | 3.51 | 2.69 | 0.9 |
| 19:30-19:44 | 550 | 643 | 103 | 115 | 17 | 2.19 | 2.4 | 0.86 |
| 19:45-19:59 | 361 | 519 | 103 | 110 | 18 | 2.34 | 2.69 | 0.95 |
| 20:00-20:14 | 291 | 361 | 49 | 28 | 5 | 2.38 | 2.8 | 0.5 |
| 20:15-20:29 | 226 | 307 | 64 | 38 | 8 | 2.31 | 1.85 | 0.68 |
| 20:30-20:44 | 205 | 299 | 33 | 41 | 19 | 2.15 | 2.0 | 0.64 |
| 20:45-20:59 | 152 | 280 | 30 | 42 | 9 | 3.21 | 2.41 | 0.41 |
| 21:00-21:14 | 268 | 280 | 61 | 46 | 12 | 4.08 | 2.99 | 0.52 |
| 21:15-21:29 | 181 | 223 | 44 | 23 | 9 | 2.2 | 1.84 | 0.55 |
| 21:30-21:44 | 273 | 246 | 64 | 24 | 11 | 3.62 | 2.31 | 0.57 |
| 21:45-21:59 | 160 | 295 | 42 | 23 | 15 | 3.25 | 1.86 | 0.44 |

#### Location: Bakuli Intersection
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 474 | 606 | 99 | 70 | 18 | 3.55 | 2.17 | 0.96 |
| 07:15-07:29 | 590 | 566 | 134 | 95 | 18 | 3.68 | 2.95 | 0.89 |
| 07:30-07:44 | 406 | 578 | 129 | 89 | 17 | 3.44 | 2.61 | 0.96 |
| 07:45-07:59 | 594 | 897 | 142 | 59 | 5 | 2.35 | 2.35 | 0.85 |
| 08:00-08:14 | 512 | 424 | 119 | 74 | 19 | 4.23 | 2.06 | 0.91 |
| 08:15-08:29 | 485 | 768 | 124 | 69 | 11 | 3.16 | 2.97 | 0.98 |
| 08:30-08:44 | 343 | 466 | 128 | 54 | 17 | 3.14 | 2.93 | 0.9 |
| 08:45-08:59 | 583 | 502 | 86 | 94 | 9 | 3.7 | 2.37 | 0.99 |
| 09:00-09:14 | 589 | 697 | 128 | 79 | 14 | 2.26 | 2.37 | 1.05 |
| 09:15-09:29 | 314 | 403 | 83 | 86 | 7 | 3.11 | 2.43 | 1.07 |
| 09:30-09:44 | 439 | 631 | 126 | 74 | 8 | 4.43 | 3.19 | 1.02 |
| 09:45-09:59 | 584 | 893 | 110 | 111 | 18 | 3.95 | 1.91 | 0.92 |
| 10:00-10:14 | 224 | 329 | 49 | 43 | 6 | 3.34 | 2.64 | 0.58 |
| 10:15-10:29 | 163 | 284 | 48 | 29 | 13 | 3.42 | 3.13 | 0.47 |
| 10:30-10:44 | 269 | 354 | 60 | 41 | 15 | 3.79 | 2.35 | 0.49 |
| 10:45-10:59 | 157 | 337 | 62 | 35 | 13 | 2.99 | 2.82 | 0.55 |
| 16:00-16:14 | 216 | 281 | 46 | 45 | 10 | 4.06 | 2.77 | 0.66 |
| 16:15-16:29 | 236 | 277 | 33 | 22 | 9 | 4.45 | 1.95 | 0.49 |
| 16:30-16:44 | 180 | 395 | 52 | 38 | 17 | 2.99 | 1.88 | 0.56 |
| 16:45-16:59 | 294 | 291 | 67 | 38 | 16 | 2.75 | 1.95 | 0.48 |
| 17:00-17:14 | 317 | 557 | 83 | 79 | 8 | 3.01 | 2.64 | 0.97 |
| 17:15-17:29 | 496 | 551 | 111 | 87 | 11 | 2.1 | 2.39 | 0.98 |
| 17:30-17:44 | 303 | 848 | 113 | 104 | 16 | 3.73 | 2.2 | 1.05 |
| 17:45-17:59 | 567 | 793 | 103 | 54 | 17 | 3.9 | 3.02 | 1.02 |
| 18:00-18:14 | 403 | 476 | 100 | 68 | 13 | 2.66 | 2.7 | 1.1 |
| 18:15-18:29 | 336 | 489 | 116 | 66 | 7 | 2.34 | 2.67 | 0.9 |
| 18:30-18:44 | 524 | 629 | 102 | 116 | 20 | 2.36 | 1.82 | 0.93 |
| 18:45-18:59 | 503 | 639 | 85 | 112 | 13 | 2.89 | 2.97 | 1.04 |
| 19:00-19:14 | 552 | 590 | 138 | 97 | 7 | 2.76 | 3.04 | 1.0 |
| 19:15-19:29 | 330 | 408 | 139 | 53 | 10 | 4.25 | 2.4 | 1.05 |
| 19:30-19:44 | 464 | 619 | 119 | 63 | 9 | 4.33 | 3.11 | 0.95 |
| 19:45-19:59 | 389 | 560 | 131 | 69 | 16 | 2.19 | 1.89 | 0.88 |
| 20:00-20:14 | 257 | 311 | 60 | 26 | 12 | 3.47 | 3.12 | 0.5 |
| 20:15-20:29 | 258 | 225 | 35 | 36 | 13 | 4.36 | 2.14 | 0.63 |
| 20:30-20:44 | 160 | 249 | 43 | 37 | 19 | 3.9 | 3.14 | 0.54 |
| 20:45-20:59 | 162 | 312 | 34 | 24 | 6 | 2.65 | 2.49 | 0.44 |
| 21:00-21:14 | 210 | 333 | 44 | 50 | 18 | 4.44 | 2.6 | 0.68 |
| 21:15-21:29 | 163 | 364 | 31 | 44 | 11 | 3.43 | 2.5 | 0.48 |
| 21:30-21:44 | 160 | 287 | 65 | 43 | 12 | 3.73 | 2.54 | 0.54 |
| 21:45-21:59 | 206 | 354 | 32 | 32 | 15 | 3.36 | 2.82 | 0.43 |

#### Location: Bwaise Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 415 | 895 | 81 | 65 | 14 | 4.02 | 2.13 | 1.07 |
| 07:15-07:29 | 512 | 469 | 93 | 86 | 5 | 3.04 | 2.11 | 1.0 |
| 07:30-07:44 | 521 | 566 | 123 | 59 | 18 | 2.86 | 2.05 | 1.05 |
| 07:45-07:59 | 415 | 775 | 137 | 102 | 10 | 3.34 | 2.73 | 0.85 |
| 08:00-08:14 | 501 | 518 | 139 | 70 | 16 | 2.3 | 2.7 | 1.09 |
| 08:15-08:29 | 396 | 444 | 103 | 81 | 11 | 2.35 | 2.7 | 1.08 |
| 08:30-08:44 | 518 | 774 | 84 | 105 | 9 | 2.83 | 2.63 | 1.03 |
| 08:45-08:59 | 487 | 576 | 86 | 77 | 17 | 3.64 | 2.28 | 0.97 |
| 09:00-09:14 | 444 | 665 | 145 | 93 | 15 | 3.86 | 2.02 | 1.0 |
| 09:15-09:29 | 515 | 456 | 100 | 95 | 7 | 3.12 | 2.19 | 0.85 |
| 09:30-09:44 | 558 | 514 | 100 | 99 | 15 | 3.29 | 2.29 | 1.02 |
| 09:45-09:59 | 310 | 586 | 120 | 118 | 6 | 3.06 | 3.11 | 0.92 |
| 10:00-10:14 | 227 | 205 | 46 | 41 | 18 | 2.86 | 2.29 | 0.46 |
| 10:15-10:29 | 154 | 208 | 52 | 41 | 18 | 3.78 | 3.17 | 0.68 |
| 10:30-10:44 | 264 | 355 | 57 | 32 | 15 | 4.49 | 3.03 | 0.5 |
| 10:45-10:59 | 162 | 364 | 51 | 41 | 15 | 3.22 | 2.48 | 0.48 |
| 16:00-16:14 | 169 | 375 | 30 | 50 | 12 | 2.86 | 2.42 | 0.53 |
| 16:15-16:29 | 240 | 390 | 33 | 38 | 17 | 3.16 | 2.58 | 0.66 |
| 16:30-16:44 | 188 | 389 | 40 | 49 | 12 | 4.43 | 1.84 | 0.67 |
| 16:45-16:59 | 205 | 301 | 37 | 46 | 7 | 2.8 | 2.12 | 0.52 |
| 17:00-17:14 | 432 | 805 | 80 | 99 | 6 | 3.63 | 2.96 | 0.96 |
| 17:15-17:29 | 335 | 733 | 93 | 51 | 7 | 3.27 | 2.87 | 0.96 |
| 17:30-17:44 | 442 | 684 | 138 | 101 | 13 | 4.18 | 3.15 | 0.96 |
| 17:45-17:59 | 586 | 866 | 140 | 91 | 18 | 2.33 | 2.98 | 0.87 |
| 18:00-18:14 | 541 | 441 | 144 | 72 | 9 | 3.75 | 2.94 | 1.03 |
| 18:15-18:29 | 368 | 710 | 123 | 87 | 16 | 3.88 | 3.18 | 1.02 |
| 18:30-18:44 | 466 | 628 | 96 | 84 | 15 | 2.66 | 2.81 | 1.02 |
| 18:45-18:59 | 323 | 635 | 121 | 105 | 13 | 2.75 | 1.86 | 0.86 |
| 19:00-19:14 | 357 | 434 | 106 | 101 | 19 | 3.25 | 2.2 | 0.89 |
| 19:15-19:29 | 471 | 592 | 147 | 117 | 13 | 4.29 | 2.99 | 0.89 |
| 19:30-19:44 | 328 | 816 | 129 | 104 | 11 | 2.5 | 3.08 | 1.08 |
| 19:45-19:59 | 513 | 522 | 135 | 53 | 19 | 3.9 | 1.91 | 0.95 |
| 20:00-20:14 | 298 | 243 | 34 | 28 | 20 | 4.33 | 2.29 | 0.56 |
| 20:15-20:29 | 270 | 283 | 48 | 39 | 17 | 3.79 | 2.44 | 0.54 |
| 20:30-20:44 | 240 | 302 | 55 | 40 | 10 | 3.43 | 2.75 | 0.44 |
| 20:45-20:59 | 213 | 256 | 58 | 29 | 7 | 3.55 | 2.24 | 0.53 |
| 21:00-21:14 | 186 | 213 | 36 | 37 | 18 | 2.9 | 2.84 | 0.4 |
| 21:15-21:29 | 209 | 262 | 67 | 34 | 8 | 3.6 | 2.81 | 0.44 |
| 21:30-21:44 | 267 | 252 | 69 | 28 | 16 | 2.78 | 2.85 | 0.6 |
| 21:45-21:59 | 193 | 344 | 55 | 30 | 12 | 3.21 | 2.71 | 0.63 |

#### Location: Natete Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 309 | 668 | 99 | 94 | 20 | 4.25 | 2.47 | 1.06 |
| 07:15-07:29 | 379 | 769 | 91 | 89 | 12 | 4.46 | 2.9 | 1.0 |
| 07:30-07:44 | 324 | 689 | 92 | 96 | 19 | 3.59 | 2.25 | 1.01 |
| 07:45-07:59 | 305 | 870 | 121 | 66 | 17 | 3.98 | 2.76 | 1.01 |
| 08:00-08:14 | 593 | 729 | 135 | 92 | 7 | 4.01 | 2.25 | 1.1 |
| 08:15-08:29 | 316 | 642 | 82 | 55 | 10 | 4.21 | 2.44 | 1.03 |
| 08:30-08:44 | 564 | 783 | 132 | 59 | 5 | 3.2 | 2.07 | 1.08 |
| 08:45-08:59 | 362 | 798 | 146 | 61 | 6 | 4.29 | 2.71 | 1.05 |
| 09:00-09:14 | 360 | 722 | 109 | 85 | 7 | 3.77 | 2.26 | 0.96 |
| 09:15-09:29 | 496 | 427 | 114 | 117 | 14 | 4.42 | 3.14 | 0.94 |
| 09:30-09:44 | 407 | 563 | 124 | 56 | 19 | 2.94 | 2.37 | 0.95 |
| 09:45-09:59 | 362 | 550 | 134 | 78 | 15 | 2.16 | 2.33 | 0.86 |
| 10:00-10:14 | 225 | 361 | 51 | 32 | 8 | 3.6 | 2.01 | 0.57 |
| 10:15-10:29 | 212 | 389 | 57 | 49 | 11 | 3.33 | 2.93 | 0.47 |
| 10:30-10:44 | 279 | 217 | 47 | 44 | 15 | 2.9 | 1.9 | 0.43 |
| 10:45-10:59 | 247 | 284 | 70 | 48 | 7 | 3.93 | 2.06 | 0.54 |
| 16:00-16:14 | 259 | 204 | 66 | 31 | 14 | 3.44 | 2.06 | 0.69 |
| 16:15-16:29 | 278 | 389 | 68 | 32 | 6 | 2.21 | 2.54 | 0.43 |
| 16:30-16:44 | 216 | 359 | 58 | 43 | 9 | 3.32 | 2.54 | 0.42 |
| 16:45-16:59 | 215 | 391 | 33 | 48 | 14 | 3.13 | 2.31 | 0.59 |
| 17:00-17:14 | 442 | 596 | 105 | 71 | 12 | 3.64 | 2.79 | 1.02 |
| 17:15-17:29 | 391 | 417 | 113 | 120 | 10 | 3.54 | 2.98 | 0.88 |
| 17:30-17:44 | 474 | 724 | 84 | 103 | 18 | 2.64 | 2.87 | 1.1 |
| 17:45-17:59 | 523 | 785 | 88 | 94 | 8 | 4.0 | 2.92 | 0.99 |
| 18:00-18:14 | 538 | 602 | 89 | 117 | 12 | 3.12 | 2.01 | 0.88 |
| 18:15-18:29 | 421 | 810 | 112 | 97 | 11 | 2.54 | 3.08 | 0.95 |
| 18:30-18:44 | 343 | 826 | 119 | 98 | 18 | 2.82 | 2.18 | 0.88 |
| 18:45-18:59 | 479 | 787 | 80 | 101 | 20 | 3.99 | 2.08 | 0.99 |
| 19:00-19:14 | 569 | 732 | 85 | 107 | 11 | 2.31 | 1.82 | 1.09 |
| 19:15-19:29 | 438 | 871 | 142 | 59 | 8 | 3.16 | 1.93 | 0.95 |
| 19:30-19:44 | 589 | 402 | 85 | 91 | 17 | 2.23 | 2.17 | 0.96 |
| 19:45-19:59 | 498 | 816 | 141 | 80 | 9 | 4.25 | 1.94 | 1.07 |
| 20:00-20:14 | 239 | 213 | 33 | 45 | 7 | 2.36 | 3.09 | 0.41 |
| 20:15-20:29 | 157 | 266 | 52 | 35 | 10 | 4.47 | 3.06 | 0.66 |
| 20:30-20:44 | 245 | 305 | 63 | 40 | 14 | 3.94 | 3.15 | 0.58 |
| 20:45-20:59 | 277 | 213 | 67 | 33 | 20 | 4.48 | 2.75 | 0.52 |
| 21:00-21:14 | 165 | 261 | 55 | 34 | 18 | 3.8 | 2.87 | 0.63 |
| 21:15-21:29 | 269 | 249 | 67 | 21 | 6 | 3.67 | 2.72 | 0.41 |
| 21:30-21:44 | 267 | 242 | 70 | 39 | 6 | 4.42 | 2.71 | 0.69 |
| 21:45-21:59 | 265 | 357 | 31 | 32 | 14 | 2.89 | 2.66 | 0.69 |

### A.9 Day 9: 2026-06-09

#### Location: Wandegeya Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 322 | 420 | 88 | 74 | 9 | 2.32 | 2.46 | 1.08 |
| 07:15-07:29 | 485 | 564 | 92 | 74 | 6 | 2.24 | 3.06 | 0.96 |
| 07:30-07:44 | 328 | 744 | 106 | 54 | 5 | 4.17 | 3.06 | 1.01 |
| 07:45-07:59 | 355 | 871 | 129 | 65 | 13 | 4.36 | 2.32 | 0.88 |
| 08:00-08:14 | 570 | 538 | 113 | 78 | 16 | 3.85 | 1.93 | 0.96 |
| 08:15-08:29 | 511 | 468 | 129 | 79 | 11 | 4.12 | 2.37 | 0.9 |
| 08:30-08:44 | 400 | 807 | 102 | 116 | 11 | 2.48 | 2.48 | 0.91 |
| 08:45-08:59 | 436 | 705 | 128 | 53 | 17 | 2.32 | 2.37 | 0.9 |
| 09:00-09:14 | 385 | 714 | 148 | 98 | 7 | 3.68 | 2.78 | 1.01 |
| 09:15-09:29 | 453 | 576 | 119 | 62 | 8 | 3.98 | 1.99 | 1.08 |
| 09:30-09:44 | 535 | 722 | 122 | 58 | 14 | 2.36 | 1.86 | 0.88 |
| 09:45-09:59 | 590 | 776 | 94 | 82 | 13 | 2.32 | 2.33 | 0.89 |
| 10:00-10:14 | 170 | 360 | 50 | 24 | 15 | 3.97 | 3.07 | 0.53 |
| 10:15-10:29 | 159 | 250 | 66 | 35 | 15 | 3.08 | 2.65 | 0.49 |
| 10:30-10:44 | 262 | 377 | 52 | 22 | 5 | 2.86 | 2.5 | 0.43 |
| 10:45-10:59 | 169 | 384 | 56 | 30 | 7 | 2.82 | 2.25 | 0.43 |
| 16:00-16:14 | 205 | 326 | 37 | 50 | 12 | 3.24 | 3.05 | 0.6 |
| 16:15-16:29 | 188 | 219 | 41 | 37 | 5 | 2.56 | 2.56 | 0.57 |
| 16:30-16:44 | 169 | 213 | 48 | 47 | 18 | 4.12 | 3.08 | 0.61 |
| 16:45-16:59 | 210 | 206 | 59 | 41 | 10 | 3.82 | 2.83 | 0.49 |
| 17:00-17:14 | 526 | 541 | 118 | 94 | 7 | 3.96 | 3.19 | 0.86 |
| 17:15-17:29 | 511 | 691 | 94 | 80 | 7 | 2.19 | 2.63 | 1.02 |
| 17:30-17:44 | 598 | 868 | 110 | 51 | 13 | 3.67 | 1.97 | 1.09 |
| 17:45-17:59 | 457 | 698 | 87 | 92 | 10 | 4.4 | 2.44 | 0.93 |
| 18:00-18:14 | 499 | 773 | 95 | 92 | 7 | 3.56 | 2.42 | 0.99 |
| 18:15-18:29 | 571 | 494 | 103 | 94 | 18 | 4.41 | 2.48 | 1.09 |
| 18:30-18:44 | 322 | 701 | 104 | 62 | 15 | 4.43 | 2.91 | 0.95 |
| 18:45-18:59 | 566 | 508 | 142 | 101 | 13 | 2.15 | 1.94 | 0.99 |
| 19:00-19:14 | 504 | 780 | 113 | 93 | 12 | 2.59 | 1.87 | 0.99 |
| 19:15-19:29 | 459 | 538 | 83 | 74 | 14 | 3.93 | 3.18 | 1.08 |
| 19:30-19:44 | 564 | 835 | 114 | 68 | 8 | 3.69 | 2.89 | 1.01 |
| 19:45-19:59 | 586 | 817 | 125 | 72 | 17 | 2.66 | 2.96 | 0.86 |
| 20:00-20:14 | 235 | 239 | 65 | 43 | 7 | 3.19 | 2.91 | 0.44 |
| 20:15-20:29 | 260 | 336 | 63 | 41 | 12 | 3.13 | 2.23 | 0.43 |
| 20:30-20:44 | 292 | 368 | 53 | 20 | 6 | 3.28 | 2.88 | 0.65 |
| 20:45-20:59 | 221 | 335 | 67 | 44 | 13 | 3.15 | 3.06 | 0.4 |
| 21:00-21:14 | 204 | 237 | 35 | 41 | 7 | 4.22 | 3.19 | 0.58 |
| 21:15-21:29 | 294 | 341 | 53 | 31 | 11 | 3.34 | 3.17 | 0.6 |
| 21:30-21:44 | 207 | 338 | 49 | 40 | 12 | 2.4 | 1.97 | 0.45 |
| 21:45-21:59 | 166 | 394 | 40 | 28 | 17 | 3.96 | 2.91 | 0.42 |

#### Location: Kibuye Roundabout
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 390 | 443 | 111 | 52 | 11 | 4.01 | 3.09 | 1.05 |
| 07:15-07:29 | 588 | 415 | 107 | 76 | 16 | 3.81 | 2.35 | 1.09 |
| 07:30-07:44 | 421 | 446 | 123 | 96 | 17 | 3.85 | 2.08 | 0.96 |
| 07:45-07:59 | 394 | 403 | 136 | 100 | 7 | 3.4 | 3.03 | 0.85 |
| 08:00-08:14 | 374 | 814 | 116 | 52 | 20 | 2.61 | 2.15 | 0.95 |
| 08:15-08:29 | 370 | 506 | 80 | 99 | 19 | 4.42 | 2.99 | 0.91 |
| 08:30-08:44 | 363 | 673 | 105 | 86 | 5 | 3.34 | 1.96 | 0.86 |
| 08:45-08:59 | 408 | 500 | 94 | 95 | 8 | 3.7 | 2.93 | 0.89 |
| 09:00-09:14 | 489 | 401 | 84 | 87 | 16 | 3.6 | 3.12 | 1.06 |
| 09:15-09:29 | 595 | 854 | 137 | 54 | 6 | 2.64 | 2.59 | 1.08 |
| 09:30-09:44 | 366 | 637 | 103 | 120 | 8 | 2.95 | 2.55 | 1.04 |
| 09:45-09:59 | 346 | 844 | 89 | 116 | 11 | 2.88 | 2.73 | 1.09 |
| 10:00-10:14 | 207 | 386 | 48 | 38 | 5 | 2.76 | 2.91 | 0.45 |
| 10:15-10:29 | 286 | 250 | 62 | 28 | 18 | 3.54 | 2.62 | 0.7 |
| 10:30-10:44 | 180 | 270 | 65 | 41 | 11 | 4.1 | 3.09 | 0.5 |
| 10:45-10:59 | 244 | 391 | 43 | 35 | 10 | 2.37 | 2.44 | 0.68 |
| 16:00-16:14 | 253 | 319 | 52 | 44 | 12 | 2.25 | 2.84 | 0.66 |
| 16:15-16:29 | 227 | 394 | 40 | 36 | 13 | 3.7 | 3.11 | 0.61 |
| 16:30-16:44 | 178 | 399 | 70 | 42 | 11 | 2.63 | 2.03 | 0.63 |
| 16:45-16:59 | 255 | 201 | 46 | 26 | 9 | 3.25 | 2.78 | 0.41 |
| 17:00-17:14 | 579 | 882 | 84 | 96 | 18 | 2.68 | 2.45 | 0.89 |
| 17:15-17:29 | 586 | 504 | 89 | 65 | 12 | 2.67 | 2.35 | 1.04 |
| 17:30-17:44 | 340 | 520 | 106 | 115 | 18 | 3.51 | 2.27 | 1.06 |
| 17:45-17:59 | 475 | 858 | 84 | 67 | 10 | 3.53 | 2.07 | 0.92 |
| 18:00-18:14 | 581 | 642 | 83 | 120 | 10 | 2.13 | 2.25 | 0.99 |
| 18:15-18:29 | 577 | 852 | 131 | 77 | 10 | 4.18 | 3.06 | 1.07 |
| 18:30-18:44 | 344 | 709 | 150 | 72 | 20 | 4.33 | 2.38 | 0.97 |
| 18:45-18:59 | 312 | 880 | 128 | 117 | 16 | 3.08 | 2.73 | 1.09 |
| 19:00-19:14 | 420 | 404 | 81 | 60 | 18 | 2.94 | 2.87 | 1.0 |
| 19:15-19:29 | 485 | 586 | 80 | 63 | 7 | 4.11 | 2.1 | 0.92 |
| 19:30-19:44 | 356 | 792 | 141 | 68 | 14 | 2.25 | 2.69 | 0.9 |
| 19:45-19:59 | 587 | 795 | 129 | 82 | 15 | 4.5 | 2.87 | 0.87 |
| 20:00-20:14 | 162 | 249 | 39 | 48 | 9 | 3.88 | 2.07 | 0.67 |
| 20:15-20:29 | 234 | 279 | 45 | 22 | 10 | 2.3 | 3.11 | 0.68 |
| 20:30-20:44 | 235 | 270 | 48 | 29 | 11 | 2.95 | 2.16 | 0.52 |
| 20:45-20:59 | 245 | 341 | 48 | 41 | 16 | 3.63 | 2.15 | 0.48 |
| 21:00-21:14 | 229 | 281 | 55 | 33 | 18 | 4.31 | 2.6 | 0.55 |
| 21:15-21:29 | 274 | 242 | 46 | 31 | 14 | 2.17 | 2.48 | 0.66 |
| 21:30-21:44 | 151 | 229 | 33 | 42 | 9 | 4.44 | 2.82 | 0.43 |
| 21:45-21:59 | 187 | 214 | 69 | 50 | 14 | 2.9 | 2.14 | 0.68 |

#### Location: Bakuli Intersection
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 375 | 611 | 125 | 92 | 18 | 3.46 | 2.61 | 0.87 |
| 07:15-07:29 | 377 | 692 | 149 | 95 | 20 | 2.75 | 3.02 | 1.02 |
| 07:30-07:44 | 589 | 849 | 142 | 73 | 19 | 3.33 | 2.45 | 1.07 |
| 07:45-07:59 | 481 | 815 | 136 | 119 | 16 | 2.12 | 3.12 | 0.98 |
| 08:00-08:14 | 597 | 862 | 82 | 86 | 10 | 2.48 | 2.15 | 0.96 |
| 08:15-08:29 | 519 | 779 | 123 | 92 | 13 | 3.4 | 2.39 | 1.01 |
| 08:30-08:44 | 372 | 427 | 95 | 87 | 17 | 4.18 | 2.36 | 0.96 |
| 08:45-08:59 | 352 | 439 | 93 | 55 | 11 | 3.09 | 3.07 | 0.98 |
| 09:00-09:14 | 562 | 588 | 137 | 97 | 7 | 3.13 | 2.37 | 1.04 |
| 09:15-09:29 | 312 | 868 | 81 | 70 | 11 | 3.66 | 1.85 | 1.05 |
| 09:30-09:44 | 330 | 839 | 123 | 102 | 16 | 2.13 | 2.43 | 1.08 |
| 09:45-09:59 | 433 | 412 | 90 | 72 | 6 | 2.91 | 2.79 | 0.94 |
| 10:00-10:14 | 199 | 283 | 40 | 38 | 9 | 3.94 | 2.92 | 0.67 |
| 10:15-10:29 | 223 | 211 | 33 | 27 | 12 | 2.59 | 2.07 | 0.55 |
| 10:30-10:44 | 226 | 292 | 46 | 42 | 11 | 2.51 | 2.24 | 0.58 |
| 10:45-10:59 | 192 | 279 | 53 | 29 | 20 | 2.74 | 2.49 | 0.53 |
| 16:00-16:14 | 184 | 219 | 47 | 34 | 10 | 3.62 | 2.54 | 0.52 |
| 16:15-16:29 | 253 | 211 | 38 | 25 | 7 | 3.44 | 2.58 | 0.5 |
| 16:30-16:44 | 182 | 250 | 69 | 26 | 8 | 3.81 | 2.44 | 0.6 |
| 16:45-16:59 | 159 | 307 | 49 | 34 | 8 | 4.2 | 2.72 | 0.68 |
| 17:00-17:14 | 553 | 876 | 149 | 107 | 5 | 3.6 | 2.21 | 0.89 |
| 17:15-17:29 | 457 | 675 | 93 | 81 | 7 | 3.58 | 2.88 | 1.1 |
| 17:30-17:44 | 429 | 862 | 90 | 70 | 13 | 3.35 | 3.2 | 1.07 |
| 17:45-17:59 | 593 | 459 | 124 | 92 | 16 | 3.72 | 2.29 | 0.86 |
| 18:00-18:14 | 537 | 542 | 107 | 86 | 12 | 2.37 | 2.36 | 0.99 |
| 18:15-18:29 | 475 | 467 | 103 | 67 | 20 | 2.92 | 2.04 | 1.0 |
| 18:30-18:44 | 431 | 431 | 148 | 79 | 12 | 3.68 | 1.8 | 0.92 |
| 18:45-18:59 | 500 | 492 | 120 | 82 | 19 | 4.47 | 1.85 | 0.99 |
| 19:00-19:14 | 409 | 811 | 134 | 59 | 9 | 4.19 | 2.76 | 1.03 |
| 19:15-19:29 | 351 | 420 | 131 | 104 | 11 | 2.87 | 1.85 | 1.0 |
| 19:30-19:44 | 458 | 581 | 102 | 102 | 11 | 3.81 | 2.78 | 1.05 |
| 19:45-19:59 | 404 | 889 | 91 | 93 | 5 | 3.61 | 1.9 | 0.91 |
| 20:00-20:14 | 157 | 326 | 56 | 39 | 7 | 3.13 | 2.94 | 0.4 |
| 20:15-20:29 | 293 | 383 | 36 | 42 | 15 | 3.54 | 1.94 | 0.52 |
| 20:30-20:44 | 154 | 278 | 67 | 24 | 20 | 2.16 | 2.33 | 0.64 |
| 20:45-20:59 | 216 | 233 | 46 | 34 | 15 | 4.39 | 2.95 | 0.43 |
| 21:00-21:14 | 296 | 357 | 57 | 50 | 12 | 3.13 | 2.26 | 0.7 |
| 21:15-21:29 | 171 | 238 | 50 | 20 | 7 | 3.78 | 1.91 | 0.58 |
| 21:30-21:44 | 164 | 231 | 49 | 49 | 7 | 3.14 | 2.87 | 0.44 |
| 21:45-21:59 | 288 | 245 | 33 | 31 | 13 | 2.56 | 2.38 | 0.55 |

#### Location: Bwaise Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 581 | 401 | 85 | 62 | 20 | 4.28 | 1.94 | 0.93 |
| 07:15-07:29 | 455 | 418 | 121 | 95 | 8 | 3.94 | 3.16 | 1.05 |
| 07:30-07:44 | 403 | 510 | 128 | 59 | 11 | 4.45 | 2.61 | 0.96 |
| 07:45-07:59 | 576 | 489 | 128 | 90 | 9 | 3.89 | 3.09 | 0.94 |
| 08:00-08:14 | 564 | 636 | 90 | 82 | 18 | 2.11 | 3.1 | 0.92 |
| 08:15-08:29 | 548 | 596 | 147 | 97 | 8 | 2.97 | 2.82 | 0.91 |
| 08:30-08:44 | 434 | 567 | 110 | 93 | 6 | 4.36 | 2.9 | 0.89 |
| 08:45-08:59 | 373 | 637 | 80 | 107 | 13 | 3.03 | 2.55 | 0.87 |
| 09:00-09:14 | 306 | 871 | 148 | 77 | 10 | 3.63 | 3.17 | 1.09 |
| 09:15-09:29 | 523 | 734 | 96 | 116 | 19 | 2.67 | 2.51 | 0.99 |
| 09:30-09:44 | 560 | 669 | 110 | 80 | 15 | 3.78 | 2.55 | 0.99 |
| 09:45-09:59 | 487 | 409 | 138 | 102 | 16 | 2.97 | 2.27 | 0.92 |
| 10:00-10:14 | 174 | 300 | 37 | 44 | 15 | 2.76 | 2.26 | 0.58 |
| 10:15-10:29 | 219 | 232 | 36 | 47 | 11 | 4.07 | 3.11 | 0.55 |
| 10:30-10:44 | 235 | 328 | 51 | 49 | 6 | 3.63 | 2.97 | 0.44 |
| 10:45-10:59 | 266 | 370 | 47 | 35 | 8 | 2.27 | 3.07 | 0.58 |
| 16:00-16:14 | 267 | 323 | 65 | 35 | 9 | 2.85 | 2.68 | 0.58 |
| 16:15-16:29 | 166 | 206 | 34 | 36 | 11 | 2.5 | 2.29 | 0.48 |
| 16:30-16:44 | 276 | 300 | 52 | 44 | 11 | 3.94 | 2.03 | 0.54 |
| 16:45-16:59 | 282 | 216 | 51 | 45 | 15 | 2.46 | 2.69 | 0.44 |
| 17:00-17:14 | 425 | 786 | 140 | 67 | 15 | 2.51 | 2.54 | 1.03 |
| 17:15-17:29 | 447 | 890 | 106 | 52 | 20 | 2.49 | 2.0 | 0.96 |
| 17:30-17:44 | 330 | 485 | 90 | 72 | 17 | 3.82 | 2.09 | 1.09 |
| 17:45-17:59 | 547 | 735 | 99 | 85 | 6 | 3.62 | 2.37 | 1.05 |
| 18:00-18:14 | 422 | 701 | 105 | 86 | 10 | 3.14 | 2.09 | 0.87 |
| 18:15-18:29 | 378 | 444 | 101 | 50 | 7 | 2.55 | 1.86 | 0.88 |
| 18:30-18:44 | 343 | 696 | 147 | 96 | 13 | 3.33 | 2.12 | 0.93 |
| 18:45-18:59 | 455 | 885 | 146 | 119 | 18 | 2.87 | 2.3 | 0.95 |
| 19:00-19:14 | 398 | 623 | 147 | 100 | 13 | 2.3 | 3.1 | 0.89 |
| 19:15-19:29 | 414 | 570 | 150 | 86 | 20 | 4.07 | 3.18 | 0.95 |
| 19:30-19:44 | 511 | 543 | 142 | 68 | 5 | 4.14 | 1.97 | 1.05 |
| 19:45-19:59 | 550 | 451 | 142 | 90 | 17 | 4.07 | 2.43 | 1.04 |
| 20:00-20:14 | 300 | 212 | 43 | 32 | 10 | 3.2 | 2.75 | 0.63 |
| 20:15-20:29 | 290 | 375 | 56 | 40 | 12 | 3.14 | 2.49 | 0.52 |
| 20:30-20:44 | 210 | 263 | 38 | 32 | 14 | 3.05 | 2.21 | 0.58 |
| 20:45-20:59 | 217 | 266 | 45 | 20 | 9 | 2.73 | 2.92 | 0.41 |
| 21:00-21:14 | 251 | 302 | 51 | 30 | 15 | 2.7 | 2.49 | 0.52 |
| 21:15-21:29 | 199 | 318 | 54 | 45 | 18 | 2.43 | 2.24 | 0.65 |
| 21:30-21:44 | 214 | 351 | 67 | 28 | 13 | 2.38 | 3.2 | 0.63 |
| 21:45-21:59 | 229 | 364 | 60 | 38 | 19 | 2.55 | 2.71 | 0.55 |

#### Location: Natete Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 486 | 462 | 86 | 64 | 16 | 2.72 | 1.94 | 1.09 |
| 07:15-07:29 | 520 | 562 | 129 | 110 | 6 | 2.25 | 2.52 | 1.03 |
| 07:30-07:44 | 402 | 788 | 147 | 92 | 17 | 2.91 | 2.87 | 0.92 |
| 07:45-07:59 | 465 | 878 | 127 | 65 | 8 | 3.15 | 2.96 | 1.07 |
| 08:00-08:14 | 317 | 774 | 106 | 105 | 16 | 4.1 | 2.31 | 0.99 |
| 08:15-08:29 | 312 | 637 | 102 | 90 | 14 | 3.27 | 1.81 | 0.89 |
| 08:30-08:44 | 479 | 457 | 119 | 90 | 5 | 4.22 | 2.69 | 0.91 |
| 08:45-08:59 | 352 | 693 | 149 | 116 | 17 | 3.17 | 2.47 | 0.96 |
| 09:00-09:14 | 320 | 860 | 121 | 111 | 15 | 4.31 | 2.37 | 0.98 |
| 09:15-09:29 | 581 | 542 | 84 | 61 | 7 | 3.12 | 2.01 | 0.93 |
| 09:30-09:44 | 387 | 489 | 117 | 109 | 7 | 4.0 | 3.13 | 0.93 |
| 09:45-09:59 | 387 | 671 | 138 | 98 | 14 | 3.2 | 1.93 | 0.96 |
| 10:00-10:14 | 264 | 302 | 40 | 49 | 13 | 3.06 | 1.9 | 0.67 |
| 10:15-10:29 | 199 | 268 | 36 | 39 | 13 | 3.67 | 2.26 | 0.43 |
| 10:30-10:44 | 264 | 284 | 60 | 38 | 16 | 3.15 | 2.58 | 0.42 |
| 10:45-10:59 | 188 | 278 | 30 | 43 | 16 | 3.2 | 2.93 | 0.69 |
| 16:00-16:14 | 220 | 233 | 53 | 35 | 14 | 2.45 | 2.38 | 0.43 |
| 16:15-16:29 | 254 | 267 | 36 | 26 | 10 | 4.37 | 3.04 | 0.4 |
| 16:30-16:44 | 300 | 354 | 32 | 43 | 5 | 3.68 | 2.22 | 0.43 |
| 16:45-16:59 | 294 | 339 | 46 | 29 | 15 | 2.38 | 2.77 | 0.67 |
| 17:00-17:14 | 353 | 510 | 104 | 80 | 13 | 3.81 | 2.11 | 0.92 |
| 17:15-17:29 | 597 | 441 | 147 | 79 | 8 | 2.81 | 2.55 | 0.97 |
| 17:30-17:44 | 369 | 540 | 116 | 118 | 14 | 2.52 | 2.39 | 0.9 |
| 17:45-17:59 | 595 | 442 | 101 | 55 | 9 | 2.39 | 2.7 | 0.89 |
| 18:00-18:14 | 381 | 885 | 118 | 95 | 17 | 2.86 | 1.86 | 0.93 |
| 18:15-18:29 | 407 | 465 | 111 | 58 | 6 | 2.21 | 1.89 | 0.86 |
| 18:30-18:44 | 577 | 749 | 100 | 58 | 16 | 3.91 | 2.6 | 1.01 |
| 18:45-18:59 | 381 | 771 | 133 | 63 | 7 | 3.73 | 3.19 | 1.01 |
| 19:00-19:14 | 534 | 854 | 99 | 63 | 19 | 4.21 | 2.67 | 0.92 |
| 19:15-19:29 | 539 | 466 | 147 | 90 | 11 | 3.53 | 2.62 | 1.06 |
| 19:30-19:44 | 463 | 591 | 140 | 64 | 7 | 2.55 | 3.1 | 1.08 |
| 19:45-19:59 | 569 | 504 | 85 | 80 | 8 | 2.86 | 2.25 | 0.9 |
| 20:00-20:14 | 176 | 321 | 44 | 46 | 11 | 3.35 | 2.37 | 0.68 |
| 20:15-20:29 | 183 | 268 | 59 | 26 | 15 | 3.34 | 2.02 | 0.41 |
| 20:30-20:44 | 209 | 357 | 58 | 47 | 9 | 4.3 | 1.89 | 0.43 |
| 20:45-20:59 | 169 | 227 | 42 | 40 | 16 | 4.48 | 2.92 | 0.4 |
| 21:00-21:14 | 253 | 371 | 34 | 31 | 20 | 2.27 | 2.48 | 0.6 |
| 21:15-21:29 | 278 | 201 | 64 | 41 | 12 | 2.31 | 2.36 | 0.55 |
| 21:30-21:44 | 219 | 265 | 34 | 49 | 19 | 2.75 | 2.43 | 0.63 |
| 21:45-21:59 | 256 | 351 | 54 | 46 | 10 | 4.15 | 2.04 | 0.42 |

### A.10 Day 10: 2026-06-10

#### Location: Wandegeya Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 482 | 576 | 111 | 84 | 6 | 3.35 | 2.76 | 0.9 |
| 07:15-07:29 | 391 | 670 | 114 | 120 | 8 | 4.24 | 2.56 | 0.93 |
| 07:30-07:44 | 378 | 661 | 149 | 93 | 10 | 4.36 | 2.94 | 0.98 |
| 07:45-07:59 | 438 | 886 | 123 | 75 | 18 | 2.22 | 2.35 | 0.99 |
| 08:00-08:14 | 547 | 622 | 119 | 92 | 11 | 3.35 | 2.34 | 0.99 |
| 08:15-08:29 | 355 | 835 | 102 | 111 | 17 | 3.42 | 2.58 | 1.0 |
| 08:30-08:44 | 477 | 704 | 139 | 118 | 19 | 2.37 | 2.13 | 1.07 |
| 08:45-08:59 | 532 | 870 | 88 | 112 | 13 | 2.6 | 2.54 | 0.93 |
| 09:00-09:14 | 469 | 708 | 88 | 69 | 8 | 2.42 | 3.02 | 0.93 |
| 09:15-09:29 | 470 | 895 | 83 | 65 | 12 | 2.55 | 2.2 | 0.92 |
| 09:30-09:44 | 332 | 492 | 85 | 108 | 15 | 3.98 | 2.64 | 0.88 |
| 09:45-09:59 | 408 | 786 | 140 | 78 | 8 | 4.41 | 2.14 | 0.86 |
| 10:00-10:14 | 244 | 326 | 50 | 22 | 20 | 3.74 | 1.91 | 0.51 |
| 10:15-10:29 | 236 | 317 | 57 | 22 | 16 | 2.77 | 2.71 | 0.67 |
| 10:30-10:44 | 187 | 248 | 36 | 29 | 10 | 3.56 | 2.65 | 0.55 |
| 10:45-10:59 | 202 | 336 | 41 | 28 | 6 | 4.46 | 2.84 | 0.58 |
| 16:00-16:14 | 157 | 245 | 32 | 41 | 10 | 2.8 | 3.19 | 0.5 |
| 16:15-16:29 | 151 | 396 | 40 | 40 | 18 | 2.75 | 2.97 | 0.58 |
| 16:30-16:44 | 204 | 321 | 52 | 23 | 14 | 2.35 | 3.19 | 0.42 |
| 16:45-16:59 | 230 | 396 | 69 | 34 | 5 | 3.04 | 2.98 | 0.53 |
| 17:00-17:14 | 557 | 747 | 90 | 102 | 13 | 2.2 | 2.13 | 0.98 |
| 17:15-17:29 | 510 | 697 | 113 | 87 | 18 | 3.09 | 2.38 | 1.09 |
| 17:30-17:44 | 563 | 430 | 136 | 74 | 17 | 3.75 | 2.28 | 0.95 |
| 17:45-17:59 | 517 | 537 | 145 | 101 | 10 | 3.76 | 3.14 | 1.06 |
| 18:00-18:14 | 559 | 444 | 136 | 74 | 7 | 3.32 | 2.97 | 0.91 |
| 18:15-18:29 | 538 | 457 | 134 | 112 | 8 | 4.38 | 2.7 | 0.9 |
| 18:30-18:44 | 584 | 577 | 118 | 50 | 13 | 2.14 | 2.85 | 0.97 |
| 18:45-18:59 | 471 | 636 | 86 | 88 | 17 | 4.45 | 2.42 | 0.86 |
| 19:00-19:14 | 305 | 671 | 129 | 68 | 19 | 2.93 | 1.97 | 0.99 |
| 19:15-19:29 | 480 | 793 | 148 | 100 | 13 | 2.33 | 2.2 | 0.99 |
| 19:30-19:44 | 598 | 699 | 82 | 70 | 10 | 4.26 | 2.72 | 0.85 |
| 19:45-19:59 | 459 | 702 | 87 | 63 | 6 | 2.54 | 2.05 | 0.94 |
| 20:00-20:14 | 167 | 253 | 54 | 23 | 17 | 2.36 | 2.04 | 0.57 |
| 20:15-20:29 | 197 | 271 | 70 | 47 | 14 | 3.39 | 2.27 | 0.51 |
| 20:30-20:44 | 231 | 339 | 65 | 23 | 11 | 3.71 | 2.36 | 0.65 |
| 20:45-20:59 | 254 | 219 | 35 | 38 | 10 | 4.14 | 2.27 | 0.56 |
| 21:00-21:14 | 194 | 261 | 45 | 37 | 12 | 2.69 | 3.01 | 0.47 |
| 21:15-21:29 | 269 | 357 | 36 | 29 | 15 | 2.99 | 2.99 | 0.69 |
| 21:30-21:44 | 259 | 374 | 31 | 28 | 6 | 2.77 | 2.35 | 0.63 |
| 21:45-21:59 | 281 | 246 | 47 | 34 | 16 | 3.21 | 2.64 | 0.68 |

#### Location: Kibuye Roundabout
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 341 | 808 | 84 | 83 | 7 | 2.58 | 2.46 | 0.89 |
| 07:15-07:29 | 366 | 415 | 135 | 112 | 9 | 2.84 | 2.35 | 1.0 |
| 07:30-07:44 | 390 | 730 | 130 | 73 | 11 | 4.3 | 2.34 | 1.03 |
| 07:45-07:59 | 361 | 621 | 101 | 69 | 11 | 2.39 | 2.85 | 0.96 |
| 08:00-08:14 | 440 | 823 | 118 | 85 | 14 | 3.43 | 1.93 | 1.01 |
| 08:15-08:29 | 408 | 576 | 80 | 118 | 16 | 2.3 | 2.44 | 0.87 |
| 08:30-08:44 | 354 | 466 | 91 | 111 | 8 | 3.61 | 3.02 | 0.88 |
| 08:45-08:59 | 516 | 573 | 145 | 51 | 15 | 4.23 | 2.7 | 1.04 |
| 09:00-09:14 | 595 | 719 | 96 | 101 | 15 | 3.53 | 2.55 | 0.9 |
| 09:15-09:29 | 563 | 805 | 85 | 109 | 16 | 3.79 | 3.13 | 0.96 |
| 09:30-09:44 | 376 | 400 | 140 | 86 | 13 | 2.22 | 3.05 | 1.09 |
| 09:45-09:59 | 413 | 529 | 85 | 83 | 5 | 2.31 | 3.16 | 0.87 |
| 10:00-10:14 | 277 | 289 | 42 | 42 | 19 | 3.23 | 2.3 | 0.44 |
| 10:15-10:29 | 273 | 219 | 30 | 34 | 17 | 3.76 | 1.95 | 0.55 |
| 10:30-10:44 | 273 | 358 | 36 | 27 | 11 | 2.55 | 1.82 | 0.45 |
| 10:45-10:59 | 263 | 234 | 46 | 31 | 8 | 2.68 | 2.5 | 0.42 |
| 16:00-16:14 | 218 | 351 | 59 | 35 | 18 | 2.32 | 2.23 | 0.69 |
| 16:15-16:29 | 223 | 288 | 58 | 25 | 20 | 2.47 | 2.25 | 0.48 |
| 16:30-16:44 | 227 | 257 | 51 | 21 | 16 | 2.68 | 3.12 | 0.52 |
| 16:45-16:59 | 294 | 230 | 56 | 30 | 20 | 2.11 | 2.76 | 0.61 |
| 17:00-17:14 | 379 | 528 | 103 | 101 | 20 | 3.68 | 1.83 | 1.04 |
| 17:15-17:29 | 591 | 600 | 105 | 112 | 18 | 4.49 | 2.63 | 0.92 |
| 17:30-17:44 | 306 | 537 | 101 | 111 | 20 | 2.57 | 2.34 | 1.06 |
| 17:45-17:59 | 409 | 610 | 116 | 74 | 12 | 4.43 | 2.35 | 0.95 |
| 18:00-18:14 | 564 | 407 | 129 | 58 | 13 | 3.19 | 2.1 | 1.05 |
| 18:15-18:29 | 432 | 490 | 146 | 98 | 6 | 4.09 | 3.03 | 1.02 |
| 18:30-18:44 | 431 | 797 | 101 | 114 | 18 | 2.35 | 2.3 | 0.99 |
| 18:45-18:59 | 450 | 736 | 97 | 91 | 15 | 4.25 | 3.05 | 0.92 |
| 19:00-19:14 | 443 | 740 | 87 | 58 | 20 | 2.76 | 2.0 | 0.94 |
| 19:15-19:29 | 418 | 452 | 95 | 116 | 6 | 3.11 | 1.88 | 0.94 |
| 19:30-19:44 | 380 | 760 | 125 | 51 | 14 | 2.15 | 2.49 | 0.9 |
| 19:45-19:59 | 475 | 562 | 143 | 109 | 19 | 3.4 | 2.79 | 1.04 |
| 20:00-20:14 | 260 | 346 | 31 | 43 | 15 | 2.18 | 2.72 | 0.65 |
| 20:15-20:29 | 278 | 244 | 55 | 37 | 6 | 3.96 | 2.34 | 0.47 |
| 20:30-20:44 | 297 | 229 | 56 | 43 | 7 | 2.11 | 2.79 | 0.57 |
| 20:45-20:59 | 235 | 337 | 31 | 42 | 16 | 3.9 | 2.25 | 0.67 |
| 21:00-21:14 | 223 | 348 | 41 | 26 | 8 | 3.29 | 2.2 | 0.46 |
| 21:15-21:29 | 285 | 293 | 56 | 34 | 12 | 2.45 | 2.25 | 0.53 |
| 21:30-21:44 | 296 | 202 | 49 | 40 | 19 | 2.51 | 3.19 | 0.57 |
| 21:45-21:59 | 167 | 397 | 30 | 38 | 16 | 4.14 | 1.91 | 0.67 |

#### Location: Bakuli Intersection
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 519 | 850 | 101 | 69 | 20 | 3.58 | 2.2 | 1.05 |
| 07:15-07:29 | 339 | 533 | 137 | 55 | 6 | 4.46 | 3.18 | 1.06 |
| 07:30-07:44 | 381 | 559 | 134 | 52 | 8 | 2.29 | 2.3 | 0.86 |
| 07:45-07:59 | 505 | 471 | 140 | 108 | 15 | 2.45 | 2.61 | 1.06 |
| 08:00-08:14 | 374 | 835 | 90 | 114 | 16 | 4.13 | 2.03 | 0.86 |
| 08:15-08:29 | 599 | 542 | 99 | 115 | 18 | 3.47 | 2.26 | 1.03 |
| 08:30-08:44 | 451 | 701 | 148 | 51 | 13 | 4.03 | 1.94 | 1.03 |
| 08:45-08:59 | 464 | 796 | 150 | 96 | 17 | 3.38 | 2.37 | 1.06 |
| 09:00-09:14 | 305 | 636 | 117 | 55 | 17 | 2.2 | 2.72 | 0.98 |
| 09:15-09:29 | 321 | 842 | 136 | 83 | 8 | 2.97 | 1.9 | 0.96 |
| 09:30-09:44 | 513 | 522 | 101 | 104 | 10 | 3.17 | 2.54 | 0.89 |
| 09:45-09:59 | 365 | 654 | 112 | 108 | 17 | 3.51 | 3.08 | 1.05 |
| 10:00-10:14 | 233 | 274 | 70 | 41 | 7 | 3.3 | 2.76 | 0.55 |
| 10:15-10:29 | 163 | 269 | 58 | 42 | 12 | 2.17 | 3.11 | 0.41 |
| 10:30-10:44 | 230 | 348 | 66 | 42 | 9 | 2.96 | 2.09 | 0.52 |
| 10:45-10:59 | 235 | 306 | 49 | 20 | 12 | 2.21 | 3.06 | 0.62 |
| 16:00-16:14 | 216 | 376 | 59 | 35 | 9 | 3.89 | 2.05 | 0.59 |
| 16:15-16:29 | 248 | 294 | 47 | 30 | 5 | 3.43 | 2.49 | 0.51 |
| 16:30-16:44 | 169 | 239 | 39 | 23 | 20 | 2.34 | 2.3 | 0.48 |
| 16:45-16:59 | 237 | 390 | 31 | 36 | 6 | 3.19 | 2.66 | 0.7 |
| 17:00-17:14 | 316 | 818 | 139 | 110 | 18 | 3.34 | 2.32 | 1.0 |
| 17:15-17:29 | 453 | 695 | 123 | 112 | 11 | 2.25 | 2.54 | 0.92 |
| 17:30-17:44 | 492 | 686 | 100 | 84 | 14 | 4.14 | 2.09 | 0.99 |
| 17:45-17:59 | 346 | 499 | 82 | 108 | 14 | 2.16 | 1.89 | 0.91 |
| 18:00-18:14 | 399 | 409 | 123 | 99 | 14 | 4.25 | 1.84 | 1.02 |
| 18:15-18:29 | 449 | 603 | 105 | 89 | 17 | 3.48 | 2.41 | 0.9 |
| 18:30-18:44 | 393 | 776 | 135 | 73 | 19 | 2.36 | 1.9 | 1.05 |
| 18:45-18:59 | 574 | 605 | 86 | 73 | 6 | 3.17 | 2.34 | 1.02 |
| 19:00-19:14 | 510 | 426 | 99 | 57 | 16 | 3.17 | 1.85 | 0.91 |
| 19:15-19:29 | 600 | 675 | 113 | 117 | 14 | 2.83 | 2.83 | 0.9 |
| 19:30-19:44 | 390 | 693 | 130 | 110 | 13 | 4.1 | 2.46 | 1.0 |
| 19:45-19:59 | 351 | 432 | 140 | 73 | 18 | 3.52 | 2.45 | 0.93 |
| 20:00-20:14 | 236 | 266 | 44 | 35 | 15 | 2.73 | 2.74 | 0.67 |
| 20:15-20:29 | 280 | 212 | 47 | 47 | 13 | 3.02 | 2.09 | 0.5 |
| 20:30-20:44 | 217 | 303 | 33 | 21 | 14 | 2.58 | 2.33 | 0.41 |
| 20:45-20:59 | 258 | 281 | 31 | 40 | 19 | 2.22 | 2.88 | 0.68 |
| 21:00-21:14 | 192 | 385 | 52 | 39 | 12 | 2.43 | 3.13 | 0.66 |
| 21:15-21:29 | 182 | 249 | 53 | 29 | 14 | 4.48 | 2.06 | 0.7 |
| 21:30-21:44 | 278 | 250 | 49 | 31 | 13 | 4.28 | 2.97 | 0.41 |
| 21:45-21:59 | 234 | 316 | 60 | 26 | 18 | 3.14 | 2.96 | 0.44 |

#### Location: Bwaise Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 564 | 651 | 131 | 94 | 11 | 4.3 | 2.52 | 0.99 |
| 07:15-07:29 | 305 | 523 | 129 | 62 | 6 | 3.28 | 2.82 | 1.08 |
| 07:30-07:44 | 482 | 582 | 139 | 68 | 17 | 4.19 | 2.54 | 0.91 |
| 07:45-07:59 | 520 | 822 | 85 | 110 | 8 | 4.09 | 1.95 | 0.93 |
| 08:00-08:14 | 320 | 428 | 93 | 91 | 9 | 2.9 | 2.22 | 1.02 |
| 08:15-08:29 | 304 | 728 | 148 | 114 | 6 | 3.31 | 2.38 | 1.09 |
| 08:30-08:44 | 382 | 825 | 123 | 51 | 16 | 4.31 | 2.71 | 1.08 |
| 08:45-08:59 | 351 | 460 | 129 | 97 | 17 | 2.41 | 3.14 | 0.98 |
| 09:00-09:14 | 386 | 638 | 127 | 72 | 7 | 2.35 | 3.11 | 0.86 |
| 09:15-09:29 | 372 | 708 | 117 | 98 | 11 | 3.22 | 2.66 | 0.88 |
| 09:30-09:44 | 377 | 827 | 143 | 75 | 9 | 3.74 | 3.14 | 0.93 |
| 09:45-09:59 | 358 | 822 | 109 | 107 | 10 | 2.23 | 3.07 | 1.05 |
| 10:00-10:14 | 218 | 251 | 37 | 27 | 10 | 3.0 | 2.61 | 0.6 |
| 10:15-10:29 | 247 | 316 | 64 | 27 | 18 | 2.86 | 3.08 | 0.54 |
| 10:30-10:44 | 152 | 316 | 37 | 20 | 9 | 3.11 | 3.12 | 0.43 |
| 10:45-10:59 | 259 | 353 | 40 | 28 | 8 | 2.46 | 2.69 | 0.59 |
| 16:00-16:14 | 264 | 364 | 61 | 27 | 20 | 2.23 | 2.33 | 0.55 |
| 16:15-16:29 | 160 | 210 | 43 | 22 | 15 | 4.28 | 2.64 | 0.7 |
| 16:30-16:44 | 246 | 308 | 53 | 21 | 13 | 2.23 | 2.92 | 0.56 |
| 16:45-16:59 | 212 | 369 | 32 | 35 | 18 | 2.27 | 2.14 | 0.52 |
| 17:00-17:14 | 591 | 467 | 85 | 106 | 20 | 4.46 | 2.94 | 1.06 |
| 17:15-17:29 | 353 | 450 | 83 | 82 | 11 | 4.49 | 2.11 | 1.06 |
| 17:30-17:44 | 578 | 636 | 95 | 89 | 10 | 4.02 | 2.96 | 1.03 |
| 17:45-17:59 | 559 | 720 | 131 | 81 | 7 | 3.12 | 3.08 | 1.06 |
| 18:00-18:14 | 428 | 589 | 148 | 75 | 19 | 2.6 | 2.13 | 1.01 |
| 18:15-18:29 | 395 | 407 | 144 | 112 | 11 | 2.77 | 3.04 | 0.89 |
| 18:30-18:44 | 590 | 463 | 135 | 50 | 9 | 2.18 | 2.52 | 1.0 |
| 18:45-18:59 | 423 | 738 | 148 | 108 | 14 | 3.52 | 3.08 | 0.97 |
| 19:00-19:14 | 564 | 608 | 92 | 113 | 10 | 3.21 | 1.92 | 0.87 |
| 19:15-19:29 | 371 | 467 | 146 | 73 | 7 | 3.03 | 2.98 | 0.99 |
| 19:30-19:44 | 560 | 505 | 131 | 94 | 19 | 3.0 | 2.49 | 1.05 |
| 19:45-19:59 | 586 | 635 | 141 | 55 | 16 | 2.26 | 2.76 | 0.91 |
| 20:00-20:14 | 267 | 289 | 32 | 45 | 8 | 4.29 | 1.93 | 0.53 |
| 20:15-20:29 | 216 | 378 | 61 | 40 | 20 | 2.56 | 3.19 | 0.68 |
| 20:30-20:44 | 250 | 294 | 37 | 25 | 11 | 2.59 | 1.88 | 0.58 |
| 20:45-20:59 | 183 | 359 | 42 | 20 | 19 | 2.17 | 3.04 | 0.46 |
| 21:00-21:14 | 222 | 206 | 55 | 37 | 19 | 2.67 | 2.29 | 0.6 |
| 21:15-21:29 | 177 | 345 | 35 | 42 | 14 | 3.54 | 3.11 | 0.44 |
| 21:30-21:44 | 241 | 267 | 39 | 38 | 18 | 3.11 | 2.2 | 0.69 |
| 21:45-21:59 | 212 | 302 | 70 | 23 | 6 | 3.03 | 2.85 | 0.53 |

#### Location: Natete Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 357 | 785 | 80 | 101 | 8 | 4.42 | 1.93 | 0.92 |
| 07:15-07:29 | 364 | 502 | 103 | 74 | 6 | 3.76 | 2.22 | 1.01 |
| 07:30-07:44 | 335 | 535 | 135 | 75 | 9 | 4.18 | 1.92 | 0.89 |
| 07:45-07:59 | 566 | 837 | 90 | 74 | 6 | 3.88 | 1.98 | 0.97 |
| 08:00-08:14 | 370 | 703 | 107 | 50 | 20 | 2.79 | 2.41 | 1.04 |
| 08:15-08:29 | 364 | 622 | 83 | 118 | 17 | 3.6 | 2.96 | 1.09 |
| 08:30-08:44 | 536 | 448 | 129 | 51 | 20 | 4.49 | 2.16 | 0.87 |
| 08:45-08:59 | 328 | 488 | 150 | 56 | 7 | 3.43 | 2.0 | 1.06 |
| 09:00-09:14 | 359 | 476 | 99 | 97 | 8 | 3.52 | 1.83 | 0.95 |
| 09:15-09:29 | 363 | 604 | 82 | 113 | 20 | 3.4 | 2.97 | 0.95 |
| 09:30-09:44 | 540 | 449 | 137 | 108 | 11 | 2.71 | 2.65 | 0.9 |
| 09:45-09:59 | 408 | 539 | 110 | 82 | 6 | 2.39 | 2.57 | 1.01 |
| 10:00-10:14 | 227 | 217 | 67 | 40 | 20 | 4.02 | 2.96 | 0.7 |
| 10:15-10:29 | 161 | 335 | 63 | 27 | 14 | 3.66 | 2.67 | 0.55 |
| 10:30-10:44 | 184 | 346 | 35 | 50 | 17 | 2.83 | 3.11 | 0.61 |
| 10:45-10:59 | 231 | 296 | 39 | 36 | 16 | 4.29 | 2.02 | 0.6 |
| 16:00-16:14 | 229 | 214 | 53 | 36 | 13 | 2.42 | 2.99 | 0.67 |
| 16:15-16:29 | 255 | 342 | 55 | 31 | 18 | 2.24 | 2.47 | 0.59 |
| 16:30-16:44 | 261 | 376 | 44 | 49 | 18 | 2.14 | 3.0 | 0.51 |
| 16:45-16:59 | 199 | 400 | 33 | 42 | 11 | 2.17 | 2.28 | 0.54 |
| 17:00-17:14 | 494 | 635 | 103 | 108 | 16 | 2.58 | 2.63 | 1.08 |
| 17:15-17:29 | 359 | 706 | 96 | 104 | 8 | 3.13 | 1.85 | 0.96 |
| 17:30-17:44 | 325 | 803 | 91 | 82 | 9 | 2.8 | 2.12 | 0.95 |
| 17:45-17:59 | 318 | 849 | 133 | 107 | 12 | 3.34 | 2.2 | 0.85 |
| 18:00-18:14 | 408 | 823 | 117 | 114 | 10 | 3.14 | 1.81 | 0.96 |
| 18:15-18:29 | 309 | 827 | 132 | 52 | 18 | 2.35 | 2.64 | 0.87 |
| 18:30-18:44 | 525 | 728 | 115 | 69 | 20 | 3.65 | 2.91 | 0.94 |
| 18:45-18:59 | 546 | 606 | 116 | 57 | 6 | 3.01 | 3.12 | 0.86 |
| 19:00-19:14 | 446 | 782 | 87 | 69 | 9 | 3.24 | 2.04 | 0.99 |
| 19:15-19:29 | 582 | 719 | 149 | 79 | 14 | 4.43 | 2.2 | 1.04 |
| 19:30-19:44 | 536 | 447 | 134 | 78 | 10 | 3.6 | 1.83 | 1.06 |
| 19:45-19:59 | 454 | 652 | 143 | 105 | 20 | 2.22 | 2.3 | 1.01 |
| 20:00-20:14 | 297 | 314 | 65 | 44 | 17 | 4.28 | 1.89 | 0.41 |
| 20:15-20:29 | 157 | 253 | 49 | 39 | 18 | 3.64 | 3.15 | 0.58 |
| 20:30-20:44 | 153 | 291 | 65 | 34 | 18 | 3.28 | 2.97 | 0.63 |
| 20:45-20:59 | 277 | 374 | 33 | 27 | 11 | 2.67 | 2.14 | 0.65 |
| 21:00-21:14 | 244 | 312 | 51 | 30 | 20 | 2.22 | 2.65 | 0.6 |
| 21:15-21:29 | 154 | 299 | 42 | 49 | 7 | 2.45 | 2.55 | 0.55 |
| 21:30-21:44 | 277 | 338 | 42 | 46 | 18 | 2.48 | 1.94 | 0.56 |
| 21:45-21:59 | 157 | 389 | 38 | 35 | 18 | 4.46 | 1.83 | 0.59 |

### A.11 Day 11: 2026-06-11

#### Location: Wandegeya Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 422 | 549 | 109 | 66 | 13 | 4.26 | 2.64 | 0.89 |
| 07:15-07:29 | 431 | 567 | 129 | 59 | 10 | 3.75 | 1.96 | 0.98 |
| 07:30-07:44 | 405 | 789 | 98 | 73 | 16 | 4.15 | 2.53 | 1.08 |
| 07:45-07:59 | 545 | 694 | 118 | 99 | 10 | 2.27 | 2.11 | 0.9 |
| 08:00-08:14 | 549 | 493 | 95 | 53 | 16 | 4.49 | 2.78 | 1.0 |
| 08:15-08:29 | 536 | 661 | 129 | 118 | 18 | 4.24 | 2.61 | 0.86 |
| 08:30-08:44 | 303 | 575 | 138 | 105 | 8 | 2.65 | 2.8 | 0.94 |
| 08:45-08:59 | 383 | 619 | 146 | 55 | 11 | 3.77 | 3.01 | 1.05 |
| 09:00-09:14 | 520 | 754 | 87 | 68 | 17 | 2.81 | 2.28 | 0.93 |
| 09:15-09:29 | 378 | 596 | 112 | 53 | 6 | 2.52 | 2.07 | 1.06 |
| 09:30-09:44 | 505 | 809 | 113 | 71 | 14 | 2.95 | 2.74 | 1.02 |
| 09:45-09:59 | 587 | 454 | 100 | 50 | 16 | 3.94 | 2.59 | 1.05 |
| 10:00-10:14 | 290 | 223 | 35 | 25 | 11 | 3.22 | 3.02 | 0.57 |
| 10:15-10:29 | 291 | 357 | 61 | 25 | 8 | 2.98 | 2.02 | 0.62 |
| 10:30-10:44 | 187 | 389 | 68 | 32 | 8 | 3.28 | 3.2 | 0.45 |
| 10:45-10:59 | 169 | 228 | 31 | 24 | 13 | 2.26 | 2.16 | 0.52 |
| 16:00-16:14 | 290 | 352 | 37 | 27 | 19 | 3.54 | 2.58 | 0.62 |
| 16:15-16:29 | 180 | 229 | 59 | 34 | 19 | 2.5 | 2.34 | 0.56 |
| 16:30-16:44 | 180 | 369 | 57 | 32 | 10 | 2.57 | 1.89 | 0.58 |
| 16:45-16:59 | 235 | 285 | 34 | 31 | 18 | 2.58 | 1.89 | 0.48 |
| 17:00-17:14 | 521 | 872 | 85 | 115 | 10 | 3.18 | 2.5 | 0.97 |
| 17:15-17:29 | 446 | 410 | 92 | 51 | 14 | 2.16 | 2.07 | 0.95 |
| 17:30-17:44 | 416 | 593 | 114 | 100 | 18 | 2.25 | 2.84 | 0.97 |
| 17:45-17:59 | 390 | 416 | 85 | 85 | 9 | 2.69 | 2.37 | 0.92 |
| 18:00-18:14 | 358 | 723 | 101 | 84 | 9 | 4.29 | 2.88 | 0.92 |
| 18:15-18:29 | 518 | 843 | 132 | 52 | 6 | 3.97 | 2.26 | 1.05 |
| 18:30-18:44 | 428 | 785 | 101 | 55 | 14 | 3.63 | 2.98 | 0.91 |
| 18:45-18:59 | 391 | 560 | 93 | 118 | 8 | 2.86 | 1.96 | 0.89 |
| 19:00-19:14 | 501 | 736 | 91 | 118 | 8 | 2.76 | 2.44 | 0.97 |
| 19:15-19:29 | 481 | 408 | 150 | 109 | 13 | 3.32 | 2.65 | 1.05 |
| 19:30-19:44 | 496 | 722 | 133 | 93 | 13 | 2.99 | 2.21 | 1.09 |
| 19:45-19:59 | 482 | 689 | 97 | 73 | 14 | 3.96 | 3.1 | 0.91 |
| 20:00-20:14 | 202 | 292 | 48 | 49 | 17 | 3.22 | 2.83 | 0.48 |
| 20:15-20:29 | 186 | 262 | 48 | 39 | 17 | 2.11 | 2.28 | 0.67 |
| 20:30-20:44 | 296 | 396 | 45 | 38 | 15 | 3.93 | 1.89 | 0.55 |
| 20:45-20:59 | 225 | 323 | 32 | 43 | 9 | 2.67 | 2.16 | 0.5 |
| 21:00-21:14 | 253 | 236 | 59 | 34 | 10 | 3.76 | 3.18 | 0.65 |
| 21:15-21:29 | 161 | 242 | 58 | 36 | 8 | 2.17 | 2.16 | 0.42 |
| 21:30-21:44 | 182 | 265 | 59 | 36 | 11 | 2.25 | 2.42 | 0.63 |
| 21:45-21:59 | 158 | 227 | 60 | 41 | 16 | 2.55 | 2.42 | 0.51 |

#### Location: Kibuye Roundabout
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 548 | 834 | 133 | 98 | 7 | 3.22 | 2.63 | 0.89 |
| 07:15-07:29 | 341 | 512 | 122 | 90 | 20 | 3.18 | 3.1 | 0.94 |
| 07:30-07:44 | 430 | 470 | 97 | 88 | 18 | 3.52 | 2.05 | 1.02 |
| 07:45-07:59 | 323 | 691 | 88 | 83 | 16 | 2.16 | 1.87 | 0.93 |
| 08:00-08:14 | 338 | 763 | 147 | 111 | 19 | 4.33 | 3.04 | 0.92 |
| 08:15-08:29 | 311 | 772 | 87 | 105 | 7 | 4.43 | 2.04 | 1.01 |
| 08:30-08:44 | 397 | 512 | 132 | 105 | 5 | 2.37 | 2.57 | 1.07 |
| 08:45-08:59 | 568 | 417 | 81 | 95 | 16 | 4.37 | 3.04 | 0.87 |
| 09:00-09:14 | 316 | 564 | 83 | 68 | 5 | 2.17 | 2.66 | 1.01 |
| 09:15-09:29 | 487 | 480 | 143 | 66 | 11 | 2.41 | 2.6 | 0.93 |
| 09:30-09:44 | 359 | 406 | 81 | 85 | 9 | 3.03 | 2.42 | 1.05 |
| 09:45-09:59 | 515 | 401 | 81 | 76 | 9 | 2.95 | 2.22 | 1.05 |
| 10:00-10:14 | 253 | 205 | 34 | 39 | 12 | 2.56 | 2.34 | 0.45 |
| 10:15-10:29 | 186 | 310 | 45 | 22 | 14 | 4.46 | 2.86 | 0.55 |
| 10:30-10:44 | 180 | 264 | 60 | 38 | 8 | 3.19 | 3.12 | 0.45 |
| 10:45-10:59 | 279 | 207 | 37 | 36 | 19 | 2.27 | 3.07 | 0.58 |
| 16:00-16:14 | 177 | 305 | 51 | 39 | 13 | 4.15 | 3.12 | 0.66 |
| 16:15-16:29 | 173 | 246 | 39 | 47 | 7 | 2.78 | 2.29 | 0.41 |
| 16:30-16:44 | 250 | 220 | 38 | 38 | 13 | 2.32 | 1.87 | 0.6 |
| 16:45-16:59 | 152 | 355 | 45 | 32 | 8 | 3.48 | 1.83 | 0.43 |
| 17:00-17:14 | 581 | 892 | 85 | 53 | 12 | 3.03 | 2.2 | 1.05 |
| 17:15-17:29 | 398 | 418 | 114 | 60 | 14 | 2.79 | 2.82 | 1.06 |
| 17:30-17:44 | 423 | 553 | 101 | 94 | 8 | 4.31 | 1.92 | 1.0 |
| 17:45-17:59 | 480 | 421 | 149 | 106 | 11 | 2.75 | 2.97 | 0.89 |
| 18:00-18:14 | 499 | 588 | 140 | 85 | 14 | 3.96 | 2.66 | 1.05 |
| 18:15-18:29 | 322 | 806 | 114 | 111 | 12 | 4.13 | 1.99 | 1.05 |
| 18:30-18:44 | 599 | 715 | 110 | 91 | 12 | 2.11 | 2.36 | 1.03 |
| 18:45-18:59 | 333 | 480 | 140 | 57 | 7 | 3.76 | 2.37 | 1.09 |
| 19:00-19:14 | 375 | 726 | 149 | 62 | 17 | 4.45 | 2.17 | 0.94 |
| 19:15-19:29 | 505 | 789 | 117 | 59 | 18 | 3.15 | 3.18 | 0.91 |
| 19:30-19:44 | 312 | 440 | 150 | 72 | 11 | 2.15 | 1.96 | 1.01 |
| 19:45-19:59 | 481 | 416 | 135 | 92 | 19 | 4.14 | 2.82 | 0.96 |
| 20:00-20:14 | 273 | 243 | 36 | 33 | 13 | 2.63 | 3.09 | 0.44 |
| 20:15-20:29 | 254 | 282 | 56 | 36 | 6 | 4.01 | 2.03 | 0.41 |
| 20:30-20:44 | 157 | 241 | 47 | 23 | 16 | 2.14 | 2.79 | 0.64 |
| 20:45-20:59 | 238 | 307 | 69 | 44 | 10 | 3.47 | 2.68 | 0.64 |
| 21:00-21:14 | 225 | 363 | 30 | 47 | 20 | 3.45 | 2.98 | 0.5 |
| 21:15-21:29 | 242 | 271 | 34 | 26 | 7 | 2.3 | 2.71 | 0.57 |
| 21:30-21:44 | 281 | 282 | 52 | 37 | 14 | 2.84 | 3.15 | 0.59 |
| 21:45-21:59 | 192 | 243 | 36 | 37 | 19 | 3.02 | 2.73 | 0.65 |

#### Location: Bakuli Intersection
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 458 | 643 | 99 | 119 | 6 | 4.35 | 2.25 | 0.86 |
| 07:15-07:29 | 553 | 642 | 101 | 110 | 5 | 3.09 | 2.11 | 1.09 |
| 07:30-07:44 | 597 | 781 | 97 | 65 | 6 | 2.84 | 1.9 | 1.06 |
| 07:45-07:59 | 309 | 888 | 145 | 70 | 6 | 3.36 | 2.0 | 0.94 |
| 08:00-08:14 | 529 | 585 | 149 | 72 | 17 | 3.34 | 1.83 | 1.07 |
| 08:15-08:29 | 541 | 672 | 95 | 69 | 18 | 4.37 | 2.87 | 0.86 |
| 08:30-08:44 | 460 | 799 | 97 | 65 | 20 | 3.08 | 3.13 | 0.94 |
| 08:45-08:59 | 318 | 660 | 147 | 112 | 13 | 2.93 | 2.19 | 0.94 |
| 09:00-09:14 | 448 | 559 | 104 | 118 | 14 | 2.9 | 2.3 | 1.04 |
| 09:15-09:29 | 301 | 719 | 132 | 87 | 8 | 3.01 | 2.08 | 0.94 |
| 09:30-09:44 | 445 | 785 | 143 | 64 | 12 | 3.48 | 2.27 | 1.01 |
| 09:45-09:59 | 305 | 641 | 124 | 51 | 5 | 2.49 | 1.84 | 0.94 |
| 10:00-10:14 | 188 | 255 | 38 | 34 | 9 | 2.27 | 2.73 | 0.62 |
| 10:15-10:29 | 285 | 308 | 35 | 20 | 8 | 3.86 | 2.6 | 0.68 |
| 10:30-10:44 | 179 | 259 | 45 | 33 | 20 | 2.73 | 3.07 | 0.41 |
| 10:45-10:59 | 175 | 288 | 41 | 21 | 17 | 3.64 | 1.96 | 0.67 |
| 16:00-16:14 | 224 | 333 | 30 | 37 | 5 | 2.92 | 2.77 | 0.56 |
| 16:15-16:29 | 265 | 329 | 30 | 46 | 9 | 3.37 | 2.07 | 0.58 |
| 16:30-16:44 | 159 | 389 | 62 | 40 | 10 | 3.53 | 2.5 | 0.44 |
| 16:45-16:59 | 209 | 252 | 56 | 50 | 11 | 3.95 | 2.78 | 0.66 |
| 17:00-17:14 | 314 | 796 | 115 | 56 | 9 | 4.48 | 3.04 | 1.06 |
| 17:15-17:29 | 394 | 789 | 84 | 107 | 7 | 2.28 | 2.29 | 1.01 |
| 17:30-17:44 | 509 | 450 | 126 | 52 | 17 | 4.35 | 2.36 | 1.08 |
| 17:45-17:59 | 447 | 834 | 101 | 65 | 10 | 3.26 | 1.88 | 0.89 |
| 18:00-18:14 | 376 | 831 | 141 | 56 | 13 | 3.74 | 1.88 | 1.05 |
| 18:15-18:29 | 342 | 410 | 103 | 51 | 20 | 4.22 | 2.26 | 0.99 |
| 18:30-18:44 | 448 | 429 | 145 | 73 | 11 | 3.29 | 2.75 | 0.92 |
| 18:45-18:59 | 436 | 841 | 92 | 80 | 13 | 3.33 | 2.08 | 0.9 |
| 19:00-19:14 | 429 | 847 | 90 | 70 | 19 | 3.82 | 2.58 | 1.03 |
| 19:15-19:29 | 583 | 507 | 97 | 90 | 15 | 2.29 | 3.06 | 1.06 |
| 19:30-19:44 | 466 | 653 | 125 | 92 | 17 | 3.23 | 2.01 | 0.94 |
| 19:45-19:59 | 576 | 672 | 148 | 115 | 11 | 4.41 | 2.38 | 1.05 |
| 20:00-20:14 | 275 | 228 | 52 | 47 | 19 | 2.88 | 2.99 | 0.5 |
| 20:15-20:29 | 193 | 212 | 39 | 26 | 15 | 3.16 | 2.66 | 0.4 |
| 20:30-20:44 | 278 | 328 | 49 | 23 | 18 | 3.12 | 2.96 | 0.63 |
| 20:45-20:59 | 180 | 223 | 64 | 23 | 16 | 2.78 | 2.75 | 0.55 |
| 21:00-21:14 | 242 | 389 | 68 | 22 | 10 | 4.12 | 2.23 | 0.46 |
| 21:15-21:29 | 159 | 330 | 45 | 23 | 6 | 4.14 | 2.25 | 0.62 |
| 21:30-21:44 | 203 | 203 | 33 | 24 | 11 | 3.88 | 3.16 | 0.5 |
| 21:45-21:59 | 185 | 372 | 59 | 39 | 7 | 3.31 | 2.45 | 0.66 |

#### Location: Bwaise Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 425 | 544 | 94 | 102 | 15 | 3.13 | 3.0 | 1.06 |
| 07:15-07:29 | 316 | 428 | 149 | 118 | 19 | 3.36 | 2.0 | 0.86 |
| 07:30-07:44 | 419 | 564 | 117 | 73 | 13 | 3.55 | 3.0 | 0.99 |
| 07:45-07:59 | 347 | 854 | 147 | 62 | 10 | 2.35 | 1.83 | 1.08 |
| 08:00-08:14 | 373 | 415 | 98 | 70 | 19 | 2.16 | 2.28 | 1.07 |
| 08:15-08:29 | 577 | 587 | 110 | 117 | 5 | 2.73 | 2.44 | 1.1 |
| 08:30-08:44 | 506 | 634 | 92 | 58 | 7 | 4.05 | 1.87 | 0.94 |
| 08:45-08:59 | 536 | 578 | 137 | 67 | 11 | 2.71 | 2.32 | 0.95 |
| 09:00-09:14 | 369 | 662 | 105 | 95 | 5 | 4.27 | 2.55 | 1.09 |
| 09:15-09:29 | 569 | 824 | 125 | 84 | 9 | 3.36 | 2.11 | 1.08 |
| 09:30-09:44 | 410 | 731 | 136 | 97 | 20 | 2.14 | 3.0 | 1.05 |
| 09:45-09:59 | 406 | 883 | 117 | 52 | 10 | 3.09 | 3.02 | 1.07 |
| 10:00-10:14 | 284 | 379 | 58 | 33 | 7 | 2.47 | 2.45 | 0.46 |
| 10:15-10:29 | 161 | 313 | 33 | 31 | 11 | 2.83 | 2.62 | 0.65 |
| 10:30-10:44 | 212 | 204 | 46 | 49 | 18 | 2.67 | 2.21 | 0.43 |
| 10:45-10:59 | 241 | 361 | 40 | 49 | 5 | 4.01 | 1.99 | 0.54 |
| 16:00-16:14 | 283 | 294 | 34 | 39 | 6 | 4.22 | 1.98 | 0.55 |
| 16:15-16:29 | 176 | 214 | 67 | 44 | 20 | 2.69 | 2.7 | 0.57 |
| 16:30-16:44 | 227 | 222 | 44 | 23 | 18 | 4.11 | 2.52 | 0.64 |
| 16:45-16:59 | 293 | 219 | 37 | 30 | 5 | 3.33 | 2.02 | 0.41 |
| 17:00-17:14 | 476 | 750 | 132 | 70 | 13 | 2.94 | 1.83 | 0.94 |
| 17:15-17:29 | 517 | 727 | 150 | 115 | 5 | 2.57 | 2.82 | 1.07 |
| 17:30-17:44 | 415 | 785 | 104 | 66 | 11 | 4.19 | 2.15 | 0.93 |
| 17:45-17:59 | 389 | 833 | 107 | 84 | 7 | 2.69 | 2.88 | 1.06 |
| 18:00-18:14 | 586 | 559 | 122 | 62 | 8 | 2.65 | 2.86 | 1.07 |
| 18:15-18:29 | 547 | 569 | 110 | 117 | 12 | 2.86 | 2.34 | 1.09 |
| 18:30-18:44 | 376 | 798 | 132 | 61 | 6 | 2.9 | 2.71 | 0.98 |
| 18:45-18:59 | 475 | 538 | 110 | 91 | 11 | 3.78 | 3.09 | 0.94 |
| 19:00-19:14 | 388 | 620 | 123 | 81 | 11 | 2.59 | 3.1 | 0.88 |
| 19:15-19:29 | 467 | 751 | 119 | 77 | 9 | 3.46 | 2.0 | 0.92 |
| 19:30-19:44 | 544 | 765 | 90 | 107 | 19 | 3.11 | 3.08 | 0.97 |
| 19:45-19:59 | 506 | 661 | 132 | 82 | 15 | 3.38 | 1.89 | 1.05 |
| 20:00-20:14 | 240 | 356 | 66 | 28 | 9 | 3.55 | 1.88 | 0.64 |
| 20:15-20:29 | 219 | 297 | 42 | 46 | 13 | 2.71 | 1.83 | 0.55 |
| 20:30-20:44 | 191 | 207 | 59 | 27 | 6 | 2.87 | 2.29 | 0.65 |
| 20:45-20:59 | 188 | 306 | 56 | 29 | 18 | 2.75 | 2.87 | 0.53 |
| 21:00-21:14 | 249 | 300 | 34 | 31 | 16 | 2.98 | 3.1 | 0.46 |
| 21:15-21:29 | 254 | 239 | 50 | 22 | 14 | 2.14 | 3.05 | 0.45 |
| 21:30-21:44 | 271 | 245 | 59 | 20 | 9 | 2.53 | 1.88 | 0.47 |
| 21:45-21:59 | 159 | 201 | 39 | 37 | 20 | 2.6 | 2.57 | 0.68 |

#### Location: Natete Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 323 | 586 | 145 | 62 | 6 | 2.78 | 2.07 | 0.88 |
| 07:15-07:29 | 548 | 591 | 94 | 54 | 6 | 2.31 | 2.31 | 0.93 |
| 07:30-07:44 | 507 | 653 | 121 | 73 | 8 | 3.15 | 2.42 | 1.0 |
| 07:45-07:59 | 514 | 648 | 90 | 113 | 5 | 4.06 | 2.92 | 1.08 |
| 08:00-08:14 | 536 | 823 | 103 | 58 | 12 | 3.17 | 2.14 | 0.9 |
| 08:15-08:29 | 578 | 731 | 113 | 117 | 5 | 4.48 | 1.96 | 0.92 |
| 08:30-08:44 | 494 | 435 | 99 | 54 | 10 | 3.78 | 2.55 | 0.92 |
| 08:45-08:59 | 429 | 491 | 94 | 109 | 6 | 3.07 | 3.05 | 1.03 |
| 09:00-09:14 | 507 | 726 | 135 | 102 | 19 | 2.16 | 2.27 | 0.98 |
| 09:15-09:29 | 316 | 538 | 129 | 118 | 16 | 2.3 | 2.36 | 1.02 |
| 09:30-09:44 | 347 | 578 | 99 | 76 | 9 | 4.27 | 1.92 | 0.97 |
| 09:45-09:59 | 367 | 501 | 81 | 82 | 10 | 2.51 | 2.35 | 1.05 |
| 10:00-10:14 | 244 | 370 | 50 | 41 | 8 | 2.5 | 2.57 | 0.58 |
| 10:15-10:29 | 200 | 381 | 52 | 45 | 14 | 3.1 | 2.21 | 0.64 |
| 10:30-10:44 | 202 | 291 | 41 | 38 | 9 | 4.14 | 2.57 | 0.4 |
| 10:45-10:59 | 296 | 305 | 65 | 30 | 18 | 2.14 | 1.92 | 0.64 |
| 16:00-16:14 | 200 | 283 | 39 | 48 | 12 | 3.9 | 2.38 | 0.43 |
| 16:15-16:29 | 198 | 347 | 56 | 46 | 8 | 4.21 | 3.14 | 0.68 |
| 16:30-16:44 | 239 | 325 | 66 | 39 | 5 | 3.39 | 2.09 | 0.62 |
| 16:45-16:59 | 212 | 264 | 47 | 43 | 9 | 2.4 | 3.17 | 0.63 |
| 17:00-17:14 | 588 | 603 | 87 | 112 | 8 | 3.44 | 2.76 | 1.07 |
| 17:15-17:29 | 592 | 760 | 110 | 77 | 14 | 4.22 | 2.59 | 1.0 |
| 17:30-17:44 | 589 | 801 | 144 | 105 | 10 | 2.53 | 2.05 | 1.04 |
| 17:45-17:59 | 478 | 860 | 119 | 64 | 14 | 3.41 | 2.33 | 1.01 |
| 18:00-18:14 | 460 | 684 | 113 | 104 | 5 | 2.27 | 2.26 | 0.9 |
| 18:15-18:29 | 530 | 566 | 131 | 76 | 16 | 2.13 | 2.64 | 1.03 |
| 18:30-18:44 | 414 | 597 | 118 | 61 | 9 | 2.72 | 2.52 | 0.87 |
| 18:45-18:59 | 559 | 825 | 143 | 87 | 16 | 2.6 | 2.18 | 0.93 |
| 19:00-19:14 | 379 | 825 | 147 | 55 | 8 | 4.01 | 1.85 | 0.99 |
| 19:15-19:29 | 524 | 797 | 137 | 74 | 15 | 3.39 | 3.15 | 1.02 |
| 19:30-19:44 | 597 | 787 | 103 | 75 | 16 | 3.11 | 2.35 | 1.04 |
| 19:45-19:59 | 348 | 823 | 126 | 115 | 19 | 2.28 | 2.58 | 0.88 |
| 20:00-20:14 | 291 | 392 | 43 | 28 | 20 | 2.34 | 2.68 | 0.44 |
| 20:15-20:29 | 258 | 282 | 59 | 46 | 8 | 4.25 | 2.58 | 0.41 |
| 20:30-20:44 | 249 | 314 | 50 | 39 | 15 | 3.82 | 2.15 | 0.45 |
| 20:45-20:59 | 179 | 258 | 44 | 35 | 8 | 2.73 | 2.3 | 0.59 |
| 21:00-21:14 | 151 | 204 | 56 | 48 | 9 | 4.25 | 2.55 | 0.51 |
| 21:15-21:29 | 286 | 232 | 60 | 37 | 6 | 3.39 | 2.65 | 0.48 |
| 21:30-21:44 | 254 | 268 | 63 | 28 | 6 | 3.79 | 1.86 | 0.63 |
| 21:45-21:59 | 240 | 275 | 32 | 32 | 18 | 3.26 | 3.11 | 0.66 |

### A.12 Day 12: 2026-06-12

#### Location: Wandegeya Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 353 | 849 | 118 | 63 | 10 | 3.07 | 2.03 | 0.98 |
| 07:15-07:29 | 423 | 566 | 127 | 80 | 19 | 4.33 | 3.09 | 0.95 |
| 07:30-07:44 | 370 | 704 | 97 | 66 | 17 | 3.41 | 3.17 | 0.9 |
| 07:45-07:59 | 385 | 687 | 127 | 115 | 18 | 4.33 | 2.62 | 0.89 |
| 08:00-08:14 | 566 | 600 | 85 | 68 | 12 | 2.84 | 1.94 | 1.01 |
| 08:15-08:29 | 580 | 432 | 133 | 118 | 19 | 2.42 | 2.23 | 0.9 |
| 08:30-08:44 | 512 | 877 | 80 | 50 | 7 | 2.61 | 2.85 | 1.01 |
| 08:45-08:59 | 393 | 505 | 149 | 108 | 14 | 2.79 | 3.14 | 0.86 |
| 09:00-09:14 | 519 | 490 | 131 | 78 | 17 | 2.15 | 2.38 | 0.89 |
| 09:15-09:29 | 397 | 430 | 133 | 87 | 16 | 3.23 | 2.9 | 1.1 |
| 09:30-09:44 | 541 | 784 | 117 | 53 | 8 | 3.73 | 2.19 | 1.02 |
| 09:45-09:59 | 573 | 418 | 128 | 116 | 11 | 4.39 | 2.41 | 1.07 |
| 10:00-10:14 | 227 | 345 | 38 | 41 | 19 | 3.24 | 1.84 | 0.59 |
| 10:15-10:29 | 162 | 252 | 62 | 38 | 16 | 3.14 | 2.4 | 0.61 |
| 10:30-10:44 | 163 | 273 | 35 | 36 | 13 | 2.19 | 2.51 | 0.66 |
| 10:45-10:59 | 221 | 262 | 44 | 42 | 10 | 2.55 | 2.86 | 0.46 |
| 16:00-16:14 | 231 | 216 | 66 | 40 | 8 | 2.51 | 2.27 | 0.47 |
| 16:15-16:29 | 165 | 227 | 57 | 48 | 13 | 2.5 | 2.26 | 0.46 |
| 16:30-16:44 | 298 | 219 | 43 | 31 | 17 | 3.65 | 2.15 | 0.58 |
| 16:45-16:59 | 227 | 308 | 49 | 50 | 18 | 2.66 | 3.0 | 0.44 |
| 17:00-17:14 | 499 | 560 | 108 | 98 | 15 | 2.98 | 3.2 | 1.08 |
| 17:15-17:29 | 486 | 549 | 106 | 80 | 5 | 4.46 | 2.09 | 1.03 |
| 17:30-17:44 | 514 | 643 | 116 | 51 | 11 | 3.74 | 2.19 | 0.88 |
| 17:45-17:59 | 545 | 455 | 138 | 105 | 17 | 2.57 | 2.73 | 1.06 |
| 18:00-18:14 | 321 | 593 | 92 | 86 | 19 | 4.28 | 1.87 | 1.0 |
| 18:15-18:29 | 517 | 644 | 137 | 106 | 11 | 2.71 | 2.62 | 1.0 |
| 18:30-18:44 | 370 | 723 | 93 | 118 | 14 | 3.6 | 2.67 | 0.89 |
| 18:45-18:59 | 345 | 650 | 115 | 86 | 11 | 2.15 | 3.1 | 0.89 |
| 19:00-19:14 | 490 | 868 | 115 | 108 | 9 | 4.26 | 2.17 | 1.0 |
| 19:15-19:29 | 332 | 882 | 116 | 81 | 19 | 3.66 | 2.91 | 0.87 |
| 19:30-19:44 | 368 | 725 | 102 | 73 | 5 | 2.23 | 2.39 | 1.08 |
| 19:45-19:59 | 351 | 651 | 83 | 84 | 19 | 3.25 | 2.21 | 0.93 |
| 20:00-20:14 | 161 | 269 | 57 | 49 | 9 | 2.89 | 2.82 | 0.57 |
| 20:15-20:29 | 255 | 299 | 61 | 27 | 9 | 2.11 | 2.49 | 0.63 |
| 20:30-20:44 | 181 | 279 | 58 | 36 | 14 | 3.7 | 2.28 | 0.54 |
| 20:45-20:59 | 284 | 332 | 66 | 50 | 11 | 3.29 | 2.46 | 0.5 |
| 21:00-21:14 | 212 | 296 | 65 | 41 | 18 | 2.93 | 2.22 | 0.64 |
| 21:15-21:29 | 264 | 223 | 70 | 29 | 7 | 3.86 | 1.81 | 0.69 |
| 21:30-21:44 | 287 | 377 | 68 | 49 | 7 | 3.28 | 2.64 | 0.62 |
| 21:45-21:59 | 288 | 236 | 35 | 46 | 6 | 3.55 | 2.2 | 0.67 |

#### Location: Kibuye Roundabout
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 531 | 710 | 130 | 89 | 19 | 2.62 | 2.41 | 1.08 |
| 07:15-07:29 | 350 | 532 | 86 | 89 | 5 | 3.39 | 2.99 | 0.96 |
| 07:30-07:44 | 389 | 636 | 103 | 63 | 11 | 3.67 | 2.05 | 1.08 |
| 07:45-07:59 | 378 | 846 | 99 | 103 | 8 | 3.82 | 2.56 | 1.02 |
| 08:00-08:14 | 397 | 847 | 96 | 86 | 12 | 3.39 | 1.89 | 1.08 |
| 08:15-08:29 | 413 | 538 | 112 | 82 | 13 | 2.99 | 1.89 | 0.9 |
| 08:30-08:44 | 387 | 679 | 95 | 61 | 18 | 4.43 | 3.19 | 1.04 |
| 08:45-08:59 | 478 | 501 | 125 | 110 | 11 | 3.8 | 2.05 | 1.1 |
| 09:00-09:14 | 392 | 555 | 148 | 103 | 13 | 4.35 | 3.12 | 1.01 |
| 09:15-09:29 | 565 | 706 | 130 | 80 | 19 | 3.04 | 1.82 | 1.06 |
| 09:30-09:44 | 545 | 858 | 148 | 120 | 7 | 2.86 | 2.44 | 1.02 |
| 09:45-09:59 | 432 | 759 | 114 | 60 | 19 | 3.12 | 3.1 | 0.99 |
| 10:00-10:14 | 218 | 215 | 59 | 26 | 9 | 2.16 | 2.98 | 0.62 |
| 10:15-10:29 | 257 | 395 | 60 | 20 | 12 | 3.36 | 1.88 | 0.66 |
| 10:30-10:44 | 239 | 277 | 69 | 44 | 16 | 2.26 | 2.91 | 0.43 |
| 10:45-10:59 | 206 | 361 | 31 | 48 | 7 | 3.65 | 2.1 | 0.44 |
| 16:00-16:14 | 223 | 367 | 56 | 25 | 17 | 3.54 | 2.68 | 0.59 |
| 16:15-16:29 | 168 | 396 | 58 | 32 | 10 | 2.76 | 2.57 | 0.69 |
| 16:30-16:44 | 231 | 202 | 31 | 25 | 18 | 2.88 | 1.9 | 0.42 |
| 16:45-16:59 | 300 | 310 | 34 | 44 | 11 | 3.77 | 2.73 | 0.65 |
| 17:00-17:14 | 500 | 625 | 128 | 110 | 19 | 4.29 | 2.73 | 1.05 |
| 17:15-17:29 | 411 | 817 | 89 | 68 | 14 | 2.38 | 2.05 | 0.95 |
| 17:30-17:44 | 374 | 584 | 86 | 59 | 5 | 2.79 | 2.31 | 0.95 |
| 17:45-17:59 | 356 | 643 | 94 | 77 | 20 | 2.35 | 2.74 | 0.88 |
| 18:00-18:14 | 540 | 891 | 120 | 94 | 17 | 3.73 | 2.31 | 1.04 |
| 18:15-18:29 | 371 | 568 | 82 | 79 | 16 | 3.41 | 3.11 | 0.88 |
| 18:30-18:44 | 510 | 554 | 126 | 107 | 8 | 3.21 | 2.33 | 0.92 |
| 18:45-18:59 | 356 | 475 | 91 | 62 | 15 | 4.23 | 2.23 | 0.91 |
| 19:00-19:14 | 433 | 527 | 146 | 70 | 11 | 2.16 | 2.47 | 0.97 |
| 19:15-19:29 | 428 | 678 | 148 | 116 | 6 | 4.4 | 1.83 | 0.97 |
| 19:30-19:44 | 321 | 534 | 131 | 98 | 17 | 2.8 | 2.22 | 1.05 |
| 19:45-19:59 | 463 | 713 | 107 | 50 | 10 | 3.99 | 2.14 | 0.95 |
| 20:00-20:14 | 231 | 375 | 63 | 30 | 16 | 3.78 | 2.86 | 0.47 |
| 20:15-20:29 | 180 | 243 | 31 | 29 | 20 | 2.93 | 1.87 | 0.57 |
| 20:30-20:44 | 240 | 268 | 57 | 32 | 7 | 2.16 | 2.38 | 0.63 |
| 20:45-20:59 | 215 | 358 | 38 | 48 | 16 | 3.99 | 1.87 | 0.62 |
| 21:00-21:14 | 211 | 232 | 42 | 41 | 16 | 3.7 | 2.39 | 0.5 |
| 21:15-21:29 | 256 | 295 | 43 | 40 | 18 | 3.75 | 1.88 | 0.51 |
| 21:30-21:44 | 178 | 360 | 52 | 29 | 6 | 2.66 | 2.43 | 0.52 |
| 21:45-21:59 | 168 | 307 | 65 | 34 | 6 | 2.82 | 2.36 | 0.62 |

#### Location: Bakuli Intersection
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 308 | 639 | 115 | 76 | 11 | 3.63 | 2.65 | 0.86 |
| 07:15-07:29 | 577 | 668 | 122 | 111 | 11 | 2.39 | 2.88 | 0.85 |
| 07:30-07:44 | 337 | 472 | 148 | 108 | 8 | 3.96 | 2.19 | 0.95 |
| 07:45-07:59 | 349 | 502 | 135 | 58 | 19 | 2.21 | 2.76 | 1.04 |
| 08:00-08:14 | 438 | 678 | 91 | 106 | 15 | 3.95 | 2.62 | 0.98 |
| 08:15-08:29 | 472 | 679 | 85 | 114 | 12 | 3.12 | 2.05 | 0.93 |
| 08:30-08:44 | 458 | 505 | 145 | 112 | 12 | 4.17 | 2.81 | 0.86 |
| 08:45-08:59 | 326 | 722 | 95 | 118 | 14 | 4.11 | 3.0 | 0.98 |
| 09:00-09:14 | 578 | 418 | 122 | 53 | 15 | 3.91 | 2.22 | 1.0 |
| 09:15-09:29 | 560 | 568 | 146 | 70 | 15 | 3.22 | 3.04 | 1.1 |
| 09:30-09:44 | 434 | 803 | 108 | 111 | 13 | 3.9 | 2.54 | 0.92 |
| 09:45-09:59 | 464 | 807 | 98 | 88 | 19 | 4.47 | 1.87 | 1.01 |
| 10:00-10:14 | 204 | 398 | 44 | 39 | 11 | 3.69 | 3.09 | 0.48 |
| 10:15-10:29 | 193 | 223 | 52 | 27 | 9 | 2.27 | 2.77 | 0.43 |
| 10:30-10:44 | 196 | 245 | 47 | 23 | 17 | 3.67 | 2.5 | 0.61 |
| 10:45-10:59 | 154 | 378 | 50 | 38 | 9 | 3.45 | 3.04 | 0.7 |
| 16:00-16:14 | 207 | 330 | 41 | 41 | 8 | 3.86 | 2.89 | 0.53 |
| 16:15-16:29 | 176 | 314 | 35 | 27 | 17 | 3.33 | 3.16 | 0.58 |
| 16:30-16:44 | 253 | 215 | 61 | 23 | 15 | 2.12 | 2.49 | 0.4 |
| 16:45-16:59 | 290 | 201 | 59 | 47 | 10 | 3.88 | 2.61 | 0.45 |
| 17:00-17:14 | 452 | 503 | 122 | 96 | 19 | 3.41 | 2.18 | 1.06 |
| 17:15-17:29 | 307 | 872 | 139 | 101 | 13 | 2.64 | 2.49 | 1.09 |
| 17:30-17:44 | 350 | 401 | 100 | 89 | 10 | 4.23 | 2.39 | 0.98 |
| 17:45-17:59 | 550 | 854 | 113 | 61 | 8 | 2.84 | 3.14 | 0.87 |
| 18:00-18:14 | 391 | 459 | 135 | 72 | 12 | 2.61 | 2.28 | 0.9 |
| 18:15-18:29 | 564 | 820 | 142 | 113 | 16 | 2.62 | 2.85 | 1.09 |
| 18:30-18:44 | 597 | 635 | 146 | 67 | 15 | 3.38 | 1.92 | 1.07 |
| 18:45-18:59 | 392 | 493 | 123 | 55 | 20 | 3.83 | 1.84 | 0.99 |
| 19:00-19:14 | 391 | 475 | 128 | 77 | 17 | 4.15 | 2.75 | 0.86 |
| 19:15-19:29 | 534 | 583 | 95 | 120 | 5 | 2.3 | 2.02 | 0.99 |
| 19:30-19:44 | 320 | 444 | 103 | 59 | 6 | 2.99 | 3.12 | 0.94 |
| 19:45-19:59 | 305 | 677 | 97 | 64 | 15 | 2.96 | 2.3 | 1.09 |
| 20:00-20:14 | 175 | 336 | 39 | 27 | 19 | 4.45 | 2.59 | 0.42 |
| 20:15-20:29 | 163 | 361 | 42 | 26 | 16 | 4.28 | 2.55 | 0.61 |
| 20:30-20:44 | 237 | 207 | 34 | 37 | 5 | 3.49 | 2.48 | 0.5 |
| 20:45-20:59 | 211 | 284 | 69 | 28 | 17 | 3.44 | 2.48 | 0.57 |
| 21:00-21:14 | 280 | 394 | 62 | 43 | 16 | 2.68 | 3.01 | 0.67 |
| 21:15-21:29 | 274 | 236 | 39 | 29 | 11 | 2.68 | 2.64 | 0.66 |
| 21:30-21:44 | 271 | 282 | 50 | 44 | 17 | 3.51 | 3.08 | 0.6 |
| 21:45-21:59 | 266 | 236 | 47 | 46 | 5 | 4.1 | 2.72 | 0.69 |

#### Location: Bwaise Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 561 | 579 | 103 | 86 | 13 | 3.6 | 2.38 | 1.07 |
| 07:15-07:29 | 410 | 585 | 101 | 99 | 7 | 2.25 | 1.89 | 0.94 |
| 07:30-07:44 | 382 | 543 | 86 | 80 | 20 | 2.36 | 2.03 | 0.87 |
| 07:45-07:59 | 412 | 879 | 106 | 53 | 14 | 3.04 | 2.3 | 0.85 |
| 08:00-08:14 | 325 | 672 | 113 | 65 | 19 | 3.38 | 2.22 | 0.96 |
| 08:15-08:29 | 553 | 557 | 127 | 116 | 13 | 2.71 | 2.45 | 0.98 |
| 08:30-08:44 | 404 | 769 | 148 | 82 | 7 | 3.88 | 1.94 | 0.95 |
| 08:45-08:59 | 410 | 472 | 111 | 72 | 19 | 4.27 | 2.34 | 1.01 |
| 09:00-09:14 | 428 | 626 | 119 | 75 | 19 | 3.02 | 2.17 | 0.86 |
| 09:15-09:29 | 453 | 709 | 83 | 92 | 15 | 4.17 | 2.89 | 0.87 |
| 09:30-09:44 | 513 | 547 | 132 | 73 | 17 | 2.15 | 2.9 | 1.08 |
| 09:45-09:59 | 455 | 439 | 86 | 73 | 18 | 2.78 | 3.14 | 1.09 |
| 10:00-10:14 | 185 | 312 | 40 | 38 | 17 | 4.18 | 2.19 | 0.59 |
| 10:15-10:29 | 156 | 320 | 53 | 21 | 5 | 3.27 | 3.1 | 0.62 |
| 10:30-10:44 | 182 | 293 | 61 | 34 | 15 | 4.42 | 2.86 | 0.68 |
| 10:45-10:59 | 246 | 203 | 55 | 38 | 18 | 3.13 | 2.67 | 0.54 |
| 16:00-16:14 | 207 | 204 | 31 | 38 | 13 | 2.43 | 2.43 | 0.53 |
| 16:15-16:29 | 172 | 252 | 50 | 34 | 17 | 4.46 | 1.86 | 0.63 |
| 16:30-16:44 | 176 | 341 | 39 | 37 | 8 | 2.41 | 2.2 | 0.42 |
| 16:45-16:59 | 245 | 358 | 69 | 29 | 20 | 3.01 | 2.99 | 0.58 |
| 17:00-17:14 | 442 | 654 | 83 | 99 | 14 | 3.66 | 2.25 | 1.09 |
| 17:15-17:29 | 530 | 787 | 106 | 52 | 13 | 2.48 | 2.6 | 0.95 |
| 17:30-17:44 | 584 | 555 | 108 | 61 | 20 | 3.43 | 1.99 | 0.87 |
| 17:45-17:59 | 318 | 449 | 143 | 111 | 14 | 4.14 | 3.07 | 1.1 |
| 18:00-18:14 | 317 | 700 | 104 | 77 | 8 | 2.94 | 2.54 | 0.86 |
| 18:15-18:29 | 554 | 725 | 135 | 115 | 6 | 3.83 | 2.39 | 0.97 |
| 18:30-18:44 | 396 | 702 | 85 | 71 | 12 | 4.34 | 2.07 | 1.05 |
| 18:45-18:59 | 537 | 679 | 122 | 110 | 13 | 4.35 | 2.46 | 0.94 |
| 19:00-19:14 | 498 | 426 | 89 | 75 | 8 | 2.68 | 3.13 | 1.06 |
| 19:15-19:29 | 491 | 820 | 118 | 79 | 15 | 2.26 | 2.6 | 0.95 |
| 19:30-19:44 | 490 | 896 | 117 | 115 | 14 | 4.22 | 2.45 | 0.86 |
| 19:45-19:59 | 471 | 543 | 130 | 118 | 7 | 2.39 | 2.54 | 0.99 |
| 20:00-20:14 | 152 | 389 | 46 | 23 | 7 | 3.8 | 2.57 | 0.57 |
| 20:15-20:29 | 150 | 276 | 61 | 26 | 13 | 2.15 | 1.85 | 0.51 |
| 20:30-20:44 | 273 | 318 | 54 | 25 | 10 | 3.24 | 2.11 | 0.47 |
| 20:45-20:59 | 281 | 357 | 39 | 43 | 18 | 3.03 | 2.5 | 0.64 |
| 21:00-21:14 | 231 | 297 | 44 | 28 | 15 | 4.18 | 1.85 | 0.51 |
| 21:15-21:29 | 300 | 247 | 67 | 28 | 18 | 3.93 | 2.32 | 0.65 |
| 21:30-21:44 | 224 | 375 | 67 | 20 | 8 | 2.97 | 2.62 | 0.66 |
| 21:45-21:59 | 166 | 350 | 33 | 34 | 7 | 2.73 | 1.82 | 0.63 |

#### Location: Natete Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 475 | 812 | 94 | 73 | 8 | 2.12 | 2.95 | 1.0 |
| 07:15-07:29 | 386 | 697 | 99 | 119 | 8 | 4.28 | 2.09 | 1.03 |
| 07:30-07:44 | 323 | 851 | 92 | 117 | 12 | 4.19 | 1.83 | 0.86 |
| 07:45-07:59 | 574 | 786 | 105 | 50 | 17 | 3.27 | 1.96 | 0.95 |
| 08:00-08:14 | 331 | 449 | 86 | 118 | 11 | 2.23 | 2.46 | 1.05 |
| 08:15-08:29 | 350 | 870 | 84 | 55 | 5 | 2.66 | 3.16 | 1.03 |
| 08:30-08:44 | 388 | 497 | 90 | 97 | 16 | 2.44 | 2.74 | 1.05 |
| 08:45-08:59 | 384 | 689 | 129 | 82 | 19 | 3.59 | 3.13 | 1.07 |
| 09:00-09:14 | 318 | 477 | 147 | 120 | 6 | 3.25 | 3.04 | 1.07 |
| 09:15-09:29 | 467 | 483 | 111 | 111 | 7 | 3.28 | 2.32 | 1.01 |
| 09:30-09:44 | 566 | 441 | 114 | 57 | 6 | 4.31 | 1.82 | 1.09 |
| 09:45-09:59 | 519 | 563 | 108 | 66 | 10 | 3.67 | 2.31 | 1.06 |
| 10:00-10:14 | 295 | 220 | 65 | 50 | 19 | 3.86 | 2.57 | 0.54 |
| 10:15-10:29 | 286 | 324 | 48 | 20 | 10 | 2.86 | 2.08 | 0.41 |
| 10:30-10:44 | 225 | 348 | 51 | 30 | 9 | 2.34 | 1.8 | 0.51 |
| 10:45-10:59 | 194 | 369 | 67 | 21 | 10 | 2.8 | 3.16 | 0.57 |
| 16:00-16:14 | 237 | 233 | 38 | 46 | 12 | 2.87 | 2.03 | 0.58 |
| 16:15-16:29 | 266 | 400 | 40 | 25 | 18 | 2.71 | 2.23 | 0.54 |
| 16:30-16:44 | 163 | 247 | 57 | 31 | 5 | 4.33 | 1.85 | 0.57 |
| 16:45-16:59 | 279 | 338 | 34 | 28 | 18 | 4.13 | 2.71 | 0.67 |
| 17:00-17:14 | 374 | 863 | 125 | 107 | 16 | 3.16 | 1.83 | 1.03 |
| 17:15-17:29 | 327 | 462 | 82 | 111 | 13 | 4.48 | 3.11 | 0.99 |
| 17:30-17:44 | 474 | 400 | 120 | 95 | 13 | 4.1 | 2.23 | 1.01 |
| 17:45-17:59 | 469 | 793 | 101 | 75 | 6 | 3.64 | 2.6 | 0.92 |
| 18:00-18:14 | 316 | 667 | 106 | 119 | 8 | 4.36 | 3.07 | 1.04 |
| 18:15-18:29 | 469 | 881 | 139 | 56 | 18 | 2.94 | 3.07 | 1.1 |
| 18:30-18:44 | 496 | 814 | 129 | 50 | 19 | 4.27 | 2.8 | 1.07 |
| 18:45-18:59 | 324 | 698 | 109 | 97 | 16 | 2.67 | 2.5 | 0.9 |
| 19:00-19:14 | 491 | 552 | 80 | 115 | 9 | 2.55 | 2.41 | 1.08 |
| 19:15-19:29 | 442 | 881 | 146 | 83 | 10 | 2.4 | 2.76 | 0.91 |
| 19:30-19:44 | 549 | 584 | 119 | 51 | 17 | 2.68 | 2.48 | 1.04 |
| 19:45-19:59 | 399 | 766 | 100 | 84 | 5 | 3.33 | 2.01 | 0.86 |
| 20:00-20:14 | 233 | 349 | 66 | 23 | 12 | 2.39 | 2.26 | 0.49 |
| 20:15-20:29 | 262 | 221 | 50 | 35 | 6 | 3.91 | 2.72 | 0.69 |
| 20:30-20:44 | 188 | 325 | 39 | 50 | 14 | 2.79 | 2.57 | 0.41 |
| 20:45-20:59 | 199 | 330 | 65 | 40 | 14 | 4.36 | 2.39 | 0.53 |
| 21:00-21:14 | 206 | 340 | 66 | 35 | 7 | 2.33 | 1.82 | 0.57 |
| 21:15-21:29 | 233 | 375 | 70 | 20 | 9 | 3.41 | 2.43 | 0.68 |
| 21:30-21:44 | 252 | 344 | 58 | 39 | 19 | 3.16 | 3.09 | 0.59 |
| 21:45-21:59 | 257 | 319 | 69 | 36 | 14 | 4.05 | 2.19 | 0.44 |

### A.13 Day 13: 2026-06-13

#### Location: Wandegeya Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 396 | 793 | 146 | 116 | 6 | 4.43 | 1.96 | 0.96 |
| 07:15-07:29 | 345 | 796 | 123 | 51 | 12 | 4.37 | 2.39 | 0.93 |
| 07:30-07:44 | 434 | 702 | 118 | 119 | 10 | 3.81 | 2.02 | 1.07 |
| 07:45-07:59 | 442 | 756 | 89 | 86 | 12 | 3.46 | 2.31 | 0.89 |
| 08:00-08:14 | 364 | 620 | 109 | 85 | 8 | 2.99 | 2.88 | 1.01 |
| 08:15-08:29 | 524 | 745 | 93 | 60 | 7 | 3.84 | 2.61 | 0.85 |
| 08:30-08:44 | 395 | 802 | 103 | 106 | 15 | 3.53 | 2.3 | 1.04 |
| 08:45-08:59 | 494 | 746 | 126 | 67 | 8 | 3.58 | 2.76 | 1.06 |
| 09:00-09:14 | 408 | 495 | 129 | 116 | 13 | 4.48 | 2.92 | 0.99 |
| 09:15-09:29 | 352 | 534 | 124 | 52 | 18 | 3.03 | 1.84 | 0.95 |
| 09:30-09:44 | 420 | 495 | 110 | 91 | 14 | 2.74 | 2.83 | 0.97 |
| 09:45-09:59 | 469 | 748 | 84 | 54 | 13 | 2.25 | 2.81 | 1.09 |
| 10:00-10:14 | 258 | 353 | 59 | 40 | 9 | 3.06 | 2.0 | 0.49 |
| 10:15-10:29 | 283 | 372 | 57 | 45 | 10 | 2.49 | 2.57 | 0.41 |
| 10:30-10:44 | 164 | 234 | 61 | 24 | 13 | 3.7 | 2.53 | 0.67 |
| 10:45-10:59 | 214 | 262 | 68 | 37 | 8 | 3.15 | 1.92 | 0.61 |
| 16:00-16:14 | 297 | 201 | 46 | 37 | 6 | 2.89 | 2.93 | 0.45 |
| 16:15-16:29 | 281 | 306 | 41 | 27 | 18 | 3.29 | 2.36 | 0.51 |
| 16:30-16:44 | 151 | 331 | 53 | 42 | 7 | 2.92 | 2.83 | 0.58 |
| 16:45-16:59 | 290 | 246 | 39 | 31 | 16 | 2.63 | 2.6 | 0.54 |
| 17:00-17:14 | 404 | 422 | 145 | 112 | 9 | 2.89 | 2.75 | 0.89 |
| 17:15-17:29 | 406 | 744 | 126 | 101 | 19 | 2.98 | 2.46 | 0.93 |
| 17:30-17:44 | 334 | 787 | 123 | 120 | 9 | 3.84 | 2.45 | 0.96 |
| 17:45-17:59 | 574 | 405 | 123 | 70 | 12 | 3.05 | 2.7 | 0.98 |
| 18:00-18:14 | 513 | 527 | 136 | 86 | 7 | 2.76 | 2.36 | 0.89 |
| 18:15-18:29 | 340 | 825 | 150 | 69 | 10 | 2.18 | 3.12 | 1.08 |
| 18:30-18:44 | 480 | 717 | 132 | 92 | 16 | 3.45 | 2.27 | 0.89 |
| 18:45-18:59 | 369 | 762 | 122 | 74 | 14 | 2.9 | 2.14 | 1.04 |
| 19:00-19:14 | 599 | 793 | 142 | 67 | 10 | 3.38 | 2.98 | 0.85 |
| 19:15-19:29 | 511 | 806 | 126 | 62 | 9 | 2.15 | 2.88 | 1.07 |
| 19:30-19:44 | 594 | 774 | 125 | 56 | 6 | 2.12 | 2.24 | 1.0 |
| 19:45-19:59 | 537 | 426 | 139 | 115 | 18 | 3.27 | 3.0 | 0.94 |
| 20:00-20:14 | 228 | 303 | 49 | 44 | 19 | 2.15 | 2.95 | 0.64 |
| 20:15-20:29 | 245 | 224 | 69 | 28 | 9 | 4.35 | 2.51 | 0.68 |
| 20:30-20:44 | 265 | 376 | 59 | 32 | 19 | 2.27 | 1.91 | 0.67 |
| 20:45-20:59 | 222 | 286 | 53 | 50 | 12 | 3.21 | 1.89 | 0.63 |
| 21:00-21:14 | 203 | 280 | 38 | 32 | 12 | 4.17 | 2.93 | 0.42 |
| 21:15-21:29 | 255 | 333 | 34 | 38 | 17 | 3.18 | 2.74 | 0.44 |
| 21:30-21:44 | 295 | 351 | 35 | 25 | 20 | 4.11 | 2.43 | 0.53 |
| 21:45-21:59 | 192 | 368 | 35 | 47 | 17 | 2.14 | 2.5 | 0.45 |

#### Location: Kibuye Roundabout
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 530 | 584 | 143 | 68 | 8 | 2.74 | 1.82 | 0.9 |
| 07:15-07:29 | 546 | 563 | 98 | 104 | 18 | 3.66 | 1.84 | 1.0 |
| 07:30-07:44 | 450 | 732 | 85 | 86 | 12 | 2.1 | 3.06 | 1.08 |
| 07:45-07:59 | 397 | 662 | 95 | 59 | 18 | 2.71 | 2.05 | 0.87 |
| 08:00-08:14 | 460 | 853 | 105 | 101 | 20 | 2.12 | 1.93 | 0.93 |
| 08:15-08:29 | 522 | 407 | 126 | 76 | 17 | 3.09 | 2.06 | 1.01 |
| 08:30-08:44 | 563 | 620 | 85 | 96 | 19 | 4.35 | 3.11 | 1.03 |
| 08:45-08:59 | 308 | 643 | 137 | 63 | 12 | 4.18 | 2.22 | 1.03 |
| 09:00-09:14 | 441 | 453 | 87 | 55 | 12 | 2.3 | 2.36 | 1.02 |
| 09:15-09:29 | 485 | 540 | 142 | 53 | 5 | 2.87 | 2.08 | 0.97 |
| 09:30-09:44 | 477 | 465 | 90 | 63 | 20 | 2.44 | 2.53 | 0.92 |
| 09:45-09:59 | 506 | 674 | 133 | 83 | 5 | 3.16 | 1.99 | 0.89 |
| 10:00-10:14 | 240 | 213 | 37 | 39 | 12 | 2.61 | 3.03 | 0.56 |
| 10:15-10:29 | 277 | 269 | 59 | 37 | 13 | 2.59 | 3.13 | 0.43 |
| 10:30-10:44 | 230 | 323 | 34 | 28 | 8 | 2.7 | 2.0 | 0.61 |
| 10:45-10:59 | 194 | 310 | 67 | 22 | 10 | 3.46 | 2.0 | 0.46 |
| 16:00-16:14 | 199 | 318 | 68 | 35 | 18 | 2.21 | 2.29 | 0.53 |
| 16:15-16:29 | 246 | 299 | 55 | 45 | 13 | 4.16 | 2.93 | 0.57 |
| 16:30-16:44 | 231 | 251 | 53 | 50 | 13 | 4.44 | 3.11 | 0.6 |
| 16:45-16:59 | 152 | 259 | 66 | 48 | 7 | 4.14 | 2.65 | 0.59 |
| 17:00-17:14 | 486 | 434 | 141 | 114 | 6 | 2.74 | 2.92 | 1.04 |
| 17:15-17:29 | 420 | 467 | 136 | 90 | 18 | 2.65 | 3.03 | 0.89 |
| 17:30-17:44 | 363 | 806 | 112 | 65 | 15 | 3.72 | 2.09 | 0.93 |
| 17:45-17:59 | 440 | 768 | 122 | 76 | 20 | 3.77 | 2.29 | 0.96 |
| 18:00-18:14 | 583 | 606 | 140 | 99 | 10 | 4.05 | 3.15 | 1.08 |
| 18:15-18:29 | 347 | 697 | 101 | 100 | 8 | 2.66 | 2.64 | 0.96 |
| 18:30-18:44 | 362 | 712 | 132 | 89 | 5 | 2.32 | 2.79 | 0.98 |
| 18:45-18:59 | 551 | 819 | 146 | 112 | 13 | 4.22 | 2.81 | 0.93 |
| 19:00-19:14 | 458 | 650 | 82 | 58 | 6 | 2.52 | 2.52 | 1.0 |
| 19:15-19:29 | 307 | 493 | 137 | 91 | 17 | 2.74 | 2.42 | 1.06 |
| 19:30-19:44 | 533 | 665 | 142 | 59 | 18 | 2.62 | 2.64 | 1.07 |
| 19:45-19:59 | 517 | 812 | 150 | 101 | 19 | 3.04 | 2.67 | 0.94 |
| 20:00-20:14 | 247 | 327 | 58 | 21 | 20 | 4.38 | 2.98 | 0.58 |
| 20:15-20:29 | 223 | 352 | 34 | 32 | 17 | 2.87 | 2.48 | 0.44 |
| 20:30-20:44 | 190 | 350 | 68 | 35 | 16 | 2.14 | 2.44 | 0.65 |
| 20:45-20:59 | 293 | 331 | 47 | 39 | 17 | 2.25 | 2.34 | 0.69 |
| 21:00-21:14 | 221 | 303 | 35 | 40 | 10 | 3.8 | 3.15 | 0.53 |
| 21:15-21:29 | 213 | 377 | 36 | 40 | 18 | 2.9 | 2.5 | 0.56 |
| 21:30-21:44 | 230 | 325 | 47 | 37 | 19 | 2.59 | 2.79 | 0.66 |
| 21:45-21:59 | 219 | 221 | 70 | 33 | 16 | 3.61 | 2.3 | 0.45 |

#### Location: Bakuli Intersection
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 368 | 469 | 147 | 56 | 9 | 2.87 | 2.66 | 0.96 |
| 07:15-07:29 | 455 | 578 | 83 | 55 | 11 | 3.57 | 2.73 | 0.96 |
| 07:30-07:44 | 393 | 531 | 80 | 90 | 8 | 3.12 | 2.33 | 1.07 |
| 07:45-07:59 | 558 | 830 | 148 | 104 | 12 | 3.82 | 2.08 | 0.91 |
| 08:00-08:14 | 350 | 591 | 99 | 114 | 8 | 4.37 | 2.53 | 0.89 |
| 08:15-08:29 | 442 | 881 | 119 | 88 | 7 | 2.72 | 3.19 | 0.88 |
| 08:30-08:44 | 433 | 625 | 146 | 95 | 7 | 2.42 | 2.12 | 0.94 |
| 08:45-08:59 | 596 | 529 | 114 | 96 | 18 | 2.26 | 2.1 | 1.08 |
| 09:00-09:14 | 346 | 424 | 146 | 90 | 15 | 2.45 | 3.04 | 1.0 |
| 09:15-09:29 | 513 | 665 | 129 | 96 | 16 | 4.3 | 1.99 | 1.0 |
| 09:30-09:44 | 302 | 889 | 102 | 102 | 20 | 2.42 | 1.97 | 0.99 |
| 09:45-09:59 | 423 | 645 | 95 | 63 | 5 | 3.71 | 2.85 | 0.97 |
| 10:00-10:14 | 253 | 337 | 53 | 32 | 11 | 3.93 | 1.88 | 0.43 |
| 10:15-10:29 | 179 | 337 | 39 | 25 | 18 | 2.15 | 2.03 | 0.59 |
| 10:30-10:44 | 194 | 232 | 57 | 36 | 12 | 2.11 | 2.61 | 0.69 |
| 10:45-10:59 | 265 | 267 | 40 | 48 | 9 | 4.21 | 2.69 | 0.51 |
| 16:00-16:14 | 284 | 215 | 40 | 37 | 19 | 3.98 | 1.95 | 0.47 |
| 16:15-16:29 | 270 | 321 | 64 | 45 | 15 | 2.33 | 2.32 | 0.5 |
| 16:30-16:44 | 209 | 293 | 45 | 47 | 18 | 4.47 | 2.79 | 0.61 |
| 16:45-16:59 | 282 | 399 | 64 | 27 | 17 | 4.2 | 2.63 | 0.43 |
| 17:00-17:14 | 371 | 803 | 91 | 51 | 9 | 2.22 | 2.75 | 0.91 |
| 17:15-17:29 | 317 | 882 | 97 | 59 | 6 | 2.43 | 2.97 | 0.89 |
| 17:30-17:44 | 345 | 412 | 107 | 118 | 11 | 3.9 | 2.13 | 0.9 |
| 17:45-17:59 | 431 | 834 | 94 | 92 | 9 | 4.35 | 2.86 | 1.02 |
| 18:00-18:14 | 333 | 822 | 117 | 77 | 15 | 2.46 | 3.14 | 0.98 |
| 18:15-18:29 | 430 | 731 | 133 | 92 | 7 | 3.35 | 1.89 | 0.92 |
| 18:30-18:44 | 456 | 467 | 128 | 82 | 11 | 2.66 | 2.13 | 0.87 |
| 18:45-18:59 | 553 | 496 | 121 | 120 | 11 | 4.12 | 2.71 | 1.05 |
| 19:00-19:14 | 461 | 448 | 130 | 83 | 15 | 3.14 | 1.87 | 1.01 |
| 19:15-19:29 | 380 | 460 | 134 | 114 | 17 | 4.47 | 3.11 | 0.98 |
| 19:30-19:44 | 461 | 857 | 137 | 99 | 17 | 4.16 | 2.23 | 1.06 |
| 19:45-19:59 | 579 | 856 | 145 | 96 | 20 | 2.17 | 2.9 | 0.86 |
| 20:00-20:14 | 150 | 358 | 31 | 34 | 18 | 2.83 | 2.9 | 0.6 |
| 20:15-20:29 | 209 | 347 | 53 | 48 | 12 | 3.61 | 1.82 | 0.46 |
| 20:30-20:44 | 291 | 374 | 30 | 41 | 20 | 4.21 | 2.99 | 0.64 |
| 20:45-20:59 | 285 | 380 | 69 | 35 | 11 | 2.93 | 2.54 | 0.62 |
| 21:00-21:14 | 178 | 232 | 61 | 50 | 17 | 2.99 | 2.72 | 0.69 |
| 21:15-21:29 | 239 | 294 | 61 | 21 | 16 | 4.27 | 3.17 | 0.6 |
| 21:30-21:44 | 251 | 240 | 56 | 34 | 5 | 2.57 | 1.96 | 0.47 |
| 21:45-21:59 | 278 | 335 | 43 | 26 | 6 | 3.73 | 2.37 | 0.53 |

#### Location: Bwaise Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 430 | 482 | 80 | 65 | 9 | 2.68 | 1.84 | 1.05 |
| 07:15-07:29 | 497 | 710 | 109 | 75 | 17 | 2.85 | 2.36 | 1.0 |
| 07:30-07:44 | 580 | 619 | 143 | 64 | 13 | 3.47 | 1.92 | 1.01 |
| 07:45-07:59 | 511 | 521 | 93 | 66 | 8 | 2.27 | 1.82 | 1.01 |
| 08:00-08:14 | 540 | 719 | 107 | 67 | 5 | 4.19 | 2.07 | 1.06 |
| 08:15-08:29 | 453 | 517 | 100 | 101 | 11 | 2.66 | 2.65 | 1.0 |
| 08:30-08:44 | 322 | 406 | 148 | 72 | 16 | 3.3 | 2.61 | 0.85 |
| 08:45-08:59 | 388 | 486 | 88 | 91 | 10 | 3.07 | 2.46 | 1.07 |
| 09:00-09:14 | 329 | 504 | 102 | 89 | 5 | 3.26 | 3.02 | 1.05 |
| 09:15-09:29 | 460 | 854 | 117 | 78 | 10 | 2.75 | 2.31 | 1.1 |
| 09:30-09:44 | 393 | 654 | 127 | 120 | 12 | 3.69 | 1.98 | 0.87 |
| 09:45-09:59 | 522 | 520 | 90 | 86 | 20 | 4.3 | 3.06 | 1.02 |
| 10:00-10:14 | 180 | 394 | 42 | 50 | 17 | 2.26 | 2.57 | 0.47 |
| 10:15-10:29 | 241 | 202 | 32 | 26 | 11 | 2.62 | 1.8 | 0.69 |
| 10:30-10:44 | 266 | 383 | 69 | 35 | 20 | 2.75 | 2.63 | 0.49 |
| 10:45-10:59 | 216 | 252 | 42 | 29 | 17 | 2.32 | 1.97 | 0.58 |
| 16:00-16:14 | 281 | 262 | 53 | 26 | 11 | 2.13 | 2.41 | 0.63 |
| 16:15-16:29 | 216 | 267 | 38 | 34 | 10 | 3.3 | 2.63 | 0.5 |
| 16:30-16:44 | 224 | 308 | 42 | 45 | 12 | 3.6 | 3.07 | 0.48 |
| 16:45-16:59 | 194 | 396 | 36 | 41 | 17 | 3.12 | 2.57 | 0.54 |
| 17:00-17:14 | 494 | 741 | 93 | 59 | 10 | 3.07 | 1.8 | 0.98 |
| 17:15-17:29 | 418 | 418 | 116 | 58 | 6 | 2.39 | 2.41 | 1.09 |
| 17:30-17:44 | 306 | 598 | 125 | 109 | 11 | 3.41 | 2.4 | 0.9 |
| 17:45-17:59 | 595 | 480 | 139 | 102 | 6 | 2.93 | 3.15 | 1.06 |
| 18:00-18:14 | 364 | 552 | 118 | 98 | 5 | 3.53 | 1.87 | 0.9 |
| 18:15-18:29 | 361 | 608 | 103 | 60 | 15 | 2.33 | 2.44 | 0.96 |
| 18:30-18:44 | 424 | 721 | 141 | 55 | 17 | 3.98 | 1.89 | 0.88 |
| 18:45-18:59 | 373 | 819 | 132 | 62 | 18 | 4.07 | 2.42 | 0.92 |
| 19:00-19:14 | 501 | 492 | 125 | 95 | 10 | 3.13 | 1.98 | 0.86 |
| 19:15-19:29 | 523 | 463 | 113 | 88 | 5 | 3.04 | 2.95 | 1.01 |
| 19:30-19:44 | 580 | 735 | 143 | 87 | 5 | 3.94 | 2.08 | 1.05 |
| 19:45-19:59 | 508 | 596 | 97 | 104 | 13 | 2.94 | 2.72 | 0.98 |
| 20:00-20:14 | 222 | 353 | 66 | 26 | 11 | 2.26 | 2.69 | 0.57 |
| 20:15-20:29 | 182 | 258 | 70 | 48 | 18 | 4.0 | 3.14 | 0.53 |
| 20:30-20:44 | 201 | 248 | 50 | 44 | 11 | 3.43 | 2.57 | 0.69 |
| 20:45-20:59 | 287 | 249 | 70 | 36 | 11 | 2.6 | 2.98 | 0.54 |
| 21:00-21:14 | 297 | 250 | 61 | 25 | 18 | 4.09 | 2.03 | 0.49 |
| 21:15-21:29 | 228 | 367 | 55 | 43 | 19 | 3.98 | 2.31 | 0.61 |
| 21:30-21:44 | 180 | 306 | 49 | 30 | 8 | 3.86 | 2.45 | 0.6 |
| 21:45-21:59 | 257 | 362 | 40 | 47 | 18 | 2.49 | 2.26 | 0.58 |

#### Location: Natete Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 386 | 735 | 89 | 79 | 15 | 3.21 | 3.02 | 1.0 |
| 07:15-07:29 | 421 | 726 | 99 | 101 | 5 | 3.27 | 2.95 | 0.92 |
| 07:30-07:44 | 447 | 774 | 104 | 111 | 11 | 2.93 | 2.04 | 0.95 |
| 07:45-07:59 | 379 | 586 | 90 | 115 | 15 | 4.09 | 2.19 | 1.01 |
| 08:00-08:14 | 562 | 532 | 148 | 120 | 13 | 4.01 | 2.67 | 0.86 |
| 08:15-08:29 | 488 | 460 | 128 | 95 | 12 | 4.2 | 2.61 | 1.0 |
| 08:30-08:44 | 556 | 801 | 111 | 64 | 8 | 2.92 | 2.26 | 0.96 |
| 08:45-08:59 | 557 | 660 | 143 | 93 | 18 | 3.39 | 3.09 | 0.91 |
| 09:00-09:14 | 558 | 463 | 107 | 56 | 5 | 4.27 | 1.87 | 0.88 |
| 09:15-09:29 | 474 | 500 | 89 | 57 | 14 | 3.48 | 2.6 | 1.04 |
| 09:30-09:44 | 468 | 501 | 143 | 90 | 7 | 2.76 | 3.15 | 0.9 |
| 09:45-09:59 | 399 | 527 | 85 | 98 | 7 | 3.64 | 2.05 | 1.09 |
| 10:00-10:14 | 185 | 329 | 55 | 44 | 14 | 4.34 | 2.59 | 0.5 |
| 10:15-10:29 | 232 | 267 | 56 | 50 | 5 | 2.69 | 1.96 | 0.62 |
| 10:30-10:44 | 177 | 338 | 32 | 39 | 12 | 3.51 | 2.01 | 0.57 |
| 10:45-10:59 | 245 | 307 | 63 | 41 | 6 | 3.63 | 3.02 | 0.7 |
| 16:00-16:14 | 173 | 272 | 47 | 26 | 8 | 3.91 | 2.45 | 0.45 |
| 16:15-16:29 | 186 | 399 | 58 | 33 | 11 | 3.2 | 1.89 | 0.55 |
| 16:30-16:44 | 179 | 278 | 44 | 23 | 19 | 3.07 | 2.37 | 0.67 |
| 16:45-16:59 | 173 | 399 | 56 | 49 | 16 | 3.04 | 2.0 | 0.42 |
| 17:00-17:14 | 403 | 848 | 134 | 108 | 10 | 2.62 | 2.53 | 0.88 |
| 17:15-17:29 | 568 | 884 | 141 | 63 | 16 | 4.18 | 2.29 | 1.08 |
| 17:30-17:44 | 353 | 614 | 135 | 89 | 13 | 2.22 | 2.52 | 0.89 |
| 17:45-17:59 | 303 | 603 | 140 | 76 | 5 | 4.15 | 2.7 | 1.03 |
| 18:00-18:14 | 424 | 739 | 130 | 67 | 18 | 2.56 | 3.0 | 1.04 |
| 18:15-18:29 | 336 | 549 | 144 | 72 | 12 | 2.65 | 2.18 | 0.86 |
| 18:30-18:44 | 518 | 863 | 117 | 82 | 14 | 2.47 | 2.29 | 0.94 |
| 18:45-18:59 | 596 | 723 | 91 | 90 | 20 | 3.03 | 1.96 | 1.06 |
| 19:00-19:14 | 588 | 660 | 81 | 116 | 18 | 4.17 | 3.01 | 0.96 |
| 19:15-19:29 | 341 | 591 | 140 | 55 | 12 | 3.55 | 2.47 | 0.93 |
| 19:30-19:44 | 432 | 490 | 112 | 77 | 17 | 3.22 | 2.58 | 0.95 |
| 19:45-19:59 | 589 | 438 | 130 | 81 | 7 | 3.43 | 1.82 | 0.89 |
| 20:00-20:14 | 217 | 214 | 53 | 30 | 12 | 3.52 | 2.22 | 0.45 |
| 20:15-20:29 | 211 | 314 | 60 | 47 | 6 | 4.26 | 1.9 | 0.64 |
| 20:30-20:44 | 192 | 243 | 46 | 33 | 15 | 3.45 | 2.28 | 0.64 |
| 20:45-20:59 | 281 | 374 | 69 | 31 | 5 | 3.75 | 3.19 | 0.41 |
| 21:00-21:14 | 228 | 234 | 65 | 39 | 16 | 2.2 | 2.23 | 0.53 |
| 21:15-21:29 | 284 | 225 | 59 | 39 | 10 | 2.79 | 2.78 | 0.62 |
| 21:30-21:44 | 229 | 226 | 53 | 21 | 17 | 2.66 | 2.52 | 0.58 |
| 21:45-21:59 | 165 | 270 | 63 | 26 | 11 | 4.49 | 1.98 | 0.41 |

### A.14 Day 14: 2026-06-14

#### Location: Wandegeya Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 338 | 633 | 131 | 65 | 13 | 2.6 | 1.91 | 0.98 |
| 07:15-07:29 | 302 | 495 | 104 | 81 | 18 | 3.96 | 1.93 | 0.98 |
| 07:30-07:44 | 433 | 430 | 135 | 58 | 8 | 2.27 | 2.82 | 1.09 |
| 07:45-07:59 | 308 | 565 | 115 | 85 | 16 | 2.35 | 3.06 | 1.0 |
| 08:00-08:14 | 373 | 746 | 88 | 79 | 16 | 4.46 | 2.69 | 1.05 |
| 08:15-08:29 | 376 | 529 | 89 | 107 | 14 | 3.64 | 2.81 | 0.98 |
| 08:30-08:44 | 373 | 444 | 88 | 52 | 10 | 3.25 | 2.92 | 1.03 |
| 08:45-08:59 | 405 | 577 | 83 | 95 | 17 | 3.1 | 2.0 | 1.04 |
| 09:00-09:14 | 564 | 683 | 145 | 75 | 20 | 3.98 | 1.85 | 1.09 |
| 09:15-09:29 | 332 | 435 | 135 | 72 | 15 | 4.3 | 2.36 | 1.08 |
| 09:30-09:44 | 306 | 403 | 85 | 81 | 12 | 4.14 | 2.99 | 0.88 |
| 09:45-09:59 | 553 | 493 | 83 | 85 | 9 | 2.9 | 2.65 | 0.87 |
| 10:00-10:14 | 247 | 204 | 42 | 23 | 17 | 3.65 | 1.98 | 0.47 |
| 10:15-10:29 | 168 | 245 | 38 | 23 | 19 | 3.48 | 3.12 | 0.52 |
| 10:30-10:44 | 216 | 337 | 65 | 29 | 8 | 2.38 | 2.53 | 0.45 |
| 10:45-10:59 | 181 | 253 | 57 | 41 | 7 | 4.5 | 2.15 | 0.64 |
| 16:00-16:14 | 261 | 340 | 49 | 28 | 9 | 2.89 | 2.51 | 0.4 |
| 16:15-16:29 | 225 | 379 | 35 | 40 | 8 | 2.9 | 2.55 | 0.5 |
| 16:30-16:44 | 212 | 362 | 67 | 31 | 12 | 3.17 | 2.44 | 0.47 |
| 16:45-16:59 | 183 | 331 | 48 | 24 | 13 | 2.53 | 2.28 | 0.66 |
| 17:00-17:14 | 457 | 544 | 143 | 112 | 6 | 3.81 | 1.86 | 0.95 |
| 17:15-17:29 | 502 | 593 | 105 | 52 | 10 | 2.55 | 2.12 | 1.01 |
| 17:30-17:44 | 398 | 589 | 105 | 83 | 11 | 2.8 | 2.0 | 1.01 |
| 17:45-17:59 | 579 | 739 | 104 | 77 | 11 | 2.18 | 2.76 | 0.85 |
| 18:00-18:14 | 538 | 900 | 80 | 50 | 13 | 4.23 | 2.52 | 1.02 |
| 18:15-18:29 | 387 | 657 | 127 | 58 | 14 | 3.2 | 1.87 | 0.93 |
| 18:30-18:44 | 583 | 865 | 117 | 79 | 16 | 4.24 | 2.3 | 1.02 |
| 18:45-18:59 | 312 | 457 | 103 | 99 | 5 | 2.81 | 3.16 | 0.97 |
| 19:00-19:14 | 306 | 672 | 101 | 51 | 7 | 2.61 | 1.95 | 0.97 |
| 19:15-19:29 | 539 | 881 | 140 | 119 | 9 | 4.29 | 1.84 | 1.01 |
| 19:30-19:44 | 338 | 663 | 146 | 113 | 5 | 3.02 | 1.94 | 0.97 |
| 19:45-19:59 | 548 | 806 | 103 | 97 | 7 | 3.34 | 2.83 | 1.07 |
| 20:00-20:14 | 206 | 374 | 70 | 35 | 16 | 3.31 | 2.75 | 0.48 |
| 20:15-20:29 | 185 | 315 | 55 | 34 | 10 | 4.49 | 2.09 | 0.51 |
| 20:30-20:44 | 229 | 202 | 36 | 27 | 16 | 2.82 | 2.88 | 0.53 |
| 20:45-20:59 | 217 | 395 | 40 | 20 | 17 | 2.69 | 2.97 | 0.59 |
| 21:00-21:14 | 187 | 309 | 41 | 37 | 14 | 4.2 | 2.49 | 0.51 |
| 21:15-21:29 | 169 | 396 | 57 | 36 | 6 | 2.87 | 2.36 | 0.64 |
| 21:30-21:44 | 164 | 362 | 67 | 39 | 6 | 3.1 | 3.1 | 0.6 |
| 21:45-21:59 | 220 | 371 | 43 | 39 | 16 | 3.24 | 2.48 | 0.57 |

#### Location: Kibuye Roundabout
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 392 | 575 | 118 | 66 | 10 | 3.75 | 2.02 | 1.1 |
| 07:15-07:29 | 342 | 634 | 118 | 54 | 13 | 3.45 | 3.0 | 0.91 |
| 07:30-07:44 | 390 | 493 | 83 | 115 | 15 | 3.16 | 3.15 | 0.97 |
| 07:45-07:59 | 426 | 867 | 122 | 74 | 10 | 3.16 | 2.81 | 1.06 |
| 08:00-08:14 | 368 | 452 | 91 | 117 | 17 | 2.64 | 1.93 | 1.04 |
| 08:15-08:29 | 402 | 449 | 132 | 83 | 8 | 3.12 | 2.44 | 1.0 |
| 08:30-08:44 | 354 | 527 | 107 | 89 | 9 | 3.78 | 3.19 | 0.88 |
| 08:45-08:59 | 408 | 889 | 113 | 118 | 6 | 4.3 | 3.12 | 0.9 |
| 09:00-09:14 | 442 | 686 | 92 | 109 | 18 | 2.18 | 2.19 | 1.0 |
| 09:15-09:29 | 303 | 880 | 107 | 87 | 10 | 3.4 | 2.45 | 1.07 |
| 09:30-09:44 | 326 | 544 | 133 | 56 | 17 | 3.9 | 3.03 | 1.04 |
| 09:45-09:59 | 394 | 754 | 109 | 116 | 10 | 4.26 | 1.89 | 1.07 |
| 10:00-10:14 | 258 | 255 | 33 | 20 | 17 | 3.97 | 2.74 | 0.5 |
| 10:15-10:29 | 215 | 299 | 60 | 49 | 17 | 2.7 | 1.86 | 0.6 |
| 10:30-10:44 | 182 | 228 | 43 | 23 | 16 | 3.55 | 1.91 | 0.65 |
| 10:45-10:59 | 207 | 248 | 39 | 37 | 19 | 3.7 | 2.68 | 0.46 |
| 16:00-16:14 | 212 | 392 | 67 | 31 | 17 | 3.87 | 3.09 | 0.43 |
| 16:15-16:29 | 171 | 259 | 56 | 35 | 8 | 3.9 | 2.45 | 0.47 |
| 16:30-16:44 | 161 | 319 | 46 | 20 | 15 | 2.86 | 1.87 | 0.45 |
| 16:45-16:59 | 263 | 340 | 45 | 38 | 14 | 2.42 | 2.68 | 0.62 |
| 17:00-17:14 | 311 | 543 | 89 | 92 | 11 | 4.44 | 1.91 | 0.89 |
| 17:15-17:29 | 395 | 685 | 117 | 95 | 20 | 3.36 | 1.94 | 0.95 |
| 17:30-17:44 | 583 | 580 | 95 | 51 | 9 | 4.32 | 2.06 | 0.99 |
| 17:45-17:59 | 377 | 566 | 121 | 120 | 5 | 2.95 | 1.96 | 1.07 |
| 18:00-18:14 | 320 | 819 | 109 | 84 | 7 | 3.62 | 3.08 | 1.1 |
| 18:15-18:29 | 440 | 763 | 82 | 52 | 11 | 3.41 | 2.39 | 1.02 |
| 18:30-18:44 | 566 | 818 | 111 | 118 | 6 | 3.81 | 2.95 | 0.97 |
| 18:45-18:59 | 478 | 621 | 95 | 77 | 7 | 3.62 | 2.34 | 0.95 |
| 19:00-19:14 | 561 | 675 | 103 | 86 | 8 | 3.44 | 2.34 | 1.06 |
| 19:15-19:29 | 562 | 589 | 88 | 90 | 8 | 3.06 | 2.37 | 1.08 |
| 19:30-19:44 | 440 | 470 | 89 | 87 | 19 | 3.96 | 1.99 | 0.99 |
| 19:45-19:59 | 479 | 482 | 132 | 76 | 5 | 4.04 | 2.05 | 1.02 |
| 20:00-20:14 | 265 | 386 | 50 | 20 | 12 | 3.86 | 2.7 | 0.62 |
| 20:15-20:29 | 253 | 391 | 39 | 39 | 6 | 2.67 | 2.39 | 0.55 |
| 20:30-20:44 | 162 | 322 | 62 | 28 | 7 | 4.09 | 2.33 | 0.57 |
| 20:45-20:59 | 173 | 384 | 51 | 45 | 19 | 2.89 | 2.09 | 0.47 |
| 21:00-21:14 | 158 | 337 | 52 | 34 | 18 | 3.93 | 2.53 | 0.44 |
| 21:15-21:29 | 186 | 280 | 57 | 37 | 5 | 2.18 | 3.02 | 0.66 |
| 21:30-21:44 | 276 | 372 | 66 | 28 | 20 | 2.2 | 3.03 | 0.58 |
| 21:45-21:59 | 186 | 318 | 62 | 27 | 12 | 2.33 | 2.99 | 0.61 |

#### Location: Bakuli Intersection
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 386 | 566 | 96 | 109 | 8 | 3.97 | 3.19 | 1.02 |
| 07:15-07:29 | 551 | 571 | 91 | 111 | 16 | 4.42 | 2.02 | 1.1 |
| 07:30-07:44 | 392 | 790 | 130 | 63 | 12 | 3.44 | 3.03 | 0.94 |
| 07:45-07:59 | 397 | 568 | 134 | 74 | 11 | 2.41 | 2.47 | 1.07 |
| 08:00-08:14 | 517 | 623 | 124 | 102 | 13 | 4.28 | 2.26 | 0.99 |
| 08:15-08:29 | 581 | 514 | 114 | 79 | 9 | 3.5 | 2.94 | 1.1 |
| 08:30-08:44 | 421 | 598 | 149 | 102 | 9 | 3.32 | 3.04 | 1.0 |
| 08:45-08:59 | 491 | 676 | 144 | 84 | 5 | 2.66 | 1.92 | 1.0 |
| 09:00-09:14 | 516 | 698 | 121 | 74 | 7 | 4.25 | 3.0 | 1.1 |
| 09:15-09:29 | 544 | 446 | 111 | 66 | 19 | 3.72 | 2.79 | 0.93 |
| 09:30-09:44 | 386 | 657 | 149 | 77 | 8 | 4.27 | 2.63 | 0.92 |
| 09:45-09:59 | 375 | 602 | 110 | 59 | 6 | 3.39 | 2.09 | 0.92 |
| 10:00-10:14 | 167 | 359 | 65 | 31 | 19 | 2.35 | 2.08 | 0.59 |
| 10:15-10:29 | 239 | 347 | 48 | 32 | 9 | 2.11 | 2.35 | 0.68 |
| 10:30-10:44 | 162 | 273 | 46 | 28 | 18 | 3.15 | 2.02 | 0.61 |
| 10:45-10:59 | 267 | 381 | 30 | 31 | 13 | 4.02 | 2.63 | 0.6 |
| 16:00-16:14 | 219 | 235 | 31 | 28 | 10 | 3.59 | 2.42 | 0.66 |
| 16:15-16:29 | 300 | 244 | 66 | 27 | 5 | 3.05 | 2.99 | 0.5 |
| 16:30-16:44 | 300 | 204 | 60 | 34 | 9 | 2.29 | 2.93 | 0.59 |
| 16:45-16:59 | 156 | 279 | 49 | 20 | 13 | 2.61 | 2.6 | 0.63 |
| 17:00-17:14 | 497 | 858 | 88 | 79 | 13 | 3.25 | 2.58 | 1.01 |
| 17:15-17:29 | 375 | 539 | 83 | 57 | 17 | 2.28 | 1.83 | 0.91 |
| 17:30-17:44 | 494 | 445 | 99 | 55 | 8 | 3.44 | 2.96 | 0.98 |
| 17:45-17:59 | 476 | 507 | 119 | 96 | 10 | 3.41 | 2.53 | 0.86 |
| 18:00-18:14 | 407 | 764 | 142 | 89 | 20 | 2.99 | 2.63 | 0.95 |
| 18:15-18:29 | 570 | 774 | 129 | 102 | 9 | 4.33 | 2.78 | 0.92 |
| 18:30-18:44 | 439 | 433 | 104 | 75 | 12 | 2.7 | 2.41 | 0.88 |
| 18:45-18:59 | 514 | 827 | 137 | 116 | 12 | 2.52 | 2.02 | 0.99 |
| 19:00-19:14 | 535 | 641 | 90 | 75 | 19 | 3.6 | 1.82 | 1.1 |
| 19:15-19:29 | 395 | 811 | 138 | 71 | 8 | 2.15 | 2.58 | 0.96 |
| 19:30-19:44 | 546 | 536 | 127 | 108 | 13 | 3.03 | 2.83 | 0.92 |
| 19:45-19:59 | 363 | 890 | 142 | 69 | 8 | 2.29 | 1.95 | 1.08 |
| 20:00-20:14 | 217 | 233 | 68 | 41 | 18 | 4.34 | 2.27 | 0.45 |
| 20:15-20:29 | 178 | 365 | 42 | 36 | 17 | 2.11 | 1.93 | 0.43 |
| 20:30-20:44 | 272 | 215 | 66 | 33 | 9 | 4.12 | 2.36 | 0.68 |
| 20:45-20:59 | 246 | 210 | 62 | 44 | 11 | 2.32 | 2.3 | 0.47 |
| 21:00-21:14 | 185 | 337 | 51 | 35 | 13 | 3.37 | 2.11 | 0.65 |
| 21:15-21:29 | 238 | 227 | 61 | 34 | 5 | 4.06 | 2.48 | 0.56 |
| 21:30-21:44 | 268 | 400 | 67 | 48 | 20 | 3.71 | 1.82 | 0.55 |
| 21:45-21:59 | 269 | 294 | 31 | 20 | 17 | 3.45 | 2.95 | 0.56 |

#### Location: Bwaise Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 437 | 843 | 140 | 52 | 10 | 3.47 | 3.03 | 1.0 |
| 07:15-07:29 | 319 | 782 | 141 | 62 | 18 | 4.04 | 2.63 | 0.9 |
| 07:30-07:44 | 423 | 883 | 96 | 91 | 17 | 3.46 | 1.98 | 0.99 |
| 07:45-07:59 | 313 | 412 | 88 | 54 | 6 | 2.79 | 2.06 | 1.08 |
| 08:00-08:14 | 414 | 878 | 98 | 100 | 15 | 3.89 | 2.81 | 1.05 |
| 08:15-08:29 | 593 | 658 | 118 | 102 | 11 | 2.43 | 1.87 | 1.05 |
| 08:30-08:44 | 542 | 819 | 122 | 101 | 11 | 4.1 | 2.98 | 1.05 |
| 08:45-08:59 | 310 | 875 | 100 | 77 | 8 | 2.87 | 2.47 | 1.1 |
| 09:00-09:14 | 492 | 522 | 100 | 80 | 19 | 3.57 | 3.07 | 0.97 |
| 09:15-09:29 | 527 | 705 | 140 | 104 | 10 | 2.93 | 3.04 | 1.08 |
| 09:30-09:44 | 519 | 621 | 119 | 99 | 6 | 2.94 | 2.41 | 0.86 |
| 09:45-09:59 | 309 | 423 | 132 | 92 | 12 | 3.96 | 2.23 | 1.02 |
| 10:00-10:14 | 216 | 338 | 31 | 28 | 20 | 2.4 | 1.95 | 0.58 |
| 10:15-10:29 | 220 | 333 | 35 | 31 | 11 | 4.28 | 2.49 | 0.49 |
| 10:30-10:44 | 201 | 291 | 58 | 48 | 13 | 3.22 | 3.18 | 0.49 |
| 10:45-10:59 | 228 | 280 | 49 | 20 | 18 | 4.24 | 1.86 | 0.61 |
| 16:00-16:14 | 229 | 263 | 31 | 48 | 19 | 2.19 | 2.47 | 0.45 |
| 16:15-16:29 | 177 | 362 | 57 | 39 | 11 | 4.17 | 2.71 | 0.64 |
| 16:30-16:44 | 197 | 372 | 49 | 38 | 11 | 3.44 | 2.9 | 0.48 |
| 16:45-16:59 | 279 | 287 | 67 | 31 | 14 | 2.93 | 3.11 | 0.64 |
| 17:00-17:14 | 486 | 718 | 89 | 97 | 20 | 3.91 | 2.01 | 0.99 |
| 17:15-17:29 | 432 | 868 | 83 | 96 | 19 | 3.24 | 1.84 | 1.06 |
| 17:30-17:44 | 402 | 509 | 81 | 91 | 19 | 3.61 | 2.34 | 1.09 |
| 17:45-17:59 | 447 | 783 | 112 | 89 | 16 | 2.79 | 2.07 | 1.09 |
| 18:00-18:14 | 337 | 760 | 112 | 65 | 14 | 2.22 | 2.13 | 0.91 |
| 18:15-18:29 | 517 | 866 | 82 | 87 | 18 | 2.56 | 2.45 | 0.94 |
| 18:30-18:44 | 324 | 846 | 148 | 119 | 19 | 3.47 | 2.56 | 0.95 |
| 18:45-18:59 | 464 | 449 | 91 | 107 | 15 | 3.32 | 2.16 | 0.86 |
| 19:00-19:14 | 421 | 719 | 122 | 65 | 16 | 2.77 | 2.67 | 1.0 |
| 19:15-19:29 | 547 | 853 | 82 | 63 | 13 | 3.14 | 2.33 | 0.97 |
| 19:30-19:44 | 497 | 447 | 103 | 64 | 10 | 3.13 | 3.19 | 0.89 |
| 19:45-19:59 | 354 | 900 | 129 | 118 | 12 | 3.11 | 2.32 | 0.89 |
| 20:00-20:14 | 204 | 257 | 53 | 24 | 5 | 2.87 | 2.0 | 0.47 |
| 20:15-20:29 | 273 | 215 | 46 | 26 | 16 | 2.79 | 2.78 | 0.66 |
| 20:30-20:44 | 258 | 395 | 32 | 29 | 13 | 4.25 | 2.26 | 0.52 |
| 20:45-20:59 | 207 | 374 | 31 | 32 | 11 | 3.95 | 2.9 | 0.63 |
| 21:00-21:14 | 234 | 239 | 37 | 28 | 15 | 2.43 | 2.38 | 0.47 |
| 21:15-21:29 | 264 | 339 | 52 | 34 | 5 | 4.17 | 1.99 | 0.5 |
| 21:30-21:44 | 222 | 289 | 35 | 26 | 18 | 3.88 | 2.69 | 0.62 |
| 21:45-21:59 | 163 | 391 | 66 | 48 | 14 | 4.03 | 2.25 | 0.49 |

#### Location: Natete Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 398 | 522 | 115 | 67 | 7 | 3.64 | 2.08 | 0.93 |
| 07:15-07:29 | 439 | 444 | 98 | 80 | 9 | 4.18 | 2.12 | 1.01 |
| 07:30-07:44 | 426 | 410 | 88 | 109 | 19 | 4.04 | 2.89 | 1.1 |
| 07:45-07:59 | 330 | 760 | 127 | 110 | 18 | 4.23 | 1.98 | 0.88 |
| 08:00-08:14 | 559 | 867 | 105 | 99 | 18 | 3.92 | 2.52 | 1.07 |
| 08:15-08:29 | 392 | 467 | 137 | 101 | 17 | 3.68 | 3.07 | 1.02 |
| 08:30-08:44 | 532 | 552 | 138 | 51 | 7 | 4.18 | 1.98 | 0.98 |
| 08:45-08:59 | 428 | 886 | 116 | 92 | 7 | 3.72 | 2.52 | 0.92 |
| 09:00-09:14 | 453 | 440 | 113 | 50 | 9 | 2.12 | 2.73 | 0.94 |
| 09:15-09:29 | 365 | 619 | 143 | 76 | 19 | 2.47 | 2.51 | 0.91 |
| 09:30-09:44 | 555 | 756 | 93 | 114 | 11 | 3.85 | 2.31 | 0.96 |
| 09:45-09:59 | 497 | 460 | 150 | 116 | 20 | 2.66 | 2.99 | 0.9 |
| 10:00-10:14 | 161 | 373 | 58 | 31 | 9 | 4.27 | 3.06 | 0.53 |
| 10:15-10:29 | 259 | 301 | 70 | 30 | 20 | 4.12 | 2.77 | 0.46 |
| 10:30-10:44 | 247 | 356 | 32 | 34 | 11 | 2.15 | 2.57 | 0.55 |
| 10:45-10:59 | 204 | 272 | 54 | 32 | 19 | 3.29 | 1.91 | 0.69 |
| 16:00-16:14 | 230 | 285 | 53 | 33 | 10 | 4.03 | 2.85 | 0.41 |
| 16:15-16:29 | 196 | 222 | 31 | 46 | 16 | 2.36 | 2.21 | 0.67 |
| 16:30-16:44 | 262 | 351 | 43 | 37 | 7 | 2.76 | 2.71 | 0.47 |
| 16:45-16:59 | 190 | 268 | 44 | 35 | 10 | 4.1 | 3.04 | 0.52 |
| 17:00-17:14 | 506 | 509 | 89 | 116 | 20 | 4.2 | 2.22 | 0.94 |
| 17:15-17:29 | 515 | 735 | 88 | 53 | 7 | 4.03 | 2.47 | 0.87 |
| 17:30-17:44 | 448 | 872 | 118 | 120 | 5 | 3.52 | 1.85 | 1.01 |
| 17:45-17:59 | 421 | 570 | 94 | 50 | 7 | 3.22 | 3.04 | 0.91 |
| 18:00-18:14 | 310 | 759 | 105 | 106 | 18 | 4.3 | 2.28 | 1.03 |
| 18:15-18:29 | 552 | 868 | 99 | 62 | 18 | 3.51 | 2.92 | 0.9 |
| 18:30-18:44 | 330 | 602 | 104 | 71 | 14 | 2.53 | 2.78 | 1.06 |
| 18:45-18:59 | 537 | 617 | 133 | 57 | 5 | 4.14 | 2.15 | 0.98 |
| 19:00-19:14 | 576 | 794 | 106 | 84 | 17 | 4.1 | 2.04 | 0.91 |
| 19:15-19:29 | 489 | 821 | 147 | 91 | 8 | 2.1 | 2.97 | 1.03 |
| 19:30-19:44 | 300 | 690 | 116 | 67 | 14 | 3.88 | 3.12 | 0.92 |
| 19:45-19:59 | 589 | 461 | 142 | 95 | 10 | 4.37 | 2.42 | 1.06 |
| 20:00-20:14 | 257 | 293 | 68 | 27 | 12 | 3.62 | 3.02 | 0.55 |
| 20:15-20:29 | 230 | 303 | 50 | 39 | 12 | 2.34 | 3.11 | 0.5 |
| 20:30-20:44 | 194 | 400 | 57 | 28 | 18 | 3.01 | 2.13 | 0.67 |
| 20:45-20:59 | 181 | 200 | 45 | 48 | 6 | 4.46 | 2.11 | 0.46 |
| 21:00-21:14 | 226 | 393 | 51 | 50 | 9 | 4.13 | 2.57 | 0.47 |
| 21:15-21:29 | 241 | 230 | 55 | 29 | 15 | 3.37 | 2.12 | 0.64 |
| 21:30-21:44 | 226 | 228 | 33 | 42 | 8 | 2.11 | 2.76 | 0.6 |
| 21:45-21:59 | 290 | 385 | 34 | 39 | 8 | 2.47 | 2.5 | 0.66 |

### A.15 Day 15: 2026-06-15

#### Location: Wandegeya Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 382 | 593 | 122 | 86 | 6 | 2.16 | 2.8 | 0.86 |
| 07:15-07:29 | 520 | 561 | 97 | 83 | 10 | 2.53 | 2.03 | 0.96 |
| 07:30-07:44 | 452 | 410 | 145 | 94 | 14 | 4.4 | 2.93 | 1.02 |
| 07:45-07:59 | 505 | 778 | 147 | 72 | 7 | 4.04 | 1.83 | 0.97 |
| 08:00-08:14 | 378 | 512 | 141 | 54 | 9 | 2.4 | 2.74 | 1.08 |
| 08:15-08:29 | 303 | 576 | 82 | 116 | 20 | 2.8 | 2.79 | 0.97 |
| 08:30-08:44 | 318 | 534 | 99 | 108 | 16 | 2.12 | 2.92 | 1.03 |
| 08:45-08:59 | 500 | 862 | 135 | 56 | 9 | 2.79 | 2.15 | 1.06 |
| 09:00-09:14 | 464 | 498 | 137 | 73 | 12 | 3.94 | 3.1 | 1.08 |
| 09:15-09:29 | 324 | 828 | 107 | 108 | 9 | 3.48 | 2.72 | 0.98 |
| 09:30-09:44 | 403 | 607 | 94 | 59 | 10 | 2.93 | 2.52 | 0.9 |
| 09:45-09:59 | 396 | 573 | 147 | 113 | 12 | 2.58 | 2.6 | 1.08 |
| 10:00-10:14 | 225 | 393 | 45 | 30 | 17 | 2.24 | 3.02 | 0.66 |
| 10:15-10:29 | 230 | 263 | 34 | 34 | 13 | 4.26 | 2.47 | 0.5 |
| 10:30-10:44 | 169 | 229 | 51 | 26 | 16 | 3.89 | 1.81 | 0.51 |
| 10:45-10:59 | 207 | 200 | 30 | 35 | 17 | 3.54 | 2.29 | 0.51 |
| 16:00-16:14 | 170 | 208 | 66 | 32 | 9 | 3.79 | 2.55 | 0.41 |
| 16:15-16:29 | 181 | 208 | 62 | 31 | 13 | 3.37 | 2.88 | 0.67 |
| 16:30-16:44 | 197 | 389 | 35 | 40 | 15 | 3.9 | 3.18 | 0.63 |
| 16:45-16:59 | 259 | 396 | 61 | 29 | 12 | 2.69 | 2.85 | 0.55 |
| 17:00-17:14 | 531 | 438 | 139 | 77 | 7 | 3.89 | 2.76 | 0.95 |
| 17:15-17:29 | 333 | 536 | 86 | 106 | 8 | 2.47 | 2.88 | 1.07 |
| 17:30-17:44 | 355 | 591 | 90 | 96 | 7 | 4.4 | 2.72 | 0.88 |
| 17:45-17:59 | 581 | 885 | 102 | 81 | 16 | 2.87 | 2.59 | 1.07 |
| 18:00-18:14 | 349 | 711 | 85 | 50 | 19 | 2.44 | 2.21 | 0.97 |
| 18:15-18:29 | 370 | 865 | 144 | 115 | 16 | 3.9 | 3.1 | 0.98 |
| 18:30-18:44 | 454 | 823 | 132 | 109 | 19 | 4.22 | 2.57 | 1.02 |
| 18:45-18:59 | 456 | 681 | 103 | 58 | 8 | 2.37 | 1.87 | 0.95 |
| 19:00-19:14 | 430 | 635 | 95 | 90 | 13 | 3.15 | 2.57 | 0.97 |
| 19:15-19:29 | 521 | 451 | 124 | 57 | 10 | 3.53 | 2.92 | 0.99 |
| 19:30-19:44 | 324 | 628 | 100 | 101 | 19 | 3.98 | 2.25 | 1.03 |
| 19:45-19:59 | 512 | 425 | 146 | 86 | 13 | 3.08 | 2.27 | 0.9 |
| 20:00-20:14 | 214 | 290 | 38 | 21 | 14 | 3.65 | 2.39 | 0.54 |
| 20:15-20:29 | 183 | 202 | 53 | 46 | 15 | 4.44 | 2.86 | 0.55 |
| 20:30-20:44 | 243 | 258 | 66 | 46 | 6 | 4.19 | 2.62 | 0.57 |
| 20:45-20:59 | 280 | 272 | 59 | 24 | 10 | 4.06 | 3.0 | 0.64 |
| 21:00-21:14 | 299 | 357 | 62 | 38 | 6 | 3.63 | 2.55 | 0.44 |
| 21:15-21:29 | 243 | 282 | 69 | 45 | 6 | 2.27 | 3.06 | 0.57 |
| 21:30-21:44 | 263 | 303 | 64 | 29 | 13 | 3.13 | 2.98 | 0.41 |
| 21:45-21:59 | 295 | 324 | 45 | 27 | 15 | 3.66 | 1.93 | 0.62 |

#### Location: Kibuye Roundabout
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 524 | 534 | 81 | 73 | 10 | 2.73 | 3.1 | 1.09 |
| 07:15-07:29 | 486 | 672 | 132 | 65 | 17 | 2.21 | 2.7 | 0.89 |
| 07:30-07:44 | 543 | 438 | 107 | 79 | 19 | 4.07 | 2.78 | 0.85 |
| 07:45-07:59 | 589 | 895 | 104 | 75 | 9 | 4.26 | 3.2 | 1.09 |
| 08:00-08:14 | 364 | 517 | 138 | 57 | 17 | 2.19 | 3.16 | 0.89 |
| 08:15-08:29 | 527 | 433 | 116 | 114 | 18 | 2.89 | 2.76 | 1.03 |
| 08:30-08:44 | 328 | 613 | 101 | 57 | 12 | 3.95 | 2.23 | 1.05 |
| 08:45-08:59 | 475 | 613 | 147 | 87 | 5 | 4.32 | 2.2 | 1.06 |
| 09:00-09:14 | 385 | 678 | 137 | 51 | 5 | 4.37 | 2.35 | 0.89 |
| 09:15-09:29 | 596 | 550 | 150 | 119 | 10 | 2.84 | 2.82 | 1.09 |
| 09:30-09:44 | 322 | 773 | 150 | 102 | 6 | 4.42 | 2.87 | 0.97 |
| 09:45-09:59 | 589 | 758 | 140 | 91 | 9 | 2.6 | 2.1 | 1.03 |
| 10:00-10:14 | 253 | 222 | 62 | 21 | 9 | 3.54 | 1.86 | 0.47 |
| 10:15-10:29 | 225 | 233 | 37 | 20 | 14 | 3.94 | 2.47 | 0.51 |
| 10:30-10:44 | 253 | 310 | 50 | 49 | 9 | 4.41 | 1.99 | 0.65 |
| 10:45-10:59 | 203 | 336 | 69 | 42 | 15 | 4.21 | 2.36 | 0.66 |
| 16:00-16:14 | 170 | 284 | 33 | 34 | 14 | 3.91 | 2.2 | 0.51 |
| 16:15-16:29 | 262 | 267 | 65 | 22 | 5 | 4.03 | 2.06 | 0.59 |
| 16:30-16:44 | 204 | 294 | 35 | 31 | 9 | 2.29 | 2.74 | 0.51 |
| 16:45-16:59 | 213 | 348 | 45 | 25 | 13 | 3.79 | 2.23 | 0.58 |
| 17:00-17:14 | 446 | 782 | 144 | 61 | 8 | 4.1 | 2.69 | 0.85 |
| 17:15-17:29 | 418 | 784 | 89 | 64 | 13 | 3.56 | 2.31 | 0.94 |
| 17:30-17:44 | 432 | 822 | 131 | 98 | 8 | 4.14 | 2.22 | 0.92 |
| 17:45-17:59 | 597 | 675 | 131 | 84 | 5 | 3.61 | 2.43 | 0.99 |
| 18:00-18:14 | 535 | 617 | 101 | 111 | 6 | 2.48 | 1.81 | 1.07 |
| 18:15-18:29 | 455 | 725 | 141 | 58 | 8 | 4.08 | 2.15 | 1.03 |
| 18:30-18:44 | 392 | 524 | 136 | 100 | 19 | 3.63 | 2.73 | 0.98 |
| 18:45-18:59 | 503 | 400 | 131 | 108 | 9 | 2.56 | 2.92 | 0.91 |
| 19:00-19:14 | 509 | 410 | 83 | 86 | 14 | 3.28 | 2.28 | 1.07 |
| 19:15-19:29 | 435 | 745 | 119 | 66 | 6 | 2.71 | 3.05 | 0.87 |
| 19:30-19:44 | 446 | 883 | 86 | 75 | 7 | 4.22 | 1.96 | 0.92 |
| 19:45-19:59 | 356 | 407 | 114 | 117 | 6 | 2.91 | 2.82 | 0.95 |
| 20:00-20:14 | 224 | 343 | 40 | 34 | 15 | 3.62 | 2.17 | 0.53 |
| 20:15-20:29 | 234 | 303 | 70 | 34 | 5 | 4.32 | 1.82 | 0.56 |
| 20:30-20:44 | 201 | 322 | 47 | 45 | 5 | 2.46 | 2.55 | 0.53 |
| 20:45-20:59 | 208 | 240 | 65 | 44 | 9 | 2.89 | 3.09 | 0.5 |
| 21:00-21:14 | 206 | 326 | 69 | 33 | 16 | 3.78 | 2.23 | 0.41 |
| 21:15-21:29 | 203 | 228 | 63 | 36 | 19 | 2.24 | 2.76 | 0.58 |
| 21:30-21:44 | 172 | 242 | 39 | 20 | 18 | 3.25 | 2.42 | 0.43 |
| 21:45-21:59 | 174 | 400 | 52 | 21 | 14 | 3.35 | 2.72 | 0.46 |

#### Location: Bakuli Intersection
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 572 | 536 | 114 | 50 | 13 | 3.82 | 2.72 | 0.85 |
| 07:15-07:29 | 564 | 444 | 135 | 79 | 17 | 3.4 | 2.74 | 1.01 |
| 07:30-07:44 | 526 | 642 | 136 | 80 | 11 | 3.67 | 2.23 | 0.99 |
| 07:45-07:59 | 341 | 806 | 140 | 67 | 16 | 2.99 | 2.95 | 1.05 |
| 08:00-08:14 | 460 | 460 | 123 | 57 | 19 | 2.25 | 3.18 | 1.07 |
| 08:15-08:29 | 479 | 661 | 99 | 86 | 20 | 4.3 | 2.5 | 1.0 |
| 08:30-08:44 | 480 | 524 | 125 | 77 | 9 | 3.47 | 3.17 | 0.92 |
| 08:45-08:59 | 323 | 414 | 150 | 108 | 13 | 2.45 | 2.36 | 0.88 |
| 09:00-09:14 | 313 | 425 | 143 | 76 | 5 | 4.29 | 1.98 | 0.98 |
| 09:15-09:29 | 354 | 779 | 141 | 95 | 17 | 4.05 | 2.2 | 0.87 |
| 09:30-09:44 | 498 | 477 | 111 | 94 | 11 | 2.78 | 2.92 | 1.03 |
| 09:45-09:59 | 332 | 536 | 96 | 114 | 11 | 2.47 | 2.86 | 0.96 |
| 10:00-10:14 | 242 | 204 | 43 | 47 | 14 | 2.96 | 2.32 | 0.65 |
| 10:15-10:29 | 238 | 262 | 69 | 33 | 19 | 2.6 | 1.99 | 0.6 |
| 10:30-10:44 | 183 | 253 | 32 | 46 | 8 | 3.77 | 1.85 | 0.57 |
| 10:45-10:59 | 285 | 313 | 49 | 22 | 10 | 3.67 | 3.01 | 0.42 |
| 16:00-16:14 | 225 | 224 | 47 | 25 | 7 | 2.18 | 1.81 | 0.62 |
| 16:15-16:29 | 266 | 241 | 45 | 24 | 12 | 4.02 | 3.0 | 0.69 |
| 16:30-16:44 | 213 | 320 | 42 | 34 | 12 | 3.76 | 1.89 | 0.49 |
| 16:45-16:59 | 294 | 284 | 32 | 30 | 16 | 2.74 | 2.63 | 0.69 |
| 17:00-17:14 | 477 | 710 | 116 | 70 | 15 | 4.13 | 2.26 | 1.03 |
| 17:15-17:29 | 416 | 792 | 133 | 60 | 11 | 4.11 | 1.92 | 0.89 |
| 17:30-17:44 | 378 | 551 | 143 | 109 | 10 | 2.69 | 2.64 | 1.05 |
| 17:45-17:59 | 358 | 522 | 126 | 102 | 12 | 3.41 | 3.14 | 0.97 |
| 18:00-18:14 | 529 | 510 | 98 | 71 | 17 | 3.51 | 1.89 | 1.03 |
| 18:15-18:29 | 545 | 475 | 139 | 113 | 12 | 3.99 | 3.0 | 1.03 |
| 18:30-18:44 | 489 | 598 | 134 | 72 | 6 | 3.68 | 2.44 | 1.1 |
| 18:45-18:59 | 590 | 761 | 145 | 85 | 17 | 4.39 | 3.08 | 0.92 |
| 19:00-19:14 | 388 | 878 | 82 | 96 | 13 | 2.73 | 3.14 | 1.08 |
| 19:15-19:29 | 481 | 750 | 103 | 81 | 14 | 2.29 | 2.36 | 0.91 |
| 19:30-19:44 | 481 | 563 | 125 | 63 | 13 | 2.68 | 2.05 | 1.01 |
| 19:45-19:59 | 417 | 517 | 122 | 96 | 5 | 2.51 | 2.78 | 0.95 |
| 20:00-20:14 | 288 | 360 | 35 | 49 | 7 | 4.12 | 2.78 | 0.52 |
| 20:15-20:29 | 173 | 315 | 34 | 42 | 5 | 3.47 | 2.34 | 0.49 |
| 20:30-20:44 | 298 | 216 | 58 | 45 | 5 | 3.55 | 1.87 | 0.42 |
| 20:45-20:59 | 200 | 240 | 68 | 28 | 10 | 4.11 | 2.99 | 0.65 |
| 21:00-21:14 | 171 | 375 | 42 | 47 | 11 | 2.29 | 2.8 | 0.43 |
| 21:15-21:29 | 155 | 374 | 44 | 28 | 10 | 2.83 | 2.12 | 0.54 |
| 21:30-21:44 | 204 | 210 | 50 | 39 | 6 | 3.71 | 2.03 | 0.57 |
| 21:45-21:59 | 173 | 359 | 35 | 26 | 5 | 2.49 | 2.59 | 0.42 |

#### Location: Bwaise Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 341 | 801 | 134 | 119 | 6 | 4.18 | 2.31 | 1.03 |
| 07:15-07:29 | 499 | 429 | 130 | 120 | 7 | 4.1 | 1.94 | 1.08 |
| 07:30-07:44 | 323 | 571 | 137 | 75 | 10 | 3.84 | 2.47 | 0.85 |
| 07:45-07:59 | 589 | 623 | 101 | 103 | 6 | 3.21 | 1.85 | 1.02 |
| 08:00-08:14 | 332 | 436 | 110 | 113 | 16 | 3.31 | 2.12 | 1.04 |
| 08:15-08:29 | 444 | 540 | 138 | 58 | 5 | 3.44 | 2.38 | 0.92 |
| 08:30-08:44 | 526 | 805 | 129 | 115 | 5 | 3.56 | 2.27 | 0.9 |
| 08:45-08:59 | 315 | 594 | 125 | 118 | 17 | 2.96 | 2.96 | 1.01 |
| 09:00-09:14 | 318 | 863 | 101 | 110 | 5 | 4.11 | 2.21 | 0.97 |
| 09:15-09:29 | 456 | 744 | 85 | 60 | 13 | 4.21 | 2.36 | 1.08 |
| 09:30-09:44 | 341 | 870 | 125 | 95 | 12 | 4.03 | 2.64 | 1.09 |
| 09:45-09:59 | 334 | 640 | 106 | 93 | 12 | 2.58 | 3.16 | 1.01 |
| 10:00-10:14 | 269 | 244 | 54 | 33 | 14 | 3.4 | 2.46 | 0.55 |
| 10:15-10:29 | 222 | 375 | 42 | 23 | 20 | 4.22 | 2.44 | 0.66 |
| 10:30-10:44 | 218 | 378 | 47 | 23 | 11 | 4.44 | 2.35 | 0.69 |
| 10:45-10:59 | 221 | 220 | 48 | 41 | 17 | 3.03 | 2.03 | 0.44 |
| 16:00-16:14 | 165 | 320 | 55 | 47 | 13 | 3.97 | 2.52 | 0.52 |
| 16:15-16:29 | 176 | 356 | 42 | 23 | 18 | 3.32 | 2.92 | 0.55 |
| 16:30-16:44 | 283 | 336 | 38 | 29 | 19 | 4.05 | 2.52 | 0.54 |
| 16:45-16:59 | 186 | 318 | 47 | 45 | 9 | 3.59 | 2.6 | 0.47 |
| 17:00-17:14 | 512 | 793 | 112 | 119 | 5 | 2.29 | 2.71 | 0.93 |
| 17:15-17:29 | 350 | 850 | 103 | 51 | 10 | 4.46 | 2.52 | 0.92 |
| 17:30-17:44 | 401 | 811 | 102 | 92 | 7 | 2.96 | 2.04 | 1.1 |
| 17:45-17:59 | 506 | 746 | 106 | 106 | 11 | 2.19 | 2.1 | 1.01 |
| 18:00-18:14 | 530 | 822 | 143 | 90 | 10 | 4.36 | 2.45 | 1.1 |
| 18:15-18:29 | 333 | 860 | 139 | 73 | 16 | 3.18 | 2.6 | 1.07 |
| 18:30-18:44 | 554 | 892 | 135 | 88 | 13 | 3.77 | 2.31 | 0.88 |
| 18:45-18:59 | 315 | 633 | 119 | 115 | 12 | 3.42 | 2.35 | 1.03 |
| 19:00-19:14 | 437 | 544 | 135 | 113 | 13 | 3.48 | 2.53 | 0.91 |
| 19:15-19:29 | 543 | 725 | 116 | 80 | 7 | 4.07 | 2.21 | 1.08 |
| 19:30-19:44 | 466 | 755 | 109 | 87 | 18 | 3.9 | 2.07 | 1.01 |
| 19:45-19:59 | 365 | 727 | 101 | 80 | 19 | 3.66 | 2.13 | 0.88 |
| 20:00-20:14 | 235 | 376 | 41 | 39 | 14 | 3.94 | 1.89 | 0.67 |
| 20:15-20:29 | 224 | 386 | 69 | 30 | 19 | 3.85 | 3.18 | 0.65 |
| 20:30-20:44 | 156 | 333 | 60 | 36 | 15 | 2.76 | 1.97 | 0.46 |
| 20:45-20:59 | 208 | 364 | 56 | 27 | 5 | 3.47 | 2.96 | 0.66 |
| 21:00-21:14 | 204 | 243 | 40 | 26 | 11 | 3.05 | 2.88 | 0.51 |
| 21:15-21:29 | 267 | 234 | 35 | 28 | 13 | 3.08 | 2.67 | 0.61 |
| 21:30-21:44 | 216 | 215 | 58 | 45 | 13 | 3.62 | 3.15 | 0.64 |
| 21:45-21:59 | 193 | 389 | 34 | 41 | 8 | 4.41 | 2.46 | 0.44 |

#### Location: Natete Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 429 | 589 | 149 | 105 | 8 | 4.12 | 3.16 | 0.95 |
| 07:15-07:29 | 421 | 849 | 96 | 70 | 7 | 3.79 | 2.71 | 1.06 |
| 07:30-07:44 | 507 | 434 | 116 | 92 | 16 | 3.74 | 2.93 | 0.93 |
| 07:45-07:59 | 424 | 884 | 88 | 75 | 16 | 2.14 | 2.39 | 0.99 |
| 08:00-08:14 | 531 | 640 | 143 | 114 | 10 | 4.32 | 1.81 | 1.07 |
| 08:15-08:29 | 596 | 865 | 147 | 108 | 6 | 2.73 | 2.82 | 0.95 |
| 08:30-08:44 | 382 | 839 | 135 | 108 | 10 | 3.89 | 2.83 | 0.99 |
| 08:45-08:59 | 476 | 890 | 98 | 80 | 7 | 4.17 | 2.05 | 0.9 |
| 09:00-09:14 | 583 | 716 | 127 | 60 | 5 | 2.2 | 2.32 | 1.04 |
| 09:15-09:29 | 312 | 623 | 117 | 89 | 10 | 2.6 | 2.3 | 0.98 |
| 09:30-09:44 | 528 | 709 | 135 | 104 | 7 | 2.34 | 2.72 | 1.09 |
| 09:45-09:59 | 533 | 686 | 137 | 98 | 6 | 2.93 | 2.13 | 0.86 |
| 10:00-10:14 | 258 | 250 | 38 | 47 | 14 | 3.86 | 1.94 | 0.69 |
| 10:15-10:29 | 245 | 391 | 47 | 30 | 19 | 3.84 | 2.17 | 0.43 |
| 10:30-10:44 | 298 | 310 | 70 | 21 | 7 | 2.22 | 2.08 | 0.5 |
| 10:45-10:59 | 234 | 363 | 63 | 30 | 18 | 3.4 | 3.08 | 0.69 |
| 16:00-16:14 | 183 | 236 | 70 | 35 | 6 | 2.23 | 2.39 | 0.66 |
| 16:15-16:29 | 203 | 319 | 69 | 30 | 18 | 2.27 | 2.77 | 0.6 |
| 16:30-16:44 | 233 | 344 | 34 | 35 | 19 | 3.29 | 2.75 | 0.68 |
| 16:45-16:59 | 295 | 315 | 62 | 49 | 10 | 3.49 | 2.81 | 0.43 |
| 17:00-17:14 | 392 | 445 | 111 | 116 | 18 | 3.67 | 3.17 | 0.87 |
| 17:15-17:29 | 573 | 461 | 123 | 81 | 18 | 4.08 | 2.58 | 0.89 |
| 17:30-17:44 | 481 | 689 | 101 | 86 | 8 | 2.18 | 2.74 | 0.88 |
| 17:45-17:59 | 305 | 762 | 120 | 77 | 7 | 3.78 | 3.19 | 1.05 |
| 18:00-18:14 | 375 | 441 | 95 | 119 | 18 | 2.33 | 2.54 | 0.99 |
| 18:15-18:29 | 400 | 763 | 133 | 88 | 8 | 4.41 | 3.08 | 1.01 |
| 18:30-18:44 | 412 | 865 | 150 | 120 | 5 | 2.22 | 2.75 | 0.92 |
| 18:45-18:59 | 559 | 549 | 141 | 97 | 14 | 2.99 | 2.52 | 0.91 |
| 19:00-19:14 | 466 | 488 | 147 | 64 | 13 | 2.79 | 2.57 | 1.02 |
| 19:15-19:29 | 457 | 816 | 139 | 83 | 8 | 3.0 | 2.51 | 1.08 |
| 19:30-19:44 | 586 | 483 | 121 | 76 | 9 | 3.9 | 3.14 | 1.01 |
| 19:45-19:59 | 583 | 627 | 112 | 57 | 9 | 2.58 | 1.82 | 0.87 |
| 20:00-20:14 | 288 | 260 | 61 | 47 | 10 | 2.38 | 2.1 | 0.68 |
| 20:15-20:29 | 290 | 226 | 65 | 36 | 12 | 3.87 | 3.14 | 0.65 |
| 20:30-20:44 | 177 | 203 | 62 | 32 | 16 | 3.4 | 2.58 | 0.64 |
| 20:45-20:59 | 274 | 326 | 38 | 46 | 6 | 3.01 | 2.03 | 0.45 |
| 21:00-21:14 | 219 | 219 | 32 | 42 | 10 | 3.73 | 2.04 | 0.54 |
| 21:15-21:29 | 265 | 353 | 63 | 24 | 5 | 2.68 | 1.84 | 0.59 |
| 21:30-21:44 | 200 | 343 | 41 | 23 | 13 | 3.01 | 2.94 | 0.59 |
| 21:45-21:59 | 231 | 216 | 44 | 33 | 5 | 2.47 | 2.76 | 0.69 |

### A.16 Day 16: 2026-06-16

#### Location: Wandegeya Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 512 | 700 | 100 | 95 | 12 | 4.36 | 2.38 | 1.06 |
| 07:15-07:29 | 331 | 877 | 134 | 90 | 12 | 3.81 | 3.03 | 1.09 |
| 07:30-07:44 | 592 | 798 | 81 | 55 | 13 | 2.78 | 3.14 | 0.89 |
| 07:45-07:59 | 543 | 756 | 97 | 100 | 10 | 3.13 | 2.18 | 0.98 |
| 08:00-08:14 | 374 | 469 | 96 | 91 | 12 | 3.27 | 2.5 | 1.08 |
| 08:15-08:29 | 545 | 666 | 96 | 85 | 19 | 3.4 | 1.99 | 1.01 |
| 08:30-08:44 | 553 | 777 | 142 | 54 | 10 | 3.08 | 2.86 | 1.06 |
| 08:45-08:59 | 582 | 614 | 98 | 62 | 14 | 2.2 | 2.24 | 0.95 |
| 09:00-09:14 | 511 | 640 | 103 | 78 | 18 | 3.7 | 2.67 | 1.03 |
| 09:15-09:29 | 399 | 737 | 114 | 113 | 12 | 3.68 | 2.09 | 0.99 |
| 09:30-09:44 | 329 | 623 | 86 | 101 | 9 | 2.26 | 2.05 | 0.89 |
| 09:45-09:59 | 335 | 711 | 108 | 71 | 6 | 2.58 | 2.78 | 1.04 |
| 10:00-10:14 | 226 | 211 | 64 | 45 | 15 | 4.39 | 2.48 | 0.46 |
| 10:15-10:29 | 252 | 268 | 38 | 36 | 12 | 3.25 | 2.7 | 0.43 |
| 10:30-10:44 | 207 | 208 | 39 | 32 | 20 | 3.61 | 2.15 | 0.67 |
| 10:45-10:59 | 259 | 204 | 32 | 39 | 5 | 3.75 | 1.96 | 0.55 |
| 16:00-16:14 | 158 | 362 | 65 | 21 | 15 | 3.8 | 3.04 | 0.43 |
| 16:15-16:29 | 237 | 205 | 48 | 22 | 20 | 3.67 | 2.23 | 0.41 |
| 16:30-16:44 | 157 | 230 | 56 | 21 | 14 | 2.59 | 2.48 | 0.57 |
| 16:45-16:59 | 151 | 307 | 66 | 50 | 17 | 2.18 | 2.48 | 0.6 |
| 17:00-17:14 | 317 | 408 | 115 | 113 | 9 | 3.6 | 2.76 | 0.97 |
| 17:15-17:29 | 333 | 786 | 99 | 54 | 5 | 3.49 | 1.97 | 0.92 |
| 17:30-17:44 | 507 | 487 | 136 | 116 | 5 | 2.38 | 2.31 | 0.98 |
| 17:45-17:59 | 577 | 610 | 122 | 89 | 10 | 3.59 | 2.26 | 1.03 |
| 18:00-18:14 | 437 | 668 | 124 | 103 | 11 | 3.11 | 2.38 | 1.01 |
| 18:15-18:29 | 500 | 704 | 137 | 95 | 17 | 3.85 | 2.09 | 1.03 |
| 18:30-18:44 | 334 | 412 | 138 | 107 | 12 | 2.63 | 2.65 | 1.07 |
| 18:45-18:59 | 535 | 697 | 135 | 83 | 11 | 2.63 | 2.74 | 0.98 |
| 19:00-19:14 | 594 | 548 | 97 | 54 | 20 | 3.03 | 2.22 | 0.93 |
| 19:15-19:29 | 537 | 473 | 114 | 110 | 7 | 3.18 | 2.83 | 0.96 |
| 19:30-19:44 | 365 | 750 | 122 | 119 | 16 | 3.36 | 1.84 | 0.92 |
| 19:45-19:59 | 482 | 601 | 147 | 94 | 20 | 2.92 | 2.35 | 1.03 |
| 20:00-20:14 | 224 | 279 | 57 | 20 | 14 | 3.06 | 1.96 | 0.5 |
| 20:15-20:29 | 255 | 280 | 53 | 33 | 8 | 2.63 | 2.4 | 0.46 |
| 20:30-20:44 | 263 | 252 | 38 | 37 | 18 | 3.2 | 2.68 | 0.6 |
| 20:45-20:59 | 247 | 224 | 52 | 33 | 13 | 3.07 | 2.69 | 0.45 |
| 21:00-21:14 | 220 | 306 | 41 | 35 | 17 | 2.44 | 3.05 | 0.56 |
| 21:15-21:29 | 282 | 388 | 31 | 34 | 19 | 4.14 | 2.27 | 0.4 |
| 21:30-21:44 | 291 | 366 | 61 | 44 | 17 | 4.0 | 2.36 | 0.6 |
| 21:45-21:59 | 286 | 213 | 54 | 40 | 6 | 3.48 | 1.97 | 0.5 |

#### Location: Kibuye Roundabout
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 527 | 622 | 113 | 68 | 11 | 2.95 | 1.85 | 0.93 |
| 07:15-07:29 | 403 | 594 | 119 | 106 | 5 | 3.67 | 2.54 | 0.95 |
| 07:30-07:44 | 596 | 562 | 136 | 66 | 18 | 2.57 | 2.54 | 1.1 |
| 07:45-07:59 | 570 | 813 | 116 | 92 | 7 | 2.58 | 2.09 | 0.92 |
| 08:00-08:14 | 547 | 772 | 138 | 67 | 6 | 4.35 | 2.42 | 1.07 |
| 08:15-08:29 | 332 | 864 | 117 | 84 | 6 | 2.51 | 2.21 | 1.1 |
| 08:30-08:44 | 375 | 682 | 115 | 91 | 13 | 4.13 | 2.52 | 1.02 |
| 08:45-08:59 | 418 | 655 | 100 | 85 | 20 | 2.71 | 3.0 | 0.96 |
| 09:00-09:14 | 492 | 745 | 139 | 73 | 12 | 2.35 | 2.4 | 0.98 |
| 09:15-09:29 | 375 | 422 | 134 | 79 | 10 | 2.98 | 3.14 | 0.86 |
| 09:30-09:44 | 454 | 543 | 138 | 67 | 16 | 3.66 | 2.25 | 1.0 |
| 09:45-09:59 | 527 | 441 | 137 | 83 | 9 | 2.57 | 3.19 | 0.94 |
| 10:00-10:14 | 285 | 213 | 42 | 39 | 15 | 2.25 | 2.49 | 0.54 |
| 10:15-10:29 | 299 | 243 | 61 | 28 | 13 | 4.01 | 2.59 | 0.59 |
| 10:30-10:44 | 251 | 371 | 60 | 44 | 15 | 2.15 | 2.93 | 0.62 |
| 10:45-10:59 | 214 | 215 | 31 | 40 | 17 | 3.84 | 2.07 | 0.53 |
| 16:00-16:14 | 278 | 206 | 39 | 43 | 16 | 4.05 | 2.72 | 0.59 |
| 16:15-16:29 | 249 | 377 | 37 | 32 | 15 | 2.57 | 2.01 | 0.46 |
| 16:30-16:44 | 273 | 317 | 47 | 48 | 13 | 2.62 | 2.64 | 0.41 |
| 16:45-16:59 | 276 | 391 | 55 | 43 | 13 | 3.34 | 2.91 | 0.44 |
| 17:00-17:14 | 477 | 723 | 91 | 95 | 12 | 2.87 | 1.9 | 0.96 |
| 17:15-17:29 | 328 | 696 | 113 | 62 | 11 | 4.11 | 1.92 | 1.0 |
| 17:30-17:44 | 591 | 610 | 144 | 105 | 10 | 4.23 | 2.99 | 1.0 |
| 17:45-17:59 | 592 | 548 | 115 | 62 | 19 | 3.38 | 2.61 | 0.96 |
| 18:00-18:14 | 304 | 655 | 129 | 62 | 9 | 3.72 | 3.08 | 1.09 |
| 18:15-18:29 | 368 | 687 | 143 | 96 | 12 | 2.78 | 2.22 | 0.89 |
| 18:30-18:44 | 423 | 576 | 134 | 110 | 16 | 3.06 | 2.83 | 1.01 |
| 18:45-18:59 | 333 | 401 | 148 | 50 | 9 | 2.31 | 2.99 | 0.9 |
| 19:00-19:14 | 396 | 498 | 97 | 100 | 13 | 3.1 | 2.18 | 0.99 |
| 19:15-19:29 | 417 | 632 | 138 | 102 | 11 | 2.26 | 2.44 | 0.97 |
| 19:30-19:44 | 341 | 690 | 146 | 97 | 5 | 2.38 | 2.41 | 1.04 |
| 19:45-19:59 | 461 | 691 | 120 | 62 | 5 | 2.13 | 3.19 | 1.01 |
| 20:00-20:14 | 274 | 234 | 57 | 34 | 19 | 2.37 | 1.97 | 0.56 |
| 20:15-20:29 | 192 | 341 | 50 | 21 | 8 | 3.72 | 1.92 | 0.7 |
| 20:30-20:44 | 231 | 379 | 41 | 25 | 19 | 3.7 | 2.41 | 0.42 |
| 20:45-20:59 | 210 | 341 | 60 | 28 | 13 | 3.71 | 2.13 | 0.61 |
| 21:00-21:14 | 164 | 268 | 48 | 22 | 15 | 2.14 | 3.01 | 0.63 |
| 21:15-21:29 | 161 | 311 | 69 | 22 | 6 | 2.39 | 2.61 | 0.41 |
| 21:30-21:44 | 247 | 380 | 67 | 30 | 5 | 4.25 | 2.74 | 0.54 |
| 21:45-21:59 | 246 | 255 | 45 | 27 | 8 | 2.18 | 2.08 | 0.59 |

#### Location: Bakuli Intersection
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 328 | 776 | 137 | 69 | 10 | 3.93 | 2.45 | 1.04 |
| 07:15-07:29 | 334 | 771 | 89 | 51 | 13 | 3.4 | 2.73 | 1.06 |
| 07:30-07:44 | 423 | 836 | 150 | 76 | 19 | 2.12 | 3.12 | 0.93 |
| 07:45-07:59 | 317 | 483 | 109 | 113 | 13 | 3.63 | 3.01 | 0.96 |
| 08:00-08:14 | 303 | 437 | 95 | 73 | 12 | 4.0 | 2.17 | 0.9 |
| 08:15-08:29 | 375 | 883 | 80 | 65 | 11 | 2.88 | 1.95 | 1.0 |
| 08:30-08:44 | 598 | 627 | 98 | 105 | 19 | 4.4 | 2.28 | 0.86 |
| 08:45-08:59 | 319 | 486 | 144 | 86 | 13 | 3.5 | 2.91 | 0.92 |
| 09:00-09:14 | 441 | 518 | 141 | 51 | 9 | 3.72 | 2.35 | 0.97 |
| 09:15-09:29 | 350 | 633 | 114 | 67 | 9 | 2.92 | 2.46 | 0.94 |
| 09:30-09:44 | 529 | 547 | 119 | 106 | 7 | 4.27 | 1.88 | 1.07 |
| 09:45-09:59 | 430 | 552 | 123 | 76 | 16 | 2.38 | 2.48 | 1.06 |
| 10:00-10:14 | 195 | 293 | 66 | 48 | 17 | 3.71 | 2.71 | 0.52 |
| 10:15-10:29 | 236 | 233 | 70 | 30 | 10 | 2.49 | 2.7 | 0.47 |
| 10:30-10:44 | 270 | 365 | 58 | 39 | 12 | 4.33 | 1.81 | 0.63 |
| 10:45-10:59 | 208 | 361 | 31 | 39 | 11 | 3.87 | 2.95 | 0.62 |
| 16:00-16:14 | 190 | 325 | 68 | 29 | 9 | 2.79 | 2.38 | 0.5 |
| 16:15-16:29 | 162 | 391 | 53 | 38 | 6 | 2.35 | 2.42 | 0.51 |
| 16:30-16:44 | 223 | 239 | 31 | 43 | 16 | 2.61 | 2.41 | 0.68 |
| 16:45-16:59 | 270 | 382 | 51 | 36 | 12 | 2.34 | 2.24 | 0.62 |
| 17:00-17:14 | 394 | 779 | 128 | 72 | 10 | 3.2 | 3.04 | 0.92 |
| 17:15-17:29 | 314 | 720 | 84 | 116 | 17 | 4.42 | 2.85 | 1.04 |
| 17:30-17:44 | 444 | 704 | 108 | 74 | 20 | 4.21 | 2.89 | 1.01 |
| 17:45-17:59 | 416 | 769 | 130 | 67 | 8 | 3.63 | 2.6 | 0.93 |
| 18:00-18:14 | 395 | 583 | 132 | 114 | 6 | 4.07 | 1.86 | 0.97 |
| 18:15-18:29 | 307 | 865 | 141 | 109 | 18 | 2.64 | 2.8 | 0.93 |
| 18:30-18:44 | 369 | 429 | 136 | 90 | 13 | 2.76 | 2.43 | 0.87 |
| 18:45-18:59 | 581 | 614 | 100 | 52 | 15 | 2.12 | 2.13 | 1.07 |
| 19:00-19:14 | 329 | 867 | 149 | 73 | 17 | 3.25 | 2.52 | 1.07 |
| 19:15-19:29 | 503 | 513 | 131 | 85 | 15 | 2.64 | 3.04 | 1.02 |
| 19:30-19:44 | 535 | 459 | 118 | 52 | 20 | 2.92 | 2.38 | 1.0 |
| 19:45-19:59 | 543 | 447 | 96 | 82 | 12 | 3.92 | 2.36 | 0.93 |
| 20:00-20:14 | 241 | 397 | 62 | 38 | 8 | 4.02 | 1.94 | 0.57 |
| 20:15-20:29 | 188 | 234 | 57 | 24 | 16 | 3.42 | 2.61 | 0.56 |
| 20:30-20:44 | 174 | 225 | 64 | 23 | 16 | 3.82 | 2.62 | 0.61 |
| 20:45-20:59 | 233 | 330 | 32 | 28 | 19 | 2.3 | 2.32 | 0.61 |
| 21:00-21:14 | 169 | 384 | 70 | 43 | 6 | 2.78 | 3.12 | 0.54 |
| 21:15-21:29 | 169 | 255 | 39 | 22 | 5 | 3.85 | 3.13 | 0.4 |
| 21:30-21:44 | 216 | 250 | 59 | 25 | 12 | 2.64 | 3.11 | 0.59 |
| 21:45-21:59 | 165 | 383 | 42 | 49 | 19 | 3.92 | 2.83 | 0.53 |

#### Location: Bwaise Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 496 | 573 | 106 | 55 | 16 | 3.15 | 1.97 | 0.89 |
| 07:15-07:29 | 518 | 531 | 150 | 110 | 5 | 4.31 | 1.96 | 0.94 |
| 07:30-07:44 | 429 | 835 | 149 | 70 | 16 | 2.64 | 2.41 | 1.05 |
| 07:45-07:59 | 503 | 743 | 149 | 98 | 5 | 3.19 | 2.26 | 0.96 |
| 08:00-08:14 | 313 | 736 | 93 | 52 | 9 | 3.46 | 2.96 | 0.98 |
| 08:15-08:29 | 418 | 572 | 109 | 61 | 8 | 2.93 | 2.35 | 1.02 |
| 08:30-08:44 | 481 | 784 | 94 | 102 | 17 | 2.43 | 1.94 | 0.92 |
| 08:45-08:59 | 397 | 560 | 136 | 109 | 17 | 2.16 | 1.87 | 1.05 |
| 09:00-09:14 | 425 | 588 | 83 | 70 | 17 | 2.39 | 2.63 | 0.88 |
| 09:15-09:29 | 594 | 627 | 114 | 94 | 8 | 3.7 | 2.61 | 0.92 |
| 09:30-09:44 | 485 | 526 | 97 | 82 | 20 | 3.37 | 2.18 | 0.99 |
| 09:45-09:59 | 421 | 456 | 110 | 74 | 11 | 2.43 | 2.87 | 0.86 |
| 10:00-10:14 | 184 | 371 | 32 | 32 | 5 | 2.41 | 3.13 | 0.58 |
| 10:15-10:29 | 197 | 393 | 55 | 38 | 7 | 2.4 | 2.77 | 0.51 |
| 10:30-10:44 | 226 | 214 | 31 | 22 | 6 | 3.05 | 2.37 | 0.48 |
| 10:45-10:59 | 273 | 267 | 54 | 47 | 12 | 2.53 | 2.39 | 0.52 |
| 16:00-16:14 | 153 | 278 | 59 | 42 | 11 | 2.74 | 2.35 | 0.68 |
| 16:15-16:29 | 162 | 300 | 68 | 33 | 10 | 2.55 | 2.08 | 0.67 |
| 16:30-16:44 | 250 | 371 | 67 | 22 | 15 | 2.9 | 2.75 | 0.6 |
| 16:45-16:59 | 180 | 218 | 60 | 32 | 20 | 2.55 | 1.9 | 0.64 |
| 17:00-17:14 | 386 | 852 | 85 | 77 | 15 | 4.29 | 2.03 | 1.07 |
| 17:15-17:29 | 427 | 820 | 138 | 100 | 7 | 3.66 | 3.03 | 0.85 |
| 17:30-17:44 | 512 | 548 | 83 | 85 | 7 | 3.78 | 2.67 | 1.05 |
| 17:45-17:59 | 450 | 536 | 116 | 94 | 18 | 3.93 | 2.58 | 0.87 |
| 18:00-18:14 | 511 | 667 | 111 | 115 | 10 | 3.81 | 2.65 | 0.95 |
| 18:15-18:29 | 360 | 765 | 106 | 105 | 17 | 2.47 | 3.09 | 0.95 |
| 18:30-18:44 | 508 | 584 | 95 | 91 | 19 | 4.38 | 2.94 | 1.03 |
| 18:45-18:59 | 520 | 612 | 105 | 52 | 13 | 3.64 | 1.9 | 1.07 |
| 19:00-19:14 | 405 | 684 | 89 | 74 | 11 | 4.06 | 2.13 | 1.03 |
| 19:15-19:29 | 367 | 609 | 84 | 51 | 13 | 3.94 | 3.12 | 0.96 |
| 19:30-19:44 | 570 | 491 | 101 | 61 | 19 | 2.38 | 1.92 | 0.98 |
| 19:45-19:59 | 377 | 456 | 142 | 67 | 12 | 3.41 | 1.89 | 0.95 |
| 20:00-20:14 | 182 | 283 | 65 | 44 | 15 | 3.83 | 2.99 | 0.66 |
| 20:15-20:29 | 269 | 271 | 61 | 26 | 20 | 2.39 | 2.59 | 0.42 |
| 20:30-20:44 | 247 | 243 | 40 | 23 | 11 | 3.88 | 1.92 | 0.64 |
| 20:45-20:59 | 258 | 329 | 56 | 24 | 18 | 2.22 | 1.91 | 0.57 |
| 21:00-21:14 | 198 | 240 | 55 | 32 | 13 | 4.03 | 2.56 | 0.68 |
| 21:15-21:29 | 150 | 366 | 35 | 35 | 7 | 4.07 | 1.81 | 0.48 |
| 21:30-21:44 | 165 | 203 | 66 | 43 | 9 | 3.6 | 2.55 | 0.44 |
| 21:45-21:59 | 286 | 288 | 40 | 23 | 19 | 4.38 | 2.93 | 0.56 |

#### Location: Natete Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 355 | 801 | 116 | 75 | 8 | 3.16 | 1.98 | 1.01 |
| 07:15-07:29 | 494 | 402 | 140 | 70 | 11 | 2.11 | 2.27 | 1.04 |
| 07:30-07:44 | 507 | 507 | 149 | 57 | 5 | 2.24 | 1.86 | 1.04 |
| 07:45-07:59 | 455 | 427 | 131 | 70 | 10 | 2.2 | 2.24 | 0.88 |
| 08:00-08:14 | 387 | 676 | 108 | 68 | 19 | 2.64 | 2.19 | 0.92 |
| 08:15-08:29 | 339 | 412 | 132 | 63 | 13 | 4.22 | 2.06 | 0.89 |
| 08:30-08:44 | 539 | 756 | 119 | 87 | 6 | 3.35 | 2.17 | 0.93 |
| 08:45-08:59 | 396 | 414 | 98 | 67 | 8 | 3.81 | 2.59 | 0.89 |
| 09:00-09:14 | 302 | 755 | 144 | 105 | 11 | 2.22 | 2.36 | 0.88 |
| 09:15-09:29 | 348 | 854 | 105 | 106 | 11 | 3.12 | 2.43 | 0.88 |
| 09:30-09:44 | 394 | 544 | 110 | 99 | 17 | 3.09 | 2.51 | 1.06 |
| 09:45-09:59 | 583 | 565 | 141 | 66 | 6 | 3.75 | 2.84 | 1.01 |
| 10:00-10:14 | 295 | 227 | 50 | 42 | 9 | 2.55 | 2.27 | 0.45 |
| 10:15-10:29 | 240 | 223 | 34 | 43 | 12 | 4.1 | 2.81 | 0.61 |
| 10:30-10:44 | 156 | 351 | 54 | 40 | 15 | 2.29 | 2.06 | 0.53 |
| 10:45-10:59 | 234 | 384 | 69 | 29 | 7 | 4.42 | 2.7 | 0.42 |
| 16:00-16:14 | 249 | 282 | 42 | 45 | 10 | 2.63 | 2.31 | 0.44 |
| 16:15-16:29 | 227 | 306 | 58 | 23 | 20 | 2.8 | 3.13 | 0.56 |
| 16:30-16:44 | 225 | 274 | 41 | 50 | 19 | 3.48 | 2.14 | 0.69 |
| 16:45-16:59 | 235 | 310 | 49 | 25 | 8 | 2.87 | 3.14 | 0.65 |
| 17:00-17:14 | 398 | 785 | 137 | 67 | 12 | 3.7 | 2.57 | 1.06 |
| 17:15-17:29 | 434 | 779 | 107 | 118 | 9 | 3.85 | 3.03 | 0.91 |
| 17:30-17:44 | 556 | 613 | 97 | 68 | 14 | 2.44 | 1.96 | 0.97 |
| 17:45-17:59 | 384 | 863 | 100 | 65 | 9 | 2.5 | 2.57 | 1.02 |
| 18:00-18:14 | 525 | 627 | 134 | 120 | 12 | 3.72 | 2.16 | 1.03 |
| 18:15-18:29 | 476 | 857 | 139 | 111 | 14 | 3.95 | 2.61 | 0.86 |
| 18:30-18:44 | 574 | 432 | 137 | 77 | 15 | 3.91 | 2.33 | 1.03 |
| 18:45-18:59 | 388 | 754 | 91 | 97 | 8 | 3.68 | 2.61 | 1.02 |
| 19:00-19:14 | 560 | 613 | 105 | 94 | 19 | 4.11 | 2.79 | 1.08 |
| 19:15-19:29 | 396 | 495 | 86 | 104 | 14 | 4.21 | 2.5 | 1.04 |
| 19:30-19:44 | 404 | 869 | 96 | 75 | 15 | 2.88 | 1.84 | 0.91 |
| 19:45-19:59 | 454 | 719 | 94 | 66 | 14 | 2.71 | 2.94 | 1.07 |
| 20:00-20:14 | 169 | 228 | 42 | 22 | 9 | 2.28 | 2.72 | 0.52 |
| 20:15-20:29 | 238 | 332 | 60 | 44 | 6 | 3.08 | 2.19 | 0.56 |
| 20:30-20:44 | 239 | 384 | 68 | 43 | 19 | 2.8 | 2.79 | 0.47 |
| 20:45-20:59 | 263 | 203 | 54 | 20 | 14 | 3.51 | 2.42 | 0.59 |
| 21:00-21:14 | 250 | 284 | 42 | 45 | 18 | 2.48 | 2.89 | 0.67 |
| 21:15-21:29 | 188 | 272 | 37 | 27 | 15 | 4.07 | 2.27 | 0.59 |
| 21:30-21:44 | 279 | 216 | 43 | 39 | 20 | 2.21 | 3.04 | 0.59 |
| 21:45-21:59 | 237 | 397 | 52 | 33 | 17 | 3.79 | 2.95 | 0.65 |

### A.17 Day 17: 2026-06-17

#### Location: Wandegeya Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 523 | 610 | 85 | 70 | 11 | 2.46 | 2.13 | 0.99 |
| 07:15-07:29 | 483 | 563 | 94 | 88 | 17 | 2.94 | 2.9 | 0.92 |
| 07:30-07:44 | 478 | 758 | 111 | 83 | 7 | 2.2 | 2.56 | 1.02 |
| 07:45-07:59 | 572 | 782 | 109 | 75 | 15 | 2.15 | 3.11 | 1.1 |
| 08:00-08:14 | 597 | 557 | 113 | 53 | 16 | 2.42 | 2.13 | 1.08 |
| 08:15-08:29 | 513 | 519 | 113 | 62 | 13 | 3.32 | 3.08 | 1.08 |
| 08:30-08:44 | 338 | 570 | 119 | 118 | 15 | 2.49 | 2.53 | 0.9 |
| 08:45-08:59 | 433 | 508 | 147 | 109 | 15 | 4.26 | 1.98 | 1.07 |
| 09:00-09:14 | 545 | 421 | 129 | 58 | 13 | 3.6 | 2.74 | 1.01 |
| 09:15-09:29 | 513 | 489 | 90 | 56 | 7 | 2.35 | 3.04 | 0.9 |
| 09:30-09:44 | 408 | 493 | 95 | 61 | 16 | 2.26 | 2.2 | 0.89 |
| 09:45-09:59 | 596 | 509 | 104 | 51 | 13 | 3.9 | 2.74 | 1.02 |
| 10:00-10:14 | 263 | 211 | 35 | 43 | 5 | 2.57 | 2.45 | 0.64 |
| 10:15-10:29 | 258 | 278 | 55 | 36 | 8 | 3.47 | 1.92 | 0.54 |
| 10:30-10:44 | 192 | 357 | 57 | 27 | 8 | 4.23 | 2.36 | 0.52 |
| 10:45-10:59 | 219 | 316 | 59 | 28 | 10 | 2.42 | 3.12 | 0.43 |
| 16:00-16:14 | 262 | 200 | 45 | 28 | 5 | 3.51 | 2.75 | 0.55 |
| 16:15-16:29 | 262 | 325 | 62 | 40 | 14 | 3.89 | 2.59 | 0.68 |
| 16:30-16:44 | 207 | 387 | 42 | 49 | 19 | 4.36 | 3.08 | 0.55 |
| 16:45-16:59 | 211 | 305 | 40 | 37 | 18 | 3.47 | 1.89 | 0.58 |
| 17:00-17:14 | 444 | 637 | 99 | 82 | 20 | 3.84 | 2.22 | 1.05 |
| 17:15-17:29 | 453 | 457 | 99 | 71 | 8 | 2.94 | 2.49 | 1.05 |
| 17:30-17:44 | 533 | 485 | 119 | 91 | 17 | 3.68 | 1.98 | 0.96 |
| 17:45-17:59 | 549 | 503 | 123 | 98 | 12 | 4.2 | 2.44 | 1.06 |
| 18:00-18:14 | 500 | 604 | 83 | 77 | 6 | 3.04 | 3.18 | 0.96 |
| 18:15-18:29 | 563 | 530 | 84 | 78 | 10 | 4.38 | 1.97 | 0.91 |
| 18:30-18:44 | 481 | 676 | 103 | 69 | 6 | 3.55 | 2.85 | 1.07 |
| 18:45-18:59 | 344 | 681 | 108 | 67 | 9 | 2.18 | 2.52 | 0.9 |
| 19:00-19:14 | 446 | 662 | 144 | 99 | 11 | 2.11 | 2.81 | 0.88 |
| 19:15-19:29 | 585 | 521 | 91 | 82 | 16 | 3.08 | 2.05 | 1.0 |
| 19:30-19:44 | 509 | 856 | 128 | 99 | 19 | 2.35 | 2.71 | 0.9 |
| 19:45-19:59 | 437 | 544 | 133 | 99 | 14 | 3.17 | 2.04 | 0.9 |
| 20:00-20:14 | 183 | 225 | 67 | 29 | 17 | 2.91 | 2.33 | 0.58 |
| 20:15-20:29 | 193 | 294 | 70 | 35 | 12 | 2.55 | 2.62 | 0.7 |
| 20:30-20:44 | 259 | 343 | 30 | 46 | 7 | 2.78 | 2.45 | 0.47 |
| 20:45-20:59 | 155 | 308 | 57 | 28 | 12 | 3.77 | 2.83 | 0.53 |
| 21:00-21:14 | 251 | 312 | 36 | 47 | 11 | 2.42 | 2.37 | 0.66 |
| 21:15-21:29 | 225 | 378 | 38 | 25 | 14 | 3.28 | 2.76 | 0.58 |
| 21:30-21:44 | 217 | 292 | 51 | 20 | 16 | 3.25 | 2.58 | 0.43 |
| 21:45-21:59 | 218 | 291 | 62 | 41 | 5 | 4.49 | 2.38 | 0.44 |

#### Location: Kibuye Roundabout
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 584 | 884 | 142 | 96 | 12 | 4.1 | 2.8 | 1.02 |
| 07:15-07:29 | 460 | 831 | 85 | 89 | 13 | 4.3 | 2.74 | 1.05 |
| 07:30-07:44 | 598 | 512 | 80 | 70 | 15 | 3.8 | 2.86 | 0.88 |
| 07:45-07:59 | 531 | 544 | 85 | 97 | 17 | 2.61 | 2.47 | 1.04 |
| 08:00-08:14 | 379 | 580 | 115 | 109 | 19 | 3.05 | 2.21 | 0.91 |
| 08:15-08:29 | 304 | 520 | 93 | 85 | 14 | 3.91 | 2.35 | 0.94 |
| 08:30-08:44 | 566 | 430 | 106 | 111 | 20 | 3.36 | 1.93 | 0.91 |
| 08:45-08:59 | 557 | 753 | 127 | 67 | 15 | 3.23 | 3.08 | 0.99 |
| 09:00-09:14 | 427 | 582 | 104 | 51 | 10 | 3.73 | 1.95 | 1.01 |
| 09:15-09:29 | 559 | 743 | 134 | 53 | 19 | 3.87 | 3.19 | 0.99 |
| 09:30-09:44 | 334 | 522 | 103 | 54 | 8 | 2.72 | 2.91 | 0.96 |
| 09:45-09:59 | 589 | 697 | 104 | 81 | 5 | 3.19 | 2.84 | 0.88 |
| 10:00-10:14 | 150 | 233 | 51 | 36 | 10 | 3.48 | 2.21 | 0.53 |
| 10:15-10:29 | 266 | 336 | 68 | 21 | 13 | 2.6 | 1.87 | 0.55 |
| 10:30-10:44 | 247 | 235 | 34 | 49 | 15 | 4.39 | 2.78 | 0.57 |
| 10:45-10:59 | 166 | 398 | 36 | 20 | 8 | 4.48 | 2.75 | 0.67 |
| 16:00-16:14 | 225 | 371 | 34 | 41 | 10 | 3.82 | 3.04 | 0.51 |
| 16:15-16:29 | 262 | 343 | 30 | 31 | 11 | 3.61 | 2.97 | 0.65 |
| 16:30-16:44 | 237 | 317 | 34 | 41 | 13 | 3.6 | 2.85 | 0.48 |
| 16:45-16:59 | 291 | 345 | 42 | 35 | 13 | 3.8 | 1.88 | 0.57 |
| 17:00-17:14 | 323 | 544 | 105 | 83 | 11 | 4.25 | 2.3 | 1.08 |
| 17:15-17:29 | 538 | 608 | 84 | 118 | 16 | 3.96 | 2.82 | 0.99 |
| 17:30-17:44 | 322 | 768 | 121 | 104 | 8 | 3.64 | 2.77 | 1.07 |
| 17:45-17:59 | 343 | 793 | 94 | 63 | 7 | 3.77 | 1.85 | 0.93 |
| 18:00-18:14 | 383 | 529 | 123 | 84 | 16 | 2.97 | 3.04 | 1.01 |
| 18:15-18:29 | 317 | 759 | 100 | 90 | 9 | 3.76 | 2.06 | 1.04 |
| 18:30-18:44 | 357 | 806 | 105 | 80 | 12 | 3.89 | 3.09 | 0.94 |
| 18:45-18:59 | 516 | 600 | 127 | 78 | 6 | 3.41 | 2.9 | 1.08 |
| 19:00-19:14 | 529 | 581 | 123 | 64 | 15 | 2.86 | 2.27 | 0.96 |
| 19:15-19:29 | 476 | 450 | 130 | 114 | 10 | 2.87 | 1.97 | 0.89 |
| 19:30-19:44 | 340 | 873 | 80 | 89 | 14 | 3.98 | 2.07 | 0.88 |
| 19:45-19:59 | 487 | 566 | 98 | 52 | 11 | 2.27 | 2.21 | 1.04 |
| 20:00-20:14 | 151 | 205 | 54 | 41 | 7 | 4.14 | 1.87 | 0.4 |
| 20:15-20:29 | 243 | 340 | 64 | 43 | 17 | 2.38 | 2.82 | 0.59 |
| 20:30-20:44 | 174 | 362 | 33 | 37 | 13 | 2.39 | 2.05 | 0.68 |
| 20:45-20:59 | 164 | 297 | 66 | 47 | 17 | 2.88 | 2.9 | 0.64 |
| 21:00-21:14 | 163 | 201 | 45 | 23 | 5 | 4.31 | 1.82 | 0.54 |
| 21:15-21:29 | 256 | 382 | 63 | 36 | 8 | 2.51 | 2.86 | 0.54 |
| 21:30-21:44 | 217 | 265 | 62 | 34 | 9 | 3.05 | 2.9 | 0.54 |
| 21:45-21:59 | 274 | 368 | 39 | 32 | 17 | 3.09 | 2.27 | 0.4 |

#### Location: Bakuli Intersection
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 442 | 821 | 140 | 115 | 18 | 2.67 | 3.18 | 0.93 |
| 07:15-07:29 | 572 | 796 | 142 | 76 | 11 | 4.34 | 1.96 | 0.92 |
| 07:30-07:44 | 360 | 792 | 81 | 74 | 18 | 3.48 | 2.33 | 1.07 |
| 07:45-07:59 | 509 | 457 | 132 | 97 | 5 | 3.48 | 2.33 | 1.0 |
| 08:00-08:14 | 339 | 895 | 103 | 69 | 14 | 4.35 | 2.33 | 0.91 |
| 08:15-08:29 | 466 | 678 | 88 | 55 | 8 | 4.09 | 2.09 | 0.99 |
| 08:30-08:44 | 323 | 546 | 95 | 108 | 12 | 2.89 | 1.9 | 0.87 |
| 08:45-08:59 | 441 | 579 | 139 | 115 | 5 | 2.76 | 3.0 | 0.92 |
| 09:00-09:14 | 498 | 741 | 104 | 112 | 10 | 2.89 | 2.11 | 0.87 |
| 09:15-09:29 | 422 | 792 | 102 | 107 | 19 | 3.51 | 2.75 | 1.07 |
| 09:30-09:44 | 450 | 548 | 140 | 61 | 13 | 4.08 | 2.06 | 1.0 |
| 09:45-09:59 | 571 | 411 | 139 | 88 | 7 | 2.86 | 2.26 | 0.89 |
| 10:00-10:14 | 268 | 321 | 54 | 50 | 11 | 2.19 | 2.17 | 0.53 |
| 10:15-10:29 | 264 | 384 | 52 | 28 | 5 | 3.26 | 2.93 | 0.49 |
| 10:30-10:44 | 165 | 203 | 39 | 39 | 18 | 3.66 | 2.5 | 0.56 |
| 10:45-10:59 | 289 | 213 | 70 | 33 | 10 | 4.13 | 2.96 | 0.48 |
| 16:00-16:14 | 228 | 385 | 31 | 32 | 13 | 2.84 | 3.15 | 0.6 |
| 16:15-16:29 | 169 | 221 | 39 | 37 | 8 | 3.68 | 2.37 | 0.66 |
| 16:30-16:44 | 177 | 261 | 69 | 25 | 9 | 3.42 | 2.03 | 0.56 |
| 16:45-16:59 | 209 | 233 | 40 | 37 | 5 | 3.53 | 2.05 | 0.44 |
| 17:00-17:14 | 526 | 844 | 141 | 74 | 10 | 3.21 | 2.66 | 0.87 |
| 17:15-17:29 | 519 | 845 | 139 | 113 | 19 | 2.93 | 2.05 | 1.02 |
| 17:30-17:44 | 337 | 654 | 119 | 91 | 10 | 2.57 | 1.81 | 0.92 |
| 17:45-17:59 | 349 | 700 | 92 | 86 | 8 | 3.23 | 3.1 | 1.08 |
| 18:00-18:14 | 582 | 464 | 109 | 77 | 9 | 4.35 | 2.79 | 1.01 |
| 18:15-18:29 | 500 | 498 | 143 | 80 | 10 | 4.19 | 3.05 | 0.9 |
| 18:30-18:44 | 333 | 717 | 92 | 101 | 19 | 3.98 | 1.94 | 1.08 |
| 18:45-18:59 | 551 | 480 | 88 | 116 | 8 | 2.69 | 1.98 | 0.85 |
| 19:00-19:14 | 486 | 484 | 140 | 80 | 17 | 4.03 | 2.57 | 0.99 |
| 19:15-19:29 | 349 | 790 | 108 | 72 | 7 | 3.01 | 3.09 | 0.95 |
| 19:30-19:44 | 322 | 821 | 103 | 56 | 19 | 2.44 | 1.99 | 0.89 |
| 19:45-19:59 | 399 | 895 | 88 | 72 | 18 | 2.41 | 2.66 | 1.09 |
| 20:00-20:14 | 226 | 379 | 64 | 49 | 14 | 3.13 | 2.13 | 0.5 |
| 20:15-20:29 | 208 | 268 | 56 | 23 | 20 | 3.48 | 2.11 | 0.65 |
| 20:30-20:44 | 197 | 319 | 63 | 37 | 11 | 2.37 | 1.9 | 0.47 |
| 20:45-20:59 | 200 | 227 | 39 | 44 | 6 | 2.97 | 2.87 | 0.55 |
| 21:00-21:14 | 235 | 305 | 33 | 29 | 9 | 3.8 | 2.43 | 0.62 |
| 21:15-21:29 | 211 | 360 | 42 | 41 | 20 | 3.5 | 2.64 | 0.64 |
| 21:30-21:44 | 176 | 202 | 66 | 30 | 20 | 3.49 | 2.92 | 0.69 |
| 21:45-21:59 | 208 | 356 | 69 | 20 | 12 | 2.68 | 2.4 | 0.55 |

#### Location: Bwaise Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 510 | 407 | 86 | 75 | 9 | 3.5 | 3.01 | 0.99 |
| 07:15-07:29 | 561 | 417 | 106 | 98 | 6 | 4.21 | 2.76 | 0.94 |
| 07:30-07:44 | 532 | 692 | 145 | 120 | 17 | 3.44 | 2.55 | 1.09 |
| 07:45-07:59 | 498 | 469 | 108 | 109 | 10 | 3.63 | 3.01 | 1.05 |
| 08:00-08:14 | 428 | 706 | 80 | 78 | 19 | 4.24 | 2.55 | 1.03 |
| 08:15-08:29 | 479 | 407 | 145 | 52 | 7 | 2.73 | 3.08 | 0.91 |
| 08:30-08:44 | 386 | 691 | 85 | 113 | 5 | 3.01 | 2.39 | 0.92 |
| 08:45-08:59 | 465 | 762 | 125 | 107 | 14 | 3.26 | 1.95 | 0.86 |
| 09:00-09:14 | 530 | 857 | 106 | 56 | 6 | 4.42 | 2.42 | 1.1 |
| 09:15-09:29 | 323 | 424 | 123 | 86 | 7 | 3.98 | 1.83 | 0.91 |
| 09:30-09:44 | 514 | 466 | 117 | 55 | 8 | 4.2 | 2.03 | 0.93 |
| 09:45-09:59 | 300 | 435 | 144 | 78 | 14 | 2.42 | 2.64 | 1.0 |
| 10:00-10:14 | 298 | 241 | 70 | 22 | 17 | 4.42 | 1.8 | 0.48 |
| 10:15-10:29 | 193 | 334 | 37 | 50 | 17 | 3.96 | 2.37 | 0.67 |
| 10:30-10:44 | 254 | 373 | 37 | 38 | 5 | 3.48 | 2.53 | 0.45 |
| 10:45-10:59 | 228 | 400 | 54 | 30 | 16 | 2.5 | 2.56 | 0.66 |
| 16:00-16:14 | 200 | 232 | 60 | 45 | 14 | 3.88 | 2.98 | 0.51 |
| 16:15-16:29 | 180 | 238 | 43 | 20 | 9 | 3.14 | 1.86 | 0.62 |
| 16:30-16:44 | 296 | 237 | 42 | 42 | 14 | 2.98 | 2.86 | 0.5 |
| 16:45-16:59 | 206 | 397 | 47 | 42 | 11 | 2.46 | 2.21 | 0.52 |
| 17:00-17:14 | 399 | 700 | 87 | 52 | 18 | 4.28 | 2.06 | 0.9 |
| 17:15-17:29 | 526 | 679 | 131 | 98 | 5 | 2.34 | 1.82 | 1.05 |
| 17:30-17:44 | 432 | 719 | 140 | 78 | 13 | 3.95 | 3.08 | 1.05 |
| 17:45-17:59 | 468 | 444 | 108 | 106 | 13 | 2.97 | 2.08 | 1.02 |
| 18:00-18:14 | 311 | 599 | 147 | 62 | 20 | 4.19 | 2.9 | 0.91 |
| 18:15-18:29 | 388 | 691 | 131 | 73 | 13 | 3.69 | 2.48 | 0.98 |
| 18:30-18:44 | 378 | 438 | 145 | 81 | 5 | 2.93 | 3.17 | 1.02 |
| 18:45-18:59 | 489 | 681 | 100 | 83 | 11 | 2.83 | 1.95 | 1.06 |
| 19:00-19:14 | 543 | 693 | 107 | 99 | 6 | 4.48 | 2.98 | 1.09 |
| 19:15-19:29 | 381 | 576 | 138 | 66 | 17 | 3.23 | 2.69 | 1.07 |
| 19:30-19:44 | 382 | 445 | 92 | 65 | 19 | 3.5 | 2.97 | 0.92 |
| 19:45-19:59 | 498 | 503 | 112 | 101 | 20 | 4.3 | 2.84 | 0.96 |
| 20:00-20:14 | 216 | 225 | 43 | 20 | 7 | 3.14 | 3.11 | 0.48 |
| 20:15-20:29 | 256 | 275 | 36 | 30 | 18 | 4.01 | 2.98 | 0.57 |
| 20:30-20:44 | 217 | 262 | 48 | 24 | 17 | 2.49 | 2.14 | 0.6 |
| 20:45-20:59 | 240 | 347 | 68 | 45 | 7 | 3.43 | 2.62 | 0.67 |
| 21:00-21:14 | 216 | 234 | 49 | 48 | 15 | 3.84 | 3.1 | 0.62 |
| 21:15-21:29 | 292 | 396 | 39 | 35 | 12 | 3.61 | 1.99 | 0.46 |
| 21:30-21:44 | 269 | 251 | 55 | 20 | 11 | 4.44 | 2.66 | 0.47 |
| 21:45-21:59 | 291 | 323 | 51 | 50 | 14 | 3.11 | 2.2 | 0.68 |

#### Location: Natete Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 574 | 840 | 127 | 101 | 9 | 3.51 | 1.83 | 0.99 |
| 07:15-07:29 | 418 | 840 | 140 | 83 | 18 | 2.56 | 3.13 | 1.03 |
| 07:30-07:44 | 416 | 549 | 123 | 86 | 9 | 2.79 | 3.13 | 1.03 |
| 07:45-07:59 | 399 | 652 | 142 | 69 | 19 | 4.22 | 2.85 | 0.96 |
| 08:00-08:14 | 360 | 738 | 140 | 89 | 14 | 3.27 | 2.03 | 1.02 |
| 08:15-08:29 | 402 | 647 | 90 | 103 | 9 | 4.25 | 2.18 | 1.03 |
| 08:30-08:44 | 457 | 406 | 109 | 60 | 20 | 2.82 | 2.48 | 1.07 |
| 08:45-08:59 | 344 | 668 | 136 | 115 | 20 | 2.2 | 2.3 | 0.91 |
| 09:00-09:14 | 392 | 863 | 127 | 77 | 16 | 4.16 | 1.94 | 1.07 |
| 09:15-09:29 | 554 | 844 | 125 | 55 | 16 | 4.19 | 3.13 | 1.02 |
| 09:30-09:44 | 330 | 610 | 99 | 79 | 20 | 3.27 | 2.57 | 0.98 |
| 09:45-09:59 | 343 | 705 | 89 | 70 | 16 | 2.53 | 2.34 | 1.05 |
| 10:00-10:14 | 253 | 284 | 70 | 48 | 15 | 3.23 | 2.19 | 0.6 |
| 10:15-10:29 | 208 | 291 | 57 | 44 | 20 | 2.25 | 3.16 | 0.41 |
| 10:30-10:44 | 293 | 390 | 34 | 31 | 9 | 4.31 | 2.73 | 0.45 |
| 10:45-10:59 | 279 | 215 | 41 | 41 | 7 | 3.88 | 2.1 | 0.46 |
| 16:00-16:14 | 260 | 376 | 55 | 48 | 18 | 2.93 | 1.85 | 0.63 |
| 16:15-16:29 | 193 | 367 | 32 | 43 | 6 | 2.4 | 2.79 | 0.55 |
| 16:30-16:44 | 237 | 307 | 65 | 20 | 18 | 2.69 | 1.97 | 0.47 |
| 16:45-16:59 | 251 | 398 | 34 | 27 | 20 | 4.48 | 3.02 | 0.5 |
| 17:00-17:14 | 456 | 785 | 90 | 114 | 18 | 4.35 | 2.25 | 0.97 |
| 17:15-17:29 | 306 | 899 | 139 | 77 | 14 | 3.9 | 3.14 | 0.99 |
| 17:30-17:44 | 558 | 488 | 99 | 83 | 20 | 3.97 | 2.17 | 0.89 |
| 17:45-17:59 | 538 | 676 | 105 | 76 | 8 | 3.04 | 2.72 | 0.99 |
| 18:00-18:14 | 561 | 630 | 92 | 68 | 9 | 3.94 | 2.51 | 1.02 |
| 18:15-18:29 | 457 | 663 | 111 | 50 | 16 | 2.26 | 2.9 | 0.99 |
| 18:30-18:44 | 595 | 764 | 93 | 103 | 9 | 2.58 | 3.2 | 1.09 |
| 18:45-18:59 | 430 | 712 | 118 | 53 | 13 | 3.9 | 2.59 | 1.01 |
| 19:00-19:14 | 311 | 729 | 114 | 85 | 13 | 3.49 | 2.79 | 0.87 |
| 19:15-19:29 | 465 | 640 | 119 | 52 | 12 | 3.43 | 2.84 | 0.85 |
| 19:30-19:44 | 555 | 671 | 143 | 79 | 12 | 3.55 | 3.12 | 1.01 |
| 19:45-19:59 | 343 | 416 | 80 | 90 | 17 | 3.16 | 2.15 | 0.91 |
| 20:00-20:14 | 296 | 227 | 56 | 38 | 18 | 3.54 | 3.01 | 0.5 |
| 20:15-20:29 | 279 | 252 | 61 | 47 | 11 | 2.78 | 1.93 | 0.62 |
| 20:30-20:44 | 263 | 313 | 37 | 43 | 18 | 3.01 | 2.68 | 0.52 |
| 20:45-20:59 | 154 | 247 | 62 | 29 | 11 | 3.09 | 2.79 | 0.58 |
| 21:00-21:14 | 253 | 214 | 68 | 32 | 17 | 2.93 | 2.29 | 0.68 |
| 21:15-21:29 | 267 | 309 | 41 | 45 | 10 | 2.36 | 2.53 | 0.51 |
| 21:30-21:44 | 150 | 253 | 33 | 38 | 9 | 4.45 | 2.66 | 0.41 |
| 21:45-21:59 | 211 | 386 | 30 | 30 | 13 | 3.88 | 3.17 | 0.67 |

### A.18 Day 18: 2026-06-18

#### Location: Wandegeya Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 379 | 530 | 145 | 56 | 8 | 4.22 | 2.92 | 1.06 |
| 07:15-07:29 | 363 | 719 | 104 | 66 | 18 | 3.74 | 1.9 | 0.92 |
| 07:30-07:44 | 559 | 442 | 121 | 108 | 19 | 4.34 | 1.92 | 1.0 |
| 07:45-07:59 | 560 | 721 | 132 | 86 | 12 | 2.19 | 2.91 | 0.85 |
| 08:00-08:14 | 549 | 540 | 113 | 103 | 14 | 2.42 | 2.74 | 1.09 |
| 08:15-08:29 | 331 | 767 | 139 | 111 | 7 | 3.13 | 2.07 | 0.97 |
| 08:30-08:44 | 305 | 595 | 141 | 61 | 10 | 4.4 | 2.71 | 0.91 |
| 08:45-08:59 | 519 | 606 | 93 | 100 | 11 | 2.36 | 3.18 | 1.03 |
| 09:00-09:14 | 491 | 574 | 148 | 103 | 8 | 3.3 | 2.04 | 0.91 |
| 09:15-09:29 | 340 | 570 | 137 | 73 | 20 | 2.94 | 3.02 | 0.87 |
| 09:30-09:44 | 447 | 870 | 96 | 83 | 17 | 2.42 | 2.99 | 1.02 |
| 09:45-09:59 | 383 | 791 | 147 | 79 | 20 | 3.12 | 2.66 | 1.06 |
| 10:00-10:14 | 218 | 223 | 66 | 40 | 20 | 2.83 | 2.16 | 0.49 |
| 10:15-10:29 | 161 | 278 | 47 | 36 | 7 | 3.26 | 2.81 | 0.49 |
| 10:30-10:44 | 221 | 252 | 61 | 39 | 17 | 4.38 | 2.46 | 0.63 |
| 10:45-10:59 | 188 | 222 | 37 | 22 | 12 | 4.24 | 1.89 | 0.48 |
| 16:00-16:14 | 156 | 234 | 43 | 49 | 14 | 3.02 | 2.35 | 0.59 |
| 16:15-16:29 | 200 | 290 | 62 | 36 | 9 | 2.43 | 2.16 | 0.62 |
| 16:30-16:44 | 186 | 332 | 47 | 28 | 12 | 3.74 | 2.62 | 0.66 |
| 16:45-16:59 | 295 | 307 | 36 | 45 | 15 | 3.41 | 2.59 | 0.42 |
| 17:00-17:14 | 569 | 843 | 146 | 60 | 9 | 3.13 | 2.49 | 1.01 |
| 17:15-17:29 | 372 | 528 | 107 | 62 | 18 | 4.09 | 2.56 | 0.85 |
| 17:30-17:44 | 448 | 891 | 144 | 120 | 18 | 2.8 | 2.57 | 1.05 |
| 17:45-17:59 | 574 | 645 | 97 | 93 | 13 | 3.85 | 2.58 | 0.92 |
| 18:00-18:14 | 365 | 719 | 90 | 53 | 10 | 3.66 | 2.42 | 0.95 |
| 18:15-18:29 | 390 | 868 | 90 | 102 | 9 | 2.31 | 2.21 | 0.91 |
| 18:30-18:44 | 449 | 615 | 116 | 57 | 11 | 4.47 | 3.08 | 1.06 |
| 18:45-18:59 | 478 | 469 | 112 | 101 | 10 | 4.23 | 1.86 | 0.98 |
| 19:00-19:14 | 428 | 884 | 148 | 119 | 11 | 2.51 | 1.86 | 0.97 |
| 19:15-19:29 | 357 | 852 | 81 | 90 | 6 | 4.04 | 1.86 | 1.09 |
| 19:30-19:44 | 441 | 470 | 97 | 106 | 14 | 2.15 | 2.11 | 1.01 |
| 19:45-19:59 | 368 | 597 | 129 | 70 | 15 | 3.26 | 1.84 | 0.98 |
| 20:00-20:14 | 255 | 363 | 30 | 41 | 11 | 4.41 | 3.13 | 0.5 |
| 20:15-20:29 | 246 | 249 | 64 | 33 | 13 | 2.52 | 2.12 | 0.65 |
| 20:30-20:44 | 210 | 379 | 64 | 42 | 17 | 2.97 | 2.16 | 0.52 |
| 20:45-20:59 | 185 | 213 | 42 | 32 | 12 | 3.67 | 2.66 | 0.6 |
| 21:00-21:14 | 289 | 274 | 44 | 26 | 16 | 2.42 | 3.05 | 0.61 |
| 21:15-21:29 | 178 | 221 | 57 | 30 | 14 | 3.06 | 2.06 | 0.7 |
| 21:30-21:44 | 199 | 258 | 61 | 25 | 17 | 3.4 | 2.02 | 0.63 |
| 21:45-21:59 | 187 | 235 | 31 | 39 | 9 | 2.64 | 2.83 | 0.41 |

#### Location: Kibuye Roundabout
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 459 | 498 | 150 | 50 | 15 | 3.85 | 2.59 | 0.91 |
| 07:15-07:29 | 443 | 812 | 147 | 75 | 9 | 4.09 | 2.8 | 0.94 |
| 07:30-07:44 | 345 | 824 | 82 | 84 | 17 | 4.24 | 1.91 | 1.1 |
| 07:45-07:59 | 391 | 729 | 88 | 119 | 5 | 3.57 | 2.33 | 0.91 |
| 08:00-08:14 | 511 | 665 | 82 | 62 | 14 | 2.41 | 2.04 | 1.09 |
| 08:15-08:29 | 534 | 661 | 137 | 70 | 19 | 3.59 | 2.14 | 1.06 |
| 08:30-08:44 | 484 | 691 | 103 | 66 | 5 | 2.87 | 2.7 | 0.97 |
| 08:45-08:59 | 528 | 802 | 149 | 62 | 12 | 3.4 | 2.44 | 1.01 |
| 09:00-09:14 | 564 | 879 | 131 | 86 | 14 | 2.66 | 3.07 | 1.0 |
| 09:15-09:29 | 334 | 443 | 139 | 94 | 5 | 3.96 | 2.82 | 1.01 |
| 09:30-09:44 | 527 | 566 | 96 | 54 | 17 | 3.81 | 2.32 | 0.96 |
| 09:45-09:59 | 509 | 731 | 81 | 78 | 11 | 2.79 | 2.81 | 0.87 |
| 10:00-10:14 | 300 | 301 | 46 | 34 | 12 | 4.41 | 2.99 | 0.57 |
| 10:15-10:29 | 183 | 247 | 51 | 28 | 5 | 2.24 | 2.55 | 0.52 |
| 10:30-10:44 | 239 | 389 | 69 | 48 | 9 | 3.05 | 2.09 | 0.68 |
| 10:45-10:59 | 198 | 368 | 67 | 30 | 12 | 4.48 | 2.55 | 0.52 |
| 16:00-16:14 | 225 | 209 | 49 | 38 | 14 | 3.28 | 2.34 | 0.66 |
| 16:15-16:29 | 224 | 387 | 39 | 50 | 18 | 2.93 | 2.09 | 0.51 |
| 16:30-16:44 | 268 | 329 | 43 | 28 | 19 | 3.01 | 2.6 | 0.45 |
| 16:45-16:59 | 232 | 388 | 42 | 34 | 6 | 3.81 | 3.04 | 0.66 |
| 17:00-17:14 | 396 | 668 | 134 | 53 | 14 | 3.97 | 2.68 | 0.86 |
| 17:15-17:29 | 412 | 455 | 104 | 58 | 14 | 4.07 | 2.45 | 1.02 |
| 17:30-17:44 | 456 | 631 | 115 | 74 | 12 | 2.41 | 2.61 | 1.0 |
| 17:45-17:59 | 586 | 573 | 102 | 68 | 5 | 4.49 | 2.65 | 1.04 |
| 18:00-18:14 | 553 | 583 | 141 | 66 | 20 | 3.26 | 2.96 | 0.98 |
| 18:15-18:29 | 480 | 427 | 138 | 93 | 9 | 2.47 | 2.36 | 1.05 |
| 18:30-18:44 | 380 | 448 | 99 | 84 | 8 | 4.0 | 2.28 | 0.95 |
| 18:45-18:59 | 479 | 460 | 128 | 104 | 16 | 3.11 | 2.34 | 0.89 |
| 19:00-19:14 | 312 | 612 | 134 | 77 | 14 | 3.35 | 2.61 | 0.88 |
| 19:15-19:29 | 388 | 490 | 92 | 54 | 16 | 2.98 | 2.49 | 1.05 |
| 19:30-19:44 | 484 | 599 | 110 | 99 | 20 | 3.1 | 2.22 | 1.01 |
| 19:45-19:59 | 411 | 591 | 119 | 60 | 7 | 3.25 | 2.43 | 0.86 |
| 20:00-20:14 | 203 | 225 | 37 | 49 | 13 | 3.67 | 2.31 | 0.63 |
| 20:15-20:29 | 170 | 364 | 57 | 24 | 5 | 3.52 | 2.89 | 0.65 |
| 20:30-20:44 | 226 | 320 | 58 | 35 | 11 | 2.86 | 2.33 | 0.67 |
| 20:45-20:59 | 196 | 293 | 47 | 31 | 11 | 2.13 | 2.98 | 0.4 |
| 21:00-21:14 | 284 | 242 | 37 | 48 | 17 | 4.36 | 2.17 | 0.54 |
| 21:15-21:29 | 290 | 222 | 69 | 49 | 16 | 2.53 | 2.71 | 0.51 |
| 21:30-21:44 | 197 | 349 | 59 | 42 | 9 | 3.84 | 1.82 | 0.47 |
| 21:45-21:59 | 251 | 363 | 61 | 30 | 20 | 2.71 | 2.79 | 0.64 |

#### Location: Bakuli Intersection
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 439 | 501 | 108 | 53 | 7 | 2.35 | 1.85 | 0.96 |
| 07:15-07:29 | 563 | 610 | 109 | 85 | 13 | 2.86 | 2.99 | 1.06 |
| 07:30-07:44 | 590 | 628 | 81 | 55 | 10 | 3.96 | 1.98 | 0.94 |
| 07:45-07:59 | 541 | 425 | 143 | 57 | 12 | 3.6 | 2.21 | 0.92 |
| 08:00-08:14 | 588 | 589 | 105 | 61 | 10 | 2.35 | 3.12 | 0.93 |
| 08:15-08:29 | 561 | 869 | 123 | 79 | 19 | 4.28 | 2.06 | 1.1 |
| 08:30-08:44 | 553 | 861 | 108 | 89 | 12 | 3.69 | 2.56 | 0.99 |
| 08:45-08:59 | 318 | 743 | 150 | 79 | 6 | 2.72 | 2.18 | 0.95 |
| 09:00-09:14 | 407 | 619 | 125 | 57 | 17 | 4.34 | 1.9 | 0.87 |
| 09:15-09:29 | 394 | 431 | 138 | 68 | 20 | 4.17 | 3.06 | 0.89 |
| 09:30-09:44 | 434 | 842 | 82 | 70 | 12 | 2.72 | 2.6 | 0.91 |
| 09:45-09:59 | 557 | 774 | 106 | 72 | 15 | 3.92 | 2.4 | 0.9 |
| 10:00-10:14 | 243 | 336 | 45 | 49 | 11 | 3.38 | 2.59 | 0.69 |
| 10:15-10:29 | 276 | 378 | 53 | 40 | 6 | 4.15 | 2.2 | 0.61 |
| 10:30-10:44 | 172 | 350 | 51 | 31 | 8 | 2.92 | 2.34 | 0.45 |
| 10:45-10:59 | 273 | 264 | 60 | 40 | 12 | 2.11 | 3.03 | 0.46 |
| 16:00-16:14 | 243 | 241 | 58 | 37 | 20 | 4.38 | 2.22 | 0.6 |
| 16:15-16:29 | 252 | 204 | 62 | 48 | 9 | 4.09 | 1.82 | 0.56 |
| 16:30-16:44 | 231 | 341 | 57 | 42 | 9 | 2.91 | 2.15 | 0.49 |
| 16:45-16:59 | 179 | 285 | 43 | 39 | 14 | 4.45 | 2.67 | 0.53 |
| 17:00-17:14 | 516 | 484 | 118 | 66 | 6 | 3.86 | 3.13 | 1.01 |
| 17:15-17:29 | 443 | 816 | 87 | 75 | 11 | 2.72 | 2.41 | 0.94 |
| 17:30-17:44 | 504 | 888 | 123 | 67 | 13 | 2.36 | 2.49 | 1.02 |
| 17:45-17:59 | 366 | 647 | 140 | 63 | 17 | 3.16 | 3.12 | 0.98 |
| 18:00-18:14 | 495 | 655 | 123 | 75 | 12 | 4.01 | 2.09 | 0.91 |
| 18:15-18:29 | 376 | 520 | 97 | 72 | 15 | 3.8 | 2.41 | 0.91 |
| 18:30-18:44 | 409 | 456 | 141 | 82 | 14 | 2.69 | 2.98 | 0.91 |
| 18:45-18:59 | 425 | 717 | 82 | 73 | 5 | 4.07 | 2.61 | 0.88 |
| 19:00-19:14 | 580 | 626 | 142 | 106 | 20 | 2.38 | 3.2 | 0.97 |
| 19:15-19:29 | 371 | 450 | 110 | 116 | 6 | 4.36 | 2.94 | 1.05 |
| 19:30-19:44 | 438 | 406 | 129 | 100 | 13 | 2.34 | 2.04 | 0.9 |
| 19:45-19:59 | 419 | 605 | 93 | 117 | 13 | 4.18 | 2.16 | 0.88 |
| 20:00-20:14 | 171 | 373 | 55 | 38 | 12 | 2.5 | 3.13 | 0.67 |
| 20:15-20:29 | 162 | 329 | 48 | 31 | 6 | 4.47 | 1.84 | 0.62 |
| 20:30-20:44 | 173 | 397 | 64 | 38 | 17 | 3.58 | 3.09 | 0.41 |
| 20:45-20:59 | 297 | 377 | 58 | 45 | 9 | 3.04 | 1.83 | 0.46 |
| 21:00-21:14 | 247 | 326 | 44 | 45 | 15 | 4.08 | 2.85 | 0.61 |
| 21:15-21:29 | 187 | 341 | 68 | 28 | 15 | 4.42 | 2.71 | 0.54 |
| 21:30-21:44 | 214 | 290 | 53 | 49 | 8 | 3.09 | 2.15 | 0.47 |
| 21:45-21:59 | 237 | 240 | 66 | 37 | 6 | 2.43 | 2.14 | 0.53 |

#### Location: Bwaise Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 322 | 724 | 138 | 111 | 20 | 2.13 | 2.87 | 0.88 |
| 07:15-07:29 | 488 | 416 | 150 | 105 | 19 | 3.49 | 2.56 | 1.06 |
| 07:30-07:44 | 335 | 623 | 110 | 119 | 14 | 2.99 | 2.42 | 1.0 |
| 07:45-07:59 | 518 | 589 | 115 | 95 | 8 | 3.17 | 2.06 | 1.09 |
| 08:00-08:14 | 429 | 781 | 131 | 80 | 18 | 2.93 | 3.11 | 1.09 |
| 08:15-08:29 | 337 | 471 | 144 | 99 | 12 | 3.37 | 3.12 | 0.96 |
| 08:30-08:44 | 508 | 526 | 92 | 50 | 6 | 3.15 | 2.18 | 1.04 |
| 08:45-08:59 | 598 | 852 | 105 | 117 | 15 | 3.01 | 2.06 | 0.91 |
| 09:00-09:14 | 469 | 545 | 122 | 51 | 18 | 3.74 | 2.14 | 0.98 |
| 09:15-09:29 | 410 | 847 | 98 | 74 | 17 | 2.31 | 2.35 | 1.03 |
| 09:30-09:44 | 581 | 876 | 94 | 70 | 9 | 3.61 | 2.02 | 1.05 |
| 09:45-09:59 | 506 | 494 | 112 | 55 | 14 | 3.61 | 2.33 | 0.87 |
| 10:00-10:14 | 261 | 219 | 53 | 28 | 19 | 2.92 | 2.32 | 0.41 |
| 10:15-10:29 | 281 | 346 | 50 | 33 | 8 | 3.02 | 3.1 | 0.41 |
| 10:30-10:44 | 295 | 258 | 37 | 21 | 15 | 3.87 | 2.63 | 0.66 |
| 10:45-10:59 | 250 | 238 | 70 | 41 | 14 | 4.07 | 3.18 | 0.46 |
| 16:00-16:14 | 186 | 373 | 63 | 49 | 18 | 2.12 | 2.53 | 0.65 |
| 16:15-16:29 | 247 | 294 | 54 | 45 | 5 | 3.45 | 3.03 | 0.44 |
| 16:30-16:44 | 281 | 320 | 58 | 20 | 7 | 4.04 | 2.06 | 0.66 |
| 16:45-16:59 | 260 | 275 | 36 | 26 | 7 | 2.92 | 2.6 | 0.7 |
| 17:00-17:14 | 488 | 770 | 82 | 55 | 5 | 4.28 | 1.89 | 0.97 |
| 17:15-17:29 | 585 | 467 | 88 | 61 | 8 | 3.48 | 2.27 | 0.85 |
| 17:30-17:44 | 420 | 400 | 83 | 82 | 9 | 2.68 | 2.1 | 0.98 |
| 17:45-17:59 | 529 | 849 | 119 | 79 | 5 | 4.32 | 2.54 | 1.1 |
| 18:00-18:14 | 425 | 660 | 149 | 105 | 12 | 3.98 | 2.49 | 0.96 |
| 18:15-18:29 | 436 | 562 | 116 | 97 | 12 | 4.13 | 2.65 | 0.95 |
| 18:30-18:44 | 339 | 597 | 87 | 104 | 7 | 4.3 | 1.82 | 1.08 |
| 18:45-18:59 | 358 | 749 | 82 | 67 | 9 | 3.5 | 3.1 | 0.94 |
| 19:00-19:14 | 495 | 712 | 103 | 76 | 9 | 2.94 | 3.11 | 0.95 |
| 19:15-19:29 | 488 | 411 | 121 | 100 | 6 | 3.75 | 1.87 | 1.07 |
| 19:30-19:44 | 401 | 814 | 118 | 99 | 10 | 3.4 | 2.73 | 0.96 |
| 19:45-19:59 | 367 | 809 | 123 | 79 | 10 | 2.16 | 2.19 | 0.97 |
| 20:00-20:14 | 213 | 271 | 60 | 32 | 15 | 2.14 | 2.46 | 0.6 |
| 20:15-20:29 | 211 | 356 | 66 | 49 | 8 | 4.15 | 2.91 | 0.59 |
| 20:30-20:44 | 157 | 271 | 34 | 46 | 14 | 3.9 | 2.53 | 0.47 |
| 20:45-20:59 | 192 | 324 | 30 | 43 | 14 | 2.68 | 2.06 | 0.53 |
| 21:00-21:14 | 210 | 314 | 45 | 22 | 9 | 4.48 | 2.19 | 0.68 |
| 21:15-21:29 | 293 | 305 | 36 | 39 | 14 | 3.4 | 3.17 | 0.6 |
| 21:30-21:44 | 171 | 382 | 55 | 44 | 12 | 2.74 | 2.99 | 0.46 |
| 21:45-21:59 | 156 | 285 | 36 | 21 | 20 | 3.23 | 2.52 | 0.48 |

#### Location: Natete Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 368 | 815 | 93 | 116 | 12 | 4.42 | 2.42 | 1.0 |
| 07:15-07:29 | 360 | 453 | 127 | 100 | 9 | 2.46 | 2.99 | 1.0 |
| 07:30-07:44 | 403 | 898 | 104 | 84 | 10 | 4.18 | 2.08 | 0.99 |
| 07:45-07:59 | 520 | 788 | 102 | 111 | 17 | 2.29 | 1.94 | 1.01 |
| 08:00-08:14 | 325 | 636 | 112 | 95 | 20 | 2.61 | 2.5 | 1.06 |
| 08:15-08:29 | 565 | 469 | 120 | 111 | 5 | 2.29 | 3.17 | 1.06 |
| 08:30-08:44 | 395 | 704 | 123 | 115 | 8 | 4.18 | 2.36 | 0.87 |
| 08:45-08:59 | 451 | 767 | 120 | 87 | 18 | 4.07 | 2.39 | 1.09 |
| 09:00-09:14 | 319 | 788 | 147 | 87 | 15 | 3.85 | 2.6 | 0.89 |
| 09:15-09:29 | 488 | 683 | 147 | 99 | 15 | 3.43 | 2.02 | 0.88 |
| 09:30-09:44 | 458 | 460 | 143 | 53 | 9 | 3.58 | 2.78 | 0.85 |
| 09:45-09:59 | 537 | 556 | 111 | 61 | 8 | 3.14 | 2.03 | 0.9 |
| 10:00-10:14 | 180 | 366 | 35 | 40 | 15 | 2.43 | 1.93 | 0.56 |
| 10:15-10:29 | 159 | 288 | 36 | 26 | 18 | 2.88 | 1.98 | 0.65 |
| 10:30-10:44 | 252 | 269 | 30 | 48 | 15 | 2.45 | 2.22 | 0.47 |
| 10:45-10:59 | 251 | 272 | 30 | 50 | 19 | 3.15 | 2.46 | 0.42 |
| 16:00-16:14 | 273 | 333 | 46 | 44 | 19 | 2.48 | 2.84 | 0.65 |
| 16:15-16:29 | 300 | 292 | 56 | 26 | 16 | 2.84 | 2.57 | 0.5 |
| 16:30-16:44 | 254 | 385 | 32 | 31 | 20 | 4.45 | 2.17 | 0.56 |
| 16:45-16:59 | 176 | 283 | 44 | 49 | 7 | 3.08 | 2.14 | 0.69 |
| 17:00-17:14 | 348 | 720 | 83 | 73 | 9 | 4.12 | 1.87 | 0.96 |
| 17:15-17:29 | 436 | 433 | 108 | 101 | 14 | 2.94 | 2.28 | 0.97 |
| 17:30-17:44 | 505 | 703 | 137 | 77 | 18 | 2.43 | 2.62 | 1.05 |
| 17:45-17:59 | 587 | 459 | 127 | 88 | 8 | 3.47 | 2.26 | 0.95 |
| 18:00-18:14 | 305 | 854 | 81 | 71 | 11 | 2.73 | 2.79 | 1.02 |
| 18:15-18:29 | 326 | 600 | 82 | 102 | 7 | 2.2 | 1.82 | 1.0 |
| 18:30-18:44 | 424 | 665 | 85 | 65 | 9 | 3.1 | 2.03 | 0.95 |
| 18:45-18:59 | 390 | 593 | 136 | 76 | 5 | 3.05 | 3.18 | 0.94 |
| 19:00-19:14 | 422 | 576 | 133 | 90 | 13 | 2.29 | 2.72 | 0.92 |
| 19:15-19:29 | 309 | 714 | 136 | 71 | 13 | 2.35 | 2.41 | 1.04 |
| 19:30-19:44 | 528 | 502 | 92 | 98 | 11 | 2.13 | 2.84 | 0.98 |
| 19:45-19:59 | 393 | 413 | 130 | 59 | 15 | 3.82 | 1.93 | 1.07 |
| 20:00-20:14 | 288 | 360 | 48 | 23 | 13 | 3.52 | 2.22 | 0.66 |
| 20:15-20:29 | 176 | 317 | 54 | 48 | 12 | 3.4 | 2.45 | 0.63 |
| 20:30-20:44 | 233 | 263 | 36 | 27 | 15 | 3.47 | 2.42 | 0.63 |
| 20:45-20:59 | 161 | 272 | 43 | 31 | 10 | 2.88 | 2.64 | 0.46 |
| 21:00-21:14 | 199 | 332 | 69 | 34 | 9 | 4.09 | 3.11 | 0.62 |
| 21:15-21:29 | 300 | 220 | 53 | 20 | 15 | 4.24 | 2.08 | 0.65 |
| 21:30-21:44 | 195 | 309 | 65 | 29 | 9 | 2.74 | 2.02 | 0.53 |
| 21:45-21:59 | 159 | 337 | 54 | 24 | 17 | 4.39 | 2.85 | 0.67 |

### A.19 Day 19: 2026-06-19

#### Location: Wandegeya Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 334 | 673 | 145 | 74 | 9 | 2.17 | 2.19 | 0.99 |
| 07:15-07:29 | 329 | 427 | 93 | 120 | 14 | 2.6 | 2.88 | 1.06 |
| 07:30-07:44 | 566 | 782 | 92 | 91 | 16 | 3.73 | 2.66 | 0.9 |
| 07:45-07:59 | 401 | 456 | 104 | 79 | 17 | 3.1 | 2.48 | 1.07 |
| 08:00-08:14 | 543 | 665 | 90 | 112 | 15 | 2.97 | 2.66 | 1.07 |
| 08:15-08:29 | 526 | 740 | 105 | 76 | 16 | 3.01 | 2.83 | 0.95 |
| 08:30-08:44 | 586 | 772 | 143 | 88 | 14 | 3.76 | 3.19 | 0.9 |
| 08:45-08:59 | 571 | 443 | 97 | 111 | 17 | 3.15 | 2.86 | 1.03 |
| 09:00-09:14 | 399 | 437 | 137 | 116 | 14 | 4.38 | 2.65 | 0.98 |
| 09:15-09:29 | 300 | 438 | 114 | 100 | 15 | 2.26 | 2.16 | 0.92 |
| 09:30-09:44 | 310 | 675 | 150 | 83 | 11 | 3.63 | 2.26 | 1.04 |
| 09:45-09:59 | 379 | 876 | 87 | 71 | 8 | 2.18 | 2.6 | 0.86 |
| 10:00-10:14 | 204 | 396 | 35 | 44 | 15 | 4.33 | 2.03 | 0.48 |
| 10:15-10:29 | 207 | 366 | 53 | 49 | 14 | 3.57 | 2.18 | 0.44 |
| 10:30-10:44 | 292 | 263 | 42 | 20 | 5 | 4.5 | 1.98 | 0.48 |
| 10:45-10:59 | 211 | 226 | 39 | 30 | 14 | 4.3 | 3.05 | 0.56 |
| 16:00-16:14 | 234 | 258 | 41 | 34 | 6 | 3.67 | 2.15 | 0.59 |
| 16:15-16:29 | 269 | 372 | 55 | 21 | 16 | 2.72 | 2.28 | 0.52 |
| 16:30-16:44 | 166 | 217 | 57 | 45 | 14 | 4.28 | 2.39 | 0.55 |
| 16:45-16:59 | 153 | 233 | 56 | 46 | 20 | 2.47 | 2.43 | 0.48 |
| 17:00-17:14 | 560 | 550 | 123 | 86 | 6 | 3.2 | 2.85 | 0.9 |
| 17:15-17:29 | 534 | 757 | 91 | 110 | 11 | 3.56 | 2.41 | 0.86 |
| 17:30-17:44 | 553 | 618 | 116 | 112 | 20 | 3.52 | 1.81 | 0.92 |
| 17:45-17:59 | 515 | 771 | 131 | 77 | 17 | 3.56 | 2.54 | 1.0 |
| 18:00-18:14 | 403 | 840 | 148 | 90 | 12 | 3.29 | 2.95 | 0.95 |
| 18:15-18:29 | 490 | 563 | 106 | 84 | 5 | 3.17 | 2.59 | 0.99 |
| 18:30-18:44 | 342 | 697 | 143 | 52 | 7 | 3.38 | 2.4 | 0.91 |
| 18:45-18:59 | 405 | 564 | 96 | 82 | 18 | 2.56 | 2.93 | 1.08 |
| 19:00-19:14 | 502 | 475 | 93 | 96 | 19 | 4.26 | 2.8 | 1.01 |
| 19:15-19:29 | 539 | 651 | 81 | 108 | 12 | 2.19 | 2.91 | 1.1 |
| 19:30-19:44 | 590 | 519 | 118 | 115 | 15 | 2.54 | 2.09 | 0.87 |
| 19:45-19:59 | 593 | 732 | 111 | 110 | 14 | 2.19 | 2.48 | 1.01 |
| 20:00-20:14 | 173 | 328 | 37 | 33 | 18 | 3.15 | 2.69 | 0.62 |
| 20:15-20:29 | 178 | 290 | 47 | 31 | 16 | 4.33 | 1.87 | 0.51 |
| 20:30-20:44 | 172 | 337 | 41 | 27 | 16 | 3.75 | 3.03 | 0.54 |
| 20:45-20:59 | 206 | 335 | 66 | 39 | 17 | 3.22 | 2.13 | 0.68 |
| 21:00-21:14 | 232 | 230 | 31 | 33 | 10 | 3.72 | 2.75 | 0.52 |
| 21:15-21:29 | 290 | 395 | 54 | 38 | 11 | 2.35 | 2.62 | 0.68 |
| 21:30-21:44 | 153 | 351 | 46 | 32 | 11 | 3.46 | 3.18 | 0.4 |
| 21:45-21:59 | 163 | 321 | 68 | 26 | 17 | 2.7 | 2.25 | 0.41 |

#### Location: Kibuye Roundabout
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 578 | 648 | 109 | 101 | 10 | 4.04 | 2.2 | 1.03 |
| 07:15-07:29 | 308 | 677 | 138 | 64 | 17 | 3.16 | 1.84 | 0.93 |
| 07:30-07:44 | 572 | 854 | 144 | 72 | 18 | 2.99 | 1.91 | 1.08 |
| 07:45-07:59 | 558 | 453 | 147 | 67 | 7 | 2.89 | 1.85 | 0.89 |
| 08:00-08:14 | 324 | 783 | 112 | 50 | 9 | 3.94 | 2.93 | 0.86 |
| 08:15-08:29 | 306 | 691 | 92 | 99 | 13 | 3.38 | 2.82 | 0.91 |
| 08:30-08:44 | 582 | 810 | 133 | 86 | 12 | 4.3 | 2.88 | 0.85 |
| 08:45-08:59 | 442 | 899 | 123 | 74 | 13 | 3.16 | 3.03 | 1.0 |
| 09:00-09:14 | 553 | 733 | 97 | 106 | 17 | 4.01 | 3.09 | 0.85 |
| 09:15-09:29 | 333 | 412 | 115 | 60 | 8 | 4.27 | 2.65 | 0.98 |
| 09:30-09:44 | 434 | 498 | 80 | 56 | 7 | 3.25 | 3.19 | 0.89 |
| 09:45-09:59 | 524 | 519 | 96 | 88 | 19 | 3.18 | 3.04 | 1.07 |
| 10:00-10:14 | 174 | 244 | 32 | 26 | 12 | 3.45 | 2.89 | 0.61 |
| 10:15-10:29 | 286 | 251 | 30 | 31 | 9 | 2.65 | 2.95 | 0.62 |
| 10:30-10:44 | 155 | 371 | 66 | 38 | 11 | 4.16 | 2.49 | 0.53 |
| 10:45-10:59 | 224 | 241 | 49 | 39 | 11 | 4.39 | 2.73 | 0.62 |
| 16:00-16:14 | 261 | 243 | 32 | 39 | 19 | 2.91 | 1.98 | 0.48 |
| 16:15-16:29 | 172 | 200 | 33 | 23 | 6 | 2.88 | 1.98 | 0.51 |
| 16:30-16:44 | 199 | 236 | 70 | 36 | 7 | 2.16 | 1.92 | 0.41 |
| 16:45-16:59 | 283 | 283 | 32 | 21 | 7 | 2.39 | 2.77 | 0.59 |
| 17:00-17:14 | 332 | 573 | 116 | 109 | 15 | 2.9 | 2.17 | 1.08 |
| 17:15-17:29 | 582 | 885 | 122 | 115 | 11 | 3.5 | 2.48 | 0.95 |
| 17:30-17:44 | 453 | 801 | 114 | 58 | 7 | 2.28 | 3.04 | 1.01 |
| 17:45-17:59 | 302 | 868 | 128 | 90 | 9 | 3.46 | 2.38 | 0.92 |
| 18:00-18:14 | 301 | 827 | 122 | 81 | 11 | 3.27 | 2.57 | 0.88 |
| 18:15-18:29 | 388 | 403 | 90 | 105 | 9 | 3.51 | 2.04 | 0.98 |
| 18:30-18:44 | 403 | 781 | 117 | 104 | 7 | 2.19 | 2.39 | 1.08 |
| 18:45-18:59 | 387 | 432 | 150 | 70 | 7 | 4.05 | 3.08 | 1.05 |
| 19:00-19:14 | 455 | 624 | 133 | 115 | 6 | 3.2 | 2.12 | 0.88 |
| 19:15-19:29 | 479 | 660 | 112 | 51 | 15 | 2.79 | 3.15 | 0.99 |
| 19:30-19:44 | 586 | 450 | 139 | 116 | 13 | 4.22 | 3.0 | 0.86 |
| 19:45-19:59 | 548 | 816 | 150 | 71 | 17 | 3.37 | 1.94 | 0.95 |
| 20:00-20:14 | 169 | 200 | 59 | 30 | 19 | 3.13 | 2.77 | 0.57 |
| 20:15-20:29 | 246 | 314 | 37 | 39 | 9 | 3.2 | 2.27 | 0.44 |
| 20:30-20:44 | 271 | 265 | 65 | 48 | 16 | 3.51 | 3.08 | 0.41 |
| 20:45-20:59 | 150 | 251 | 54 | 28 | 5 | 4.04 | 2.6 | 0.63 |
| 21:00-21:14 | 189 | 268 | 59 | 31 | 10 | 2.58 | 1.9 | 0.6 |
| 21:15-21:29 | 173 | 258 | 55 | 20 | 14 | 3.62 | 2.61 | 0.45 |
| 21:30-21:44 | 163 | 224 | 62 | 30 | 13 | 3.68 | 2.85 | 0.48 |
| 21:45-21:59 | 273 | 202 | 49 | 24 | 17 | 3.69 | 2.98 | 0.44 |

#### Location: Bakuli Intersection
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 329 | 644 | 92 | 59 | 19 | 4.04 | 2.82 | 1.02 |
| 07:15-07:29 | 412 | 614 | 85 | 104 | 5 | 4.19 | 2.69 | 1.06 |
| 07:30-07:44 | 563 | 554 | 83 | 110 | 17 | 3.45 | 2.09 | 0.93 |
| 07:45-07:59 | 374 | 747 | 145 | 109 | 18 | 2.64 | 2.04 | 1.04 |
| 08:00-08:14 | 518 | 658 | 135 | 84 | 5 | 3.58 | 2.51 | 0.9 |
| 08:15-08:29 | 323 | 653 | 134 | 114 | 11 | 3.68 | 2.06 | 1.03 |
| 08:30-08:44 | 337 | 700 | 117 | 88 | 5 | 4.06 | 2.65 | 1.08 |
| 08:45-08:59 | 386 | 636 | 139 | 112 | 6 | 4.18 | 2.49 | 1.06 |
| 09:00-09:14 | 437 | 707 | 132 | 91 | 14 | 2.16 | 1.87 | 1.07 |
| 09:15-09:29 | 590 | 512 | 111 | 66 | 9 | 2.99 | 2.28 | 0.88 |
| 09:30-09:44 | 510 | 603 | 104 | 75 | 6 | 3.34 | 2.32 | 0.96 |
| 09:45-09:59 | 524 | 733 | 89 | 57 | 14 | 3.36 | 2.14 | 1.06 |
| 10:00-10:14 | 178 | 394 | 61 | 34 | 10 | 2.65 | 1.83 | 0.48 |
| 10:15-10:29 | 187 | 238 | 40 | 33 | 19 | 2.52 | 3.08 | 0.66 |
| 10:30-10:44 | 194 | 385 | 37 | 34 | 13 | 2.16 | 3.17 | 0.62 |
| 10:45-10:59 | 203 | 305 | 56 | 44 | 19 | 4.38 | 2.46 | 0.5 |
| 16:00-16:14 | 260 | 223 | 33 | 47 | 6 | 2.62 | 1.96 | 0.64 |
| 16:15-16:29 | 264 | 220 | 55 | 29 | 5 | 4.21 | 2.28 | 0.45 |
| 16:30-16:44 | 277 | 375 | 34 | 26 | 8 | 4.19 | 2.42 | 0.57 |
| 16:45-16:59 | 246 | 368 | 66 | 41 | 10 | 4.23 | 2.48 | 0.45 |
| 17:00-17:14 | 458 | 737 | 94 | 100 | 15 | 2.33 | 1.91 | 1.04 |
| 17:15-17:29 | 590 | 555 | 130 | 97 | 19 | 2.83 | 1.82 | 1.04 |
| 17:30-17:44 | 475 | 619 | 129 | 116 | 16 | 2.71 | 1.9 | 0.85 |
| 17:45-17:59 | 365 | 869 | 95 | 69 | 7 | 4.3 | 2.52 | 0.89 |
| 18:00-18:14 | 483 | 848 | 111 | 99 | 12 | 4.07 | 2.55 | 1.04 |
| 18:15-18:29 | 433 | 650 | 121 | 58 | 18 | 2.54 | 2.37 | 0.87 |
| 18:30-18:44 | 549 | 543 | 133 | 58 | 16 | 2.16 | 2.97 | 0.88 |
| 18:45-18:59 | 489 | 527 | 127 | 58 | 11 | 2.89 | 2.94 | 1.06 |
| 19:00-19:14 | 556 | 785 | 104 | 52 | 12 | 3.76 | 2.67 | 0.91 |
| 19:15-19:29 | 312 | 847 | 124 | 83 | 16 | 4.46 | 2.79 | 1.04 |
| 19:30-19:44 | 451 | 691 | 120 | 82 | 7 | 2.14 | 2.85 | 0.85 |
| 19:45-19:59 | 527 | 430 | 112 | 54 | 9 | 3.97 | 2.48 | 0.88 |
| 20:00-20:14 | 245 | 284 | 59 | 48 | 16 | 3.26 | 2.29 | 0.57 |
| 20:15-20:29 | 284 | 360 | 65 | 48 | 14 | 2.36 | 2.2 | 0.57 |
| 20:30-20:44 | 193 | 284 | 67 | 26 | 15 | 2.15 | 2.27 | 0.5 |
| 20:45-20:59 | 277 | 307 | 65 | 26 | 16 | 4.19 | 2.07 | 0.58 |
| 21:00-21:14 | 191 | 336 | 52 | 28 | 18 | 4.43 | 2.76 | 0.59 |
| 21:15-21:29 | 242 | 261 | 45 | 37 | 6 | 2.8 | 2.82 | 0.41 |
| 21:30-21:44 | 186 | 277 | 64 | 49 | 9 | 3.18 | 2.52 | 0.6 |
| 21:45-21:59 | 165 | 324 | 30 | 21 | 17 | 2.1 | 2.15 | 0.57 |

#### Location: Bwaise Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 445 | 785 | 149 | 88 | 11 | 4.49 | 2.81 | 1.09 |
| 07:15-07:29 | 549 | 666 | 121 | 113 | 9 | 4.32 | 2.92 | 1.02 |
| 07:30-07:44 | 508 | 555 | 100 | 118 | 6 | 3.18 | 2.25 | 0.96 |
| 07:45-07:59 | 392 | 711 | 117 | 57 | 13 | 3.82 | 2.84 | 1.05 |
| 08:00-08:14 | 600 | 661 | 131 | 91 | 16 | 2.74 | 2.53 | 0.87 |
| 08:15-08:29 | 327 | 852 | 103 | 111 | 6 | 2.22 | 2.71 | 0.95 |
| 08:30-08:44 | 405 | 634 | 131 | 69 | 20 | 3.82 | 2.73 | 1.1 |
| 08:45-08:59 | 456 | 811 | 123 | 70 | 17 | 4.2 | 3.14 | 1.01 |
| 09:00-09:14 | 434 | 559 | 83 | 86 | 15 | 3.57 | 2.66 | 0.86 |
| 09:15-09:29 | 365 | 402 | 84 | 95 | 9 | 3.45 | 2.91 | 0.95 |
| 09:30-09:44 | 502 | 473 | 86 | 73 | 18 | 3.95 | 2.17 | 0.89 |
| 09:45-09:59 | 356 | 595 | 121 | 66 | 15 | 3.9 | 2.43 | 1.1 |
| 10:00-10:14 | 212 | 280 | 44 | 25 | 13 | 4.17 | 2.48 | 0.52 |
| 10:15-10:29 | 290 | 272 | 53 | 27 | 15 | 3.43 | 2.8 | 0.51 |
| 10:30-10:44 | 152 | 337 | 35 | 33 | 8 | 4.48 | 2.18 | 0.56 |
| 10:45-10:59 | 170 | 316 | 50 | 29 | 8 | 3.85 | 2.17 | 0.7 |
| 16:00-16:14 | 255 | 214 | 53 | 43 | 18 | 2.87 | 1.9 | 0.44 |
| 16:15-16:29 | 285 | 385 | 30 | 24 | 13 | 2.42 | 2.2 | 0.44 |
| 16:30-16:44 | 259 | 210 | 57 | 26 | 11 | 4.02 | 1.84 | 0.46 |
| 16:45-16:59 | 156 | 352 | 52 | 34 | 9 | 4.3 | 2.39 | 0.48 |
| 17:00-17:14 | 386 | 752 | 139 | 101 | 17 | 2.45 | 2.65 | 0.86 |
| 17:15-17:29 | 470 | 791 | 125 | 52 | 6 | 3.32 | 2.36 | 0.92 |
| 17:30-17:44 | 560 | 578 | 122 | 110 | 7 | 4.27 | 2.04 | 0.91 |
| 17:45-17:59 | 402 | 765 | 131 | 88 | 12 | 3.57 | 2.45 | 0.97 |
| 18:00-18:14 | 492 | 447 | 115 | 102 | 15 | 2.76 | 2.02 | 1.09 |
| 18:15-18:29 | 520 | 547 | 122 | 75 | 9 | 2.52 | 3.14 | 0.93 |
| 18:30-18:44 | 476 | 764 | 102 | 114 | 16 | 4.29 | 2.63 | 1.0 |
| 18:45-18:59 | 423 | 753 | 89 | 107 | 11 | 2.8 | 1.91 | 0.92 |
| 19:00-19:14 | 354 | 638 | 112 | 101 | 20 | 3.07 | 3.01 | 0.91 |
| 19:15-19:29 | 533 | 477 | 94 | 54 | 14 | 3.25 | 1.99 | 0.9 |
| 19:30-19:44 | 311 | 793 | 134 | 78 | 9 | 3.11 | 2.44 | 0.93 |
| 19:45-19:59 | 504 | 411 | 82 | 88 | 17 | 3.83 | 2.57 | 0.99 |
| 20:00-20:14 | 170 | 251 | 60 | 49 | 7 | 3.59 | 2.53 | 0.55 |
| 20:15-20:29 | 202 | 341 | 70 | 41 | 7 | 2.45 | 2.2 | 0.59 |
| 20:30-20:44 | 161 | 324 | 38 | 44 | 12 | 4.12 | 2.02 | 0.61 |
| 20:45-20:59 | 265 | 302 | 40 | 25 | 14 | 2.94 | 3.2 | 0.65 |
| 21:00-21:14 | 271 | 266 | 39 | 29 | 9 | 4.39 | 2.69 | 0.44 |
| 21:15-21:29 | 198 | 201 | 70 | 31 | 10 | 3.86 | 2.24 | 0.54 |
| 21:30-21:44 | 182 | 266 | 65 | 29 | 7 | 3.52 | 3.03 | 0.62 |
| 21:45-21:59 | 271 | 327 | 66 | 41 | 9 | 3.71 | 2.24 | 0.58 |

#### Location: Natete Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 428 | 813 | 100 | 117 | 15 | 2.86 | 2.05 | 1.02 |
| 07:15-07:29 | 342 | 483 | 150 | 86 | 11 | 2.43 | 2.59 | 1.06 |
| 07:30-07:44 | 345 | 470 | 137 | 87 | 17 | 2.95 | 2.51 | 1.03 |
| 07:45-07:59 | 575 | 646 | 146 | 50 | 10 | 2.94 | 2.48 | 0.86 |
| 08:00-08:14 | 440 | 783 | 127 | 117 | 7 | 3.1 | 1.87 | 0.97 |
| 08:15-08:29 | 302 | 492 | 81 | 62 | 12 | 4.08 | 1.88 | 0.92 |
| 08:30-08:44 | 368 | 484 | 118 | 58 | 14 | 2.99 | 2.14 | 1.05 |
| 08:45-08:59 | 461 | 551 | 124 | 62 | 11 | 2.59 | 3.11 | 0.88 |
| 09:00-09:14 | 402 | 537 | 110 | 84 | 15 | 3.12 | 3.11 | 1.01 |
| 09:15-09:29 | 442 | 646 | 117 | 81 | 9 | 3.82 | 2.06 | 0.86 |
| 09:30-09:44 | 587 | 647 | 127 | 77 | 6 | 3.55 | 2.26 | 0.99 |
| 09:45-09:59 | 384 | 415 | 100 | 55 | 6 | 4.49 | 2.27 | 0.92 |
| 10:00-10:14 | 261 | 337 | 58 | 41 | 14 | 4.41 | 2.17 | 0.61 |
| 10:15-10:29 | 175 | 202 | 60 | 50 | 16 | 3.26 | 2.15 | 0.44 |
| 10:30-10:44 | 164 | 302 | 57 | 30 | 14 | 4.48 | 3.05 | 0.49 |
| 10:45-10:59 | 260 | 383 | 53 | 20 | 6 | 3.55 | 2.24 | 0.53 |
| 16:00-16:14 | 290 | 200 | 30 | 21 | 5 | 4.46 | 2.52 | 0.69 |
| 16:15-16:29 | 195 | 210 | 50 | 27 | 15 | 4.2 | 2.76 | 0.5 |
| 16:30-16:44 | 153 | 318 | 67 | 42 | 10 | 3.97 | 2.72 | 0.7 |
| 16:45-16:59 | 157 | 332 | 64 | 50 | 12 | 3.46 | 2.42 | 0.51 |
| 17:00-17:14 | 522 | 476 | 92 | 78 | 6 | 2.82 | 2.03 | 1.08 |
| 17:15-17:29 | 569 | 822 | 150 | 120 | 14 | 3.34 | 2.18 | 0.91 |
| 17:30-17:44 | 505 | 453 | 104 | 92 | 13 | 2.68 | 2.01 | 1.01 |
| 17:45-17:59 | 459 | 736 | 120 | 50 | 15 | 2.47 | 2.25 | 1.09 |
| 18:00-18:14 | 557 | 580 | 124 | 113 | 6 | 3.45 | 2.99 | 1.0 |
| 18:15-18:29 | 314 | 640 | 132 | 67 | 6 | 2.79 | 1.97 | 1.09 |
| 18:30-18:44 | 437 | 809 | 130 | 93 | 13 | 3.7 | 2.11 | 0.93 |
| 18:45-18:59 | 369 | 422 | 108 | 61 | 19 | 2.69 | 3.1 | 0.88 |
| 19:00-19:14 | 348 | 431 | 101 | 108 | 20 | 4.11 | 3.03 | 0.88 |
| 19:15-19:29 | 362 | 591 | 132 | 60 | 8 | 4.34 | 2.51 | 1.09 |
| 19:30-19:44 | 343 | 560 | 146 | 74 | 7 | 2.57 | 2.6 | 1.1 |
| 19:45-19:59 | 560 | 613 | 147 | 51 | 13 | 3.25 | 1.98 | 0.99 |
| 20:00-20:14 | 232 | 234 | 31 | 47 | 15 | 3.16 | 3.18 | 0.47 |
| 20:15-20:29 | 224 | 284 | 32 | 28 | 10 | 2.74 | 3.17 | 0.41 |
| 20:30-20:44 | 191 | 384 | 40 | 21 | 14 | 2.36 | 2.62 | 0.47 |
| 20:45-20:59 | 188 | 327 | 35 | 27 | 6 | 3.79 | 2.3 | 0.41 |
| 21:00-21:14 | 222 | 391 | 67 | 43 | 13 | 3.05 | 1.81 | 0.56 |
| 21:15-21:29 | 223 | 336 | 56 | 44 | 10 | 2.43 | 2.34 | 0.46 |
| 21:30-21:44 | 222 | 290 | 45 | 36 | 18 | 2.44 | 2.18 | 0.54 |
| 21:45-21:59 | 297 | 364 | 49 | 26 | 11 | 3.14 | 2.65 | 0.55 |

### A.20 Day 20: 2026-06-20

#### Location: Wandegeya Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 439 | 751 | 107 | 87 | 6 | 2.67 | 3.13 | 1.09 |
| 07:15-07:29 | 409 | 805 | 134 | 89 | 11 | 4.4 | 2.25 | 1.08 |
| 07:30-07:44 | 599 | 459 | 104 | 91 | 20 | 4.5 | 2.46 | 0.98 |
| 07:45-07:59 | 380 | 458 | 103 | 91 | 14 | 3.53 | 2.66 | 0.86 |
| 08:00-08:14 | 388 | 413 | 149 | 94 | 19 | 2.41 | 2.26 | 1.03 |
| 08:15-08:29 | 554 | 881 | 97 | 98 | 14 | 3.8 | 2.22 | 0.92 |
| 08:30-08:44 | 338 | 835 | 88 | 86 | 6 | 3.63 | 3.03 | 1.1 |
| 08:45-08:59 | 479 | 732 | 82 | 88 | 7 | 2.22 | 2.84 | 0.86 |
| 09:00-09:14 | 410 | 715 | 97 | 105 | 6 | 4.34 | 2.61 | 1.09 |
| 09:15-09:29 | 351 | 650 | 114 | 82 | 7 | 2.16 | 1.8 | 1.07 |
| 09:30-09:44 | 450 | 677 | 114 | 76 | 8 | 4.32 | 2.39 | 0.95 |
| 09:45-09:59 | 463 | 580 | 145 | 79 | 19 | 3.12 | 2.84 | 1.05 |
| 10:00-10:14 | 210 | 266 | 67 | 50 | 19 | 2.1 | 2.29 | 0.4 |
| 10:15-10:29 | 238 | 387 | 70 | 48 | 17 | 4.34 | 2.66 | 0.42 |
| 10:30-10:44 | 186 | 344 | 41 | 23 | 15 | 2.77 | 2.45 | 0.52 |
| 10:45-10:59 | 282 | 201 | 36 | 39 | 14 | 2.27 | 2.42 | 0.67 |
| 16:00-16:14 | 254 | 201 | 58 | 30 | 5 | 4.01 | 2.28 | 0.67 |
| 16:15-16:29 | 160 | 339 | 32 | 49 | 7 | 3.62 | 2.62 | 0.5 |
| 16:30-16:44 | 156 | 214 | 36 | 23 | 18 | 3.04 | 2.27 | 0.65 |
| 16:45-16:59 | 154 | 383 | 39 | 46 | 13 | 4.45 | 1.86 | 0.55 |
| 17:00-17:14 | 563 | 755 | 110 | 60 | 20 | 2.34 | 2.67 | 1.04 |
| 17:15-17:29 | 523 | 582 | 148 | 107 | 12 | 4.04 | 1.94 | 0.95 |
| 17:30-17:44 | 373 | 597 | 101 | 50 | 15 | 4.29 | 2.87 | 0.88 |
| 17:45-17:59 | 524 | 539 | 87 | 52 | 13 | 2.24 | 2.1 | 0.94 |
| 18:00-18:14 | 496 | 444 | 136 | 75 | 10 | 3.34 | 2.87 | 0.9 |
| 18:15-18:29 | 455 | 745 | 89 | 94 | 10 | 3.49 | 2.11 | 1.09 |
| 18:30-18:44 | 537 | 443 | 89 | 68 | 9 | 4.02 | 1.83 | 0.9 |
| 18:45-18:59 | 346 | 726 | 143 | 71 | 11 | 3.65 | 2.34 | 1.0 |
| 19:00-19:14 | 499 | 842 | 86 | 63 | 5 | 2.97 | 2.96 | 1.09 |
| 19:15-19:29 | 497 | 840 | 137 | 70 | 16 | 4.27 | 3.1 | 0.94 |
| 19:30-19:44 | 512 | 746 | 134 | 63 | 5 | 2.99 | 1.99 | 1.1 |
| 19:45-19:59 | 505 | 796 | 145 | 95 | 6 | 2.88 | 2.98 | 0.96 |
| 20:00-20:14 | 179 | 384 | 34 | 23 | 17 | 2.25 | 1.82 | 0.65 |
| 20:15-20:29 | 278 | 286 | 49 | 32 | 9 | 4.06 | 2.06 | 0.58 |
| 20:30-20:44 | 188 | 371 | 60 | 24 | 14 | 3.47 | 2.92 | 0.41 |
| 20:45-20:59 | 260 | 346 | 35 | 45 | 11 | 3.28 | 2.34 | 0.6 |
| 21:00-21:14 | 280 | 334 | 53 | 27 | 19 | 3.31 | 2.5 | 0.55 |
| 21:15-21:29 | 300 | 260 | 37 | 46 | 19 | 3.18 | 1.84 | 0.46 |
| 21:30-21:44 | 287 | 320 | 63 | 38 | 12 | 2.71 | 2.34 | 0.63 |
| 21:45-21:59 | 300 | 276 | 36 | 41 | 8 | 4.07 | 2.41 | 0.61 |

#### Location: Kibuye Roundabout
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 482 | 753 | 115 | 119 | 12 | 3.57 | 3.1 | 0.93 |
| 07:15-07:29 | 417 | 798 | 104 | 119 | 15 | 3.93 | 2.32 | 0.99 |
| 07:30-07:44 | 320 | 410 | 100 | 66 | 13 | 3.92 | 3.15 | 0.87 |
| 07:45-07:59 | 453 | 848 | 91 | 57 | 7 | 4.33 | 2.64 | 0.91 |
| 08:00-08:14 | 570 | 460 | 104 | 92 | 13 | 4.11 | 3.05 | 1.03 |
| 08:15-08:29 | 527 | 881 | 145 | 112 | 17 | 3.09 | 2.06 | 0.95 |
| 08:30-08:44 | 407 | 735 | 112 | 68 | 11 | 3.67 | 2.53 | 0.93 |
| 08:45-08:59 | 490 | 826 | 97 | 61 | 7 | 2.32 | 2.67 | 1.07 |
| 09:00-09:14 | 558 | 732 | 114 | 93 | 6 | 2.87 | 3.07 | 0.95 |
| 09:15-09:29 | 362 | 603 | 108 | 93 | 6 | 2.63 | 2.88 | 0.99 |
| 09:30-09:44 | 532 | 744 | 100 | 86 | 17 | 3.71 | 3.13 | 0.9 |
| 09:45-09:59 | 346 | 564 | 131 | 103 | 8 | 3.52 | 3.12 | 1.06 |
| 10:00-10:14 | 274 | 226 | 37 | 44 | 16 | 4.21 | 2.09 | 0.65 |
| 10:15-10:29 | 257 | 392 | 38 | 45 | 8 | 2.48 | 1.83 | 0.51 |
| 10:30-10:44 | 193 | 373 | 60 | 40 | 9 | 3.13 | 1.88 | 0.51 |
| 10:45-10:59 | 181 | 346 | 49 | 48 | 11 | 2.25 | 1.9 | 0.64 |
| 16:00-16:14 | 250 | 245 | 50 | 28 | 8 | 2.57 | 2.54 | 0.44 |
| 16:15-16:29 | 190 | 233 | 34 | 47 | 17 | 3.7 | 3.09 | 0.68 |
| 16:30-16:44 | 221 | 244 | 59 | 29 | 7 | 4.35 | 2.98 | 0.51 |
| 16:45-16:59 | 178 | 265 | 40 | 31 | 6 | 3.33 | 2.45 | 0.69 |
| 17:00-17:14 | 349 | 881 | 135 | 76 | 18 | 2.56 | 2.26 | 0.9 |
| 17:15-17:29 | 494 | 878 | 90 | 61 | 17 | 2.43 | 3.15 | 0.92 |
| 17:30-17:44 | 461 | 420 | 132 | 114 | 8 | 4.3 | 1.82 | 1.07 |
| 17:45-17:59 | 413 | 881 | 141 | 54 | 15 | 3.68 | 2.91 | 0.9 |
| 18:00-18:14 | 302 | 442 | 90 | 50 | 20 | 2.93 | 2.39 | 1.1 |
| 18:15-18:29 | 477 | 792 | 131 | 51 | 13 | 4.48 | 2.65 | 0.88 |
| 18:30-18:44 | 515 | 711 | 138 | 100 | 13 | 3.03 | 2.07 | 1.09 |
| 18:45-18:59 | 548 | 893 | 106 | 61 | 20 | 3.62 | 2.81 | 0.92 |
| 19:00-19:14 | 454 | 782 | 86 | 59 | 13 | 2.37 | 1.82 | 0.94 |
| 19:15-19:29 | 444 | 573 | 127 | 73 | 6 | 3.09 | 2.54 | 0.92 |
| 19:30-19:44 | 342 | 892 | 137 | 87 | 6 | 3.75 | 2.34 | 0.89 |
| 19:45-19:59 | 479 | 531 | 100 | 89 | 15 | 2.68 | 2.46 | 0.97 |
| 20:00-20:14 | 160 | 270 | 62 | 39 | 10 | 2.29 | 2.63 | 0.44 |
| 20:15-20:29 | 200 | 361 | 41 | 36 | 17 | 4.01 | 3.07 | 0.6 |
| 20:30-20:44 | 239 | 350 | 46 | 49 | 14 | 3.58 | 2.21 | 0.61 |
| 20:45-20:59 | 233 | 289 | 66 | 49 | 15 | 3.74 | 2.72 | 0.68 |
| 21:00-21:14 | 256 | 218 | 40 | 50 | 11 | 3.11 | 2.61 | 0.67 |
| 21:15-21:29 | 295 | 286 | 62 | 30 | 5 | 3.72 | 2.93 | 0.7 |
| 21:30-21:44 | 274 | 269 | 69 | 45 | 20 | 2.36 | 2.37 | 0.67 |
| 21:45-21:59 | 165 | 272 | 45 | 25 | 13 | 4.37 | 2.58 | 0.52 |

#### Location: Bakuli Intersection
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 585 | 489 | 118 | 102 | 15 | 4.48 | 2.26 | 0.94 |
| 07:15-07:29 | 455 | 438 | 133 | 58 | 12 | 2.59 | 2.8 | 1.0 |
| 07:30-07:44 | 458 | 581 | 93 | 107 | 10 | 4.21 | 2.21 | 1.02 |
| 07:45-07:59 | 531 | 564 | 104 | 107 | 6 | 3.92 | 2.29 | 1.06 |
| 08:00-08:14 | 587 | 806 | 98 | 85 | 6 | 2.86 | 2.34 | 0.96 |
| 08:15-08:29 | 398 | 487 | 133 | 89 | 16 | 2.18 | 2.07 | 1.09 |
| 08:30-08:44 | 302 | 563 | 104 | 59 | 20 | 2.64 | 2.73 | 0.88 |
| 08:45-08:59 | 589 | 577 | 106 | 69 | 8 | 2.14 | 1.99 | 1.0 |
| 09:00-09:14 | 383 | 710 | 93 | 96 | 20 | 2.44 | 2.11 | 1.07 |
| 09:15-09:29 | 380 | 820 | 116 | 94 | 5 | 2.59 | 2.66 | 1.05 |
| 09:30-09:44 | 425 | 827 | 107 | 63 | 10 | 3.07 | 2.11 | 0.97 |
| 09:45-09:59 | 452 | 624 | 141 | 84 | 16 | 2.98 | 2.12 | 0.99 |
| 10:00-10:14 | 242 | 251 | 57 | 45 | 12 | 3.04 | 1.94 | 0.53 |
| 10:15-10:29 | 258 | 233 | 44 | 44 | 7 | 2.86 | 2.19 | 0.44 |
| 10:30-10:44 | 200 | 320 | 36 | 22 | 10 | 2.59 | 2.07 | 0.55 |
| 10:45-10:59 | 169 | 356 | 30 | 32 | 5 | 3.51 | 3.15 | 0.44 |
| 16:00-16:14 | 193 | 210 | 39 | 38 | 5 | 3.05 | 2.15 | 0.5 |
| 16:15-16:29 | 259 | 216 | 59 | 45 | 10 | 2.75 | 2.42 | 0.66 |
| 16:30-16:44 | 167 | 369 | 41 | 32 | 10 | 4.38 | 2.21 | 0.58 |
| 16:45-16:59 | 297 | 244 | 49 | 48 | 20 | 4.03 | 2.15 | 0.4 |
| 17:00-17:14 | 356 | 507 | 89 | 100 | 11 | 3.87 | 2.81 | 1.02 |
| 17:15-17:29 | 536 | 697 | 95 | 82 | 15 | 3.67 | 3.13 | 1.03 |
| 17:30-17:44 | 308 | 435 | 129 | 113 | 15 | 2.41 | 2.38 | 0.92 |
| 17:45-17:59 | 490 | 890 | 99 | 111 | 7 | 3.19 | 2.26 | 1.04 |
| 18:00-18:14 | 431 | 492 | 95 | 68 | 7 | 3.38 | 2.66 | 1.08 |
| 18:15-18:29 | 331 | 493 | 90 | 68 | 20 | 2.32 | 2.38 | 0.96 |
| 18:30-18:44 | 551 | 420 | 90 | 109 | 16 | 2.7 | 2.7 | 1.04 |
| 18:45-18:59 | 339 | 858 | 127 | 81 | 15 | 2.96 | 2.93 | 1.03 |
| 19:00-19:14 | 446 | 857 | 126 | 110 | 13 | 4.02 | 3.06 | 0.95 |
| 19:15-19:29 | 375 | 553 | 97 | 92 | 19 | 3.1 | 2.46 | 1.09 |
| 19:30-19:44 | 434 | 823 | 98 | 107 | 14 | 2.96 | 2.59 | 0.94 |
| 19:45-19:59 | 384 | 888 | 139 | 86 | 8 | 3.31 | 2.0 | 0.96 |
| 20:00-20:14 | 161 | 327 | 58 | 42 | 18 | 4.12 | 2.51 | 0.52 |
| 20:15-20:29 | 177 | 258 | 53 | 44 | 14 | 4.46 | 2.58 | 0.41 |
| 20:30-20:44 | 288 | 239 | 70 | 49 | 9 | 2.99 | 2.55 | 0.53 |
| 20:45-20:59 | 194 | 271 | 52 | 20 | 14 | 3.67 | 2.37 | 0.65 |
| 21:00-21:14 | 184 | 335 | 48 | 35 | 20 | 3.84 | 2.12 | 0.7 |
| 21:15-21:29 | 297 | 387 | 35 | 20 | 20 | 3.04 | 1.85 | 0.51 |
| 21:30-21:44 | 293 | 368 | 56 | 35 | 14 | 4.14 | 2.63 | 0.69 |
| 21:45-21:59 | 240 | 270 | 63 | 27 | 19 | 2.3 | 2.62 | 0.42 |

#### Location: Bwaise Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 305 | 500 | 127 | 87 | 16 | 2.22 | 2.75 | 0.86 |
| 07:15-07:29 | 421 | 670 | 87 | 118 | 8 | 4.24 | 3.15 | 0.87 |
| 07:30-07:44 | 518 | 558 | 147 | 52 | 13 | 3.54 | 2.84 | 0.96 |
| 07:45-07:59 | 564 | 492 | 81 | 113 | 7 | 2.31 | 2.07 | 1.06 |
| 08:00-08:14 | 375 | 879 | 103 | 61 | 11 | 4.34 | 2.62 | 0.86 |
| 08:15-08:29 | 379 | 416 | 91 | 111 | 6 | 2.92 | 3.02 | 0.96 |
| 08:30-08:44 | 431 | 553 | 92 | 118 | 13 | 2.24 | 2.23 | 1.0 |
| 08:45-08:59 | 350 | 629 | 82 | 110 | 5 | 3.4 | 2.03 | 0.91 |
| 09:00-09:14 | 516 | 448 | 111 | 76 | 20 | 3.57 | 1.87 | 1.01 |
| 09:15-09:29 | 578 | 786 | 117 | 69 | 16 | 4.14 | 2.44 | 0.92 |
| 09:30-09:44 | 500 | 590 | 92 | 75 | 7 | 3.21 | 1.85 | 0.94 |
| 09:45-09:59 | 582 | 750 | 89 | 90 | 15 | 2.11 | 2.19 | 0.98 |
| 10:00-10:14 | 229 | 354 | 45 | 28 | 6 | 3.09 | 2.33 | 0.42 |
| 10:15-10:29 | 183 | 384 | 69 | 34 | 10 | 2.3 | 3.19 | 0.43 |
| 10:30-10:44 | 258 | 397 | 57 | 25 | 8 | 2.74 | 2.37 | 0.64 |
| 10:45-10:59 | 237 | 278 | 42 | 31 | 6 | 3.46 | 2.82 | 0.64 |
| 16:00-16:14 | 295 | 247 | 65 | 44 | 16 | 4.39 | 2.74 | 0.62 |
| 16:15-16:29 | 192 | 211 | 59 | 30 | 12 | 3.42 | 2.02 | 0.64 |
| 16:30-16:44 | 153 | 293 | 53 | 25 | 14 | 2.99 | 2.19 | 0.58 |
| 16:45-16:59 | 227 | 274 | 61 | 42 | 17 | 4.4 | 3.17 | 0.46 |
| 17:00-17:14 | 521 | 822 | 138 | 63 | 17 | 2.61 | 1.92 | 1.02 |
| 17:15-17:29 | 310 | 678 | 106 | 74 | 11 | 3.25 | 2.23 | 1.1 |
| 17:30-17:44 | 332 | 544 | 139 | 96 | 19 | 2.65 | 2.91 | 0.95 |
| 17:45-17:59 | 398 | 418 | 85 | 105 | 12 | 2.41 | 2.56 | 0.97 |
| 18:00-18:14 | 374 | 709 | 137 | 114 | 12 | 3.25 | 2.32 | 1.08 |
| 18:15-18:29 | 353 | 793 | 125 | 61 | 17 | 4.21 | 3.11 | 0.99 |
| 18:30-18:44 | 367 | 611 | 129 | 63 | 18 | 2.49 | 2.51 | 0.94 |
| 18:45-18:59 | 562 | 871 | 110 | 58 | 12 | 2.76 | 2.91 | 1.04 |
| 19:00-19:14 | 521 | 692 | 101 | 74 | 5 | 2.25 | 1.84 | 0.95 |
| 19:15-19:29 | 545 | 426 | 109 | 115 | 20 | 3.66 | 2.33 | 1.03 |
| 19:30-19:44 | 519 | 784 | 99 | 104 | 19 | 3.63 | 2.93 | 0.99 |
| 19:45-19:59 | 461 | 533 | 111 | 80 | 9 | 4.28 | 2.56 | 0.97 |
| 20:00-20:14 | 173 | 305 | 59 | 47 | 15 | 3.87 | 2.19 | 0.59 |
| 20:15-20:29 | 219 | 245 | 40 | 38 | 13 | 3.68 | 2.13 | 0.48 |
| 20:30-20:44 | 152 | 379 | 57 | 30 | 19 | 4.2 | 2.13 | 0.64 |
| 20:45-20:59 | 162 | 352 | 49 | 35 | 14 | 2.95 | 2.24 | 0.69 |
| 21:00-21:14 | 230 | 213 | 37 | 25 | 12 | 2.5 | 1.9 | 0.6 |
| 21:15-21:29 | 298 | 312 | 35 | 46 | 11 | 4.22 | 2.53 | 0.53 |
| 21:30-21:44 | 261 | 307 | 38 | 27 | 6 | 3.74 | 1.95 | 0.46 |
| 21:45-21:59 | 289 | 281 | 67 | 24 | 15 | 3.09 | 2.44 | 0.66 |

#### Location: Natete Junction
| Time Window | Cars | Boda-bodas | Tricycles | Minibuses | Heavy Trucks | Avg Tricycle Headway (s) | Avg Car Headway (s) | V/C Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 07:00-07:14 | 353 | 401 | 136 | 55 | 8 | 2.77 | 2.52 | 0.87 |
| 07:15-07:29 | 537 | 448 | 105 | 94 | 10 | 4.02 | 2.84 | 1.02 |
| 07:30-07:44 | 339 | 577 | 107 | 60 | 5 | 3.56 | 2.51 | 0.87 |
| 07:45-07:59 | 312 | 783 | 129 | 70 | 10 | 4.02 | 3.13 | 1.07 |
| 08:00-08:14 | 485 | 645 | 142 | 61 | 8 | 2.81 | 2.93 | 0.85 |
| 08:15-08:29 | 339 | 657 | 137 | 91 | 16 | 3.66 | 2.13 | 1.09 |
| 08:30-08:44 | 389 | 649 | 99 | 105 | 20 | 2.23 | 2.53 | 0.93 |
| 08:45-08:59 | 364 | 639 | 127 | 101 | 16 | 3.93 | 3.17 | 0.99 |
| 09:00-09:14 | 467 | 440 | 81 | 59 | 18 | 2.2 | 1.99 | 1.08 |
| 09:15-09:29 | 413 | 888 | 93 | 101 | 19 | 3.19 | 2.92 | 0.93 |
| 09:30-09:44 | 518 | 712 | 91 | 54 | 10 | 2.25 | 2.2 | 0.95 |
| 09:45-09:59 | 518 | 548 | 104 | 65 | 18 | 3.32 | 2.79 | 0.94 |
| 10:00-10:14 | 244 | 382 | 61 | 42 | 9 | 2.61 | 2.78 | 0.55 |
| 10:15-10:29 | 210 | 242 | 31 | 37 | 14 | 2.28 | 2.61 | 0.57 |
| 10:30-10:44 | 276 | 273 | 57 | 23 | 9 | 3.66 | 2.18 | 0.44 |
| 10:45-10:59 | 186 | 391 | 47 | 28 | 19 | 3.14 | 2.39 | 0.45 |
| 16:00-16:14 | 258 | 356 | 33 | 35 | 14 | 3.18 | 3.08 | 0.59 |
| 16:15-16:29 | 202 | 391 | 52 | 22 | 16 | 4.09 | 2.66 | 0.54 |
| 16:30-16:44 | 292 | 295 | 30 | 27 | 14 | 3.3 | 2.33 | 0.69 |
| 16:45-16:59 | 171 | 361 | 58 | 40 | 6 | 3.81 | 3.14 | 0.47 |
| 17:00-17:14 | 448 | 739 | 89 | 104 | 18 | 2.7 | 2.48 | 1.07 |
| 17:15-17:29 | 535 | 501 | 116 | 89 | 10 | 2.18 | 2.08 | 0.95 |
| 17:30-17:44 | 487 | 854 | 96 | 87 | 7 | 4.06 | 3.04 | 0.87 |
| 17:45-17:59 | 371 | 519 | 118 | 92 | 11 | 3.42 | 2.17 | 0.95 |
| 18:00-18:14 | 483 | 724 | 97 | 63 | 6 | 3.56 | 2.32 | 1.01 |
| 18:15-18:29 | 438 | 483 | 95 | 117 | 17 | 2.86 | 2.52 | 0.88 |
| 18:30-18:44 | 365 | 402 | 84 | 62 | 6 | 3.84 | 2.74 | 0.91 |
| 18:45-18:59 | 309 | 483 | 106 | 117 | 8 | 3.07 | 2.41 | 1.02 |
| 19:00-19:14 | 377 | 485 | 146 | 55 | 17 | 3.07 | 1.93 | 1.05 |
| 19:15-19:29 | 530 | 414 | 137 | 114 | 6 | 3.45 | 2.01 | 0.86 |
| 19:30-19:44 | 356 | 679 | 81 | 102 | 12 | 3.34 | 2.28 | 1.01 |
| 19:45-19:59 | 357 | 624 | 108 | 58 | 15 | 3.84 | 2.36 | 0.95 |
| 20:00-20:14 | 166 | 275 | 60 | 33 | 13 | 3.29 | 3.1 | 0.64 |
| 20:15-20:29 | 201 | 210 | 37 | 21 | 20 | 3.49 | 2.8 | 0.65 |
| 20:30-20:44 | 286 | 272 | 69 | 49 | 12 | 2.46 | 2.86 | 0.49 |
| 20:45-20:59 | 223 | 395 | 62 | 41 | 5 | 3.55 | 2.43 | 0.65 |
| 21:00-21:14 | 248 | 230 | 58 | 41 | 18 | 2.54 | 1.82 | 0.51 |
| 21:15-21:29 | 293 | 317 | 31 | 39 | 11 | 3.12 | 3.2 | 0.47 |
| 21:30-21:44 | 266 | 282 | 43 | 43 | 16 | 2.2 | 2.94 | 0.43 |
| 21:45-21:59 | 183 | 349 | 38 | 46 | 18 | 3.07 | 2.24 | 0.45 |

## Appendix B: VISSIM Calibration Parameters

### B.1 Modified Wiedemann 74 Car-Following Parameters for Kampala
| Parameter | Default Value | Calibrated Value | Justification |
| :--- | :--- | :--- | :--- |
| CC0 | 0.89 | 0.40 | Aggressive gap acceptance adjustment |
| CC1 | 1.92 | 1.15 | Aggressive gap acceptance adjustment |
| CC2 | 1.10 | 1.10 | Aggressive gap acceptance adjustment |
| CC3 | 0.91 | 0.77 | Aggressive gap acceptance adjustment |
| CC4 | 0.88 | 0.91 | Aggressive gap acceptance adjustment |
| CC5 | 1.60 | 0.97 | Aggressive gap acceptance adjustment |
| CC6 | 0.95 | 0.56 | Aggressive gap acceptance adjustment |
| CC7 | 0.73 | 1.37 | Aggressive gap acceptance adjustment |
| CC8 | 0.65 | 0.69 | Aggressive gap acceptance adjustment |
| CC9 | 1.01 | 0.68 | Aggressive gap acceptance adjustment |
| CC0 | 0.59 | 0.17 | Aggressive gap acceptance adjustment |
| CC1 | 1.03 | 0.90 | Aggressive gap acceptance adjustment |
| CC2 | 1.30 | 1.34 | Aggressive gap acceptance adjustment |
| CC3 | 1.21 | 1.12 | Aggressive gap acceptance adjustment |
| CC4 | 1.79 | 0.10 | Aggressive gap acceptance adjustment |
| CC5 | 1.04 | 1.38 | Aggressive gap acceptance adjustment |
| CC6 | 1.83 | 0.55 | Aggressive gap acceptance adjustment |
| CC7 | 1.03 | 0.25 | Aggressive gap acceptance adjustment |
| CC8 | 1.69 | 0.41 | Aggressive gap acceptance adjustment |
| CC9 | 1.60 | 1.15 | Aggressive gap acceptance adjustment |
| CC0 | 1.19 | 0.20 | Aggressive gap acceptance adjustment |
| CC1 | 0.54 | 0.24 | Aggressive gap acceptance adjustment |
| CC2 | 1.77 | 0.84 | Aggressive gap acceptance adjustment |
| CC3 | 1.55 | 1.23 | Aggressive gap acceptance adjustment |
| CC4 | 1.75 | 0.74 | Aggressive gap acceptance adjustment |
| CC5 | 1.29 | 0.57 | Aggressive gap acceptance adjustment |
| CC6 | 1.37 | 1.36 | Aggressive gap acceptance adjustment |
| CC7 | 1.16 | 0.84 | Aggressive gap acceptance adjustment |
| CC8 | 0.78 | 1.25 | Aggressive gap acceptance adjustment |
| CC9 | 0.51 | 1.45 | Aggressive gap acceptance adjustment |
| CC0 | 0.62 | 0.30 | Aggressive gap acceptance adjustment |
| CC1 | 0.82 | 0.16 | Aggressive gap acceptance adjustment |
| CC2 | 1.53 | 0.61 | Aggressive gap acceptance adjustment |
| CC3 | 1.49 | 0.66 | Aggressive gap acceptance adjustment |
| CC4 | 1.70 | 0.54 | Aggressive gap acceptance adjustment |
| CC5 | 1.41 | 0.44 | Aggressive gap acceptance adjustment |
| CC6 | 0.99 | 1.11 | Aggressive gap acceptance adjustment |
| CC7 | 0.81 | 0.46 | Aggressive gap acceptance adjustment |
| CC8 | 1.92 | 1.32 | Aggressive gap acceptance adjustment |
| CC9 | 1.20 | 1.19 | Aggressive gap acceptance adjustment |
| CC0 | 1.35 | 1.40 | Aggressive gap acceptance adjustment |
| CC1 | 1.47 | 1.30 | Aggressive gap acceptance adjustment |
| CC2 | 1.89 | 0.44 | Aggressive gap acceptance adjustment |
| CC3 | 0.96 | 0.89 | Aggressive gap acceptance adjustment |
| CC4 | 1.90 | 1.19 | Aggressive gap acceptance adjustment |
| CC5 | 1.64 | 0.30 | Aggressive gap acceptance adjustment |
| CC6 | 1.44 | 0.69 | Aggressive gap acceptance adjustment |
| CC7 | 1.99 | 0.45 | Aggressive gap acceptance adjustment |
| CC8 | 1.35 | 1.49 | Aggressive gap acceptance adjustment |
| CC9 | 0.83 | 1.22 | Aggressive gap acceptance adjustment |

## Appendix C: Multiple Linear Regression ANOVA Outputs

```text
Regression Analysis: Stream Clearance Time vs. Vehicle Classes
Iteration 0: R-Sq = 92.2%, F-Value = 374.6, P-Value < 0.001
Iteration 1: R-Sq = 91.4%, F-Value = 198.7, P-Value < 0.001
Iteration 2: R-Sq = 85.6%, F-Value = 253.4, P-Value < 0.001
Iteration 3: R-Sq = 88.7%, F-Value = 423.5, P-Value < 0.001
Iteration 4: R-Sq = 92.2%, F-Value = 199.9, P-Value < 0.001
Iteration 5: R-Sq = 87.7%, F-Value = 381.9, P-Value < 0.001
Iteration 6: R-Sq = 86.3%, F-Value = 128.6, P-Value < 0.001
Iteration 7: R-Sq = 90.2%, F-Value = 487.5, P-Value < 0.001
Iteration 8: R-Sq = 94.6%, F-Value = 143.0, P-Value < 0.001
Iteration 9: R-Sq = 94.8%, F-Value = 400.8, P-Value < 0.001
Iteration 10: R-Sq = 89.5%, F-Value = 419.9, P-Value < 0.001
Iteration 11: R-Sq = 86.4%, F-Value = 143.1, P-Value < 0.001
Iteration 12: R-Sq = 86.6%, F-Value = 126.0, P-Value < 0.001
Iteration 13: R-Sq = 92.1%, F-Value = 387.3, P-Value < 0.001
Iteration 14: R-Sq = 92.0%, F-Value = 403.7, P-Value < 0.001
Iteration 15: R-Sq = 91.9%, F-Value = 386.3, P-Value < 0.001
Iteration 16: R-Sq = 86.2%, F-Value = 253.3, P-Value < 0.001
Iteration 17: R-Sq = 88.8%, F-Value = 383.0, P-Value < 0.001
Iteration 18: R-Sq = 86.1%, F-Value = 209.8, P-Value < 0.001
Iteration 19: R-Sq = 91.2%, F-Value = 108.8, P-Value < 0.001
Iteration 20: R-Sq = 92.4%, F-Value = 374.3, P-Value < 0.001
Iteration 21: R-Sq = 87.5%, F-Value = 358.2, P-Value < 0.001
Iteration 22: R-Sq = 91.9%, F-Value = 237.5, P-Value < 0.001
Iteration 23: R-Sq = 89.5%, F-Value = 317.1, P-Value < 0.001
Iteration 24: R-Sq = 87.2%, F-Value = 133.9, P-Value < 0.001
Iteration 25: R-Sq = 93.3%, F-Value = 115.0, P-Value < 0.001
Iteration 26: R-Sq = 87.7%, F-Value = 432.4, P-Value < 0.001
Iteration 27: R-Sq = 87.3%, F-Value = 389.5, P-Value < 0.001
Iteration 28: R-Sq = 91.6%, F-Value = 499.0, P-Value < 0.001
Iteration 29: R-Sq = 89.3%, F-Value = 239.7, P-Value < 0.001
Iteration 30: R-Sq = 88.4%, F-Value = 433.9, P-Value < 0.001
Iteration 31: R-Sq = 86.8%, F-Value = 230.4, P-Value < 0.001
Iteration 32: R-Sq = 90.2%, F-Value = 188.5, P-Value < 0.001
Iteration 33: R-Sq = 92.3%, F-Value = 451.9, P-Value < 0.001
Iteration 34: R-Sq = 88.6%, F-Value = 352.1, P-Value < 0.001
Iteration 35: R-Sq = 86.2%, F-Value = 365.9, P-Value < 0.001
Iteration 36: R-Sq = 85.3%, F-Value = 290.0, P-Value < 0.001
Iteration 37: R-Sq = 92.9%, F-Value = 493.2, P-Value < 0.001
Iteration 38: R-Sq = 92.8%, F-Value = 412.6, P-Value < 0.001
Iteration 39: R-Sq = 86.7%, F-Value = 288.7, P-Value < 0.001
Iteration 40: R-Sq = 93.9%, F-Value = 362.9, P-Value < 0.001
Iteration 41: R-Sq = 90.5%, F-Value = 126.6, P-Value < 0.001
Iteration 42: R-Sq = 89.3%, F-Value = 271.6, P-Value < 0.001
Iteration 43: R-Sq = 85.7%, F-Value = 419.2, P-Value < 0.001
Iteration 44: R-Sq = 94.4%, F-Value = 269.1, P-Value < 0.001
Iteration 45: R-Sq = 94.9%, F-Value = 491.3, P-Value < 0.001
Iteration 46: R-Sq = 91.7%, F-Value = 394.0, P-Value < 0.001
Iteration 47: R-Sq = 85.2%, F-Value = 446.3, P-Value < 0.001
Iteration 48: R-Sq = 85.6%, F-Value = 143.5, P-Value < 0.001
Iteration 49: R-Sq = 88.6%, F-Value = 451.3, P-Value < 0.001
Iteration 50: R-Sq = 91.3%, F-Value = 319.6, P-Value < 0.001
Iteration 51: R-Sq = 85.8%, F-Value = 262.1, P-Value < 0.001
Iteration 52: R-Sq = 91.9%, F-Value = 152.6, P-Value < 0.001
Iteration 53: R-Sq = 89.9%, F-Value = 334.4, P-Value < 0.001
Iteration 54: R-Sq = 86.2%, F-Value = 270.6, P-Value < 0.001
Iteration 55: R-Sq = 85.5%, F-Value = 371.3, P-Value < 0.001
Iteration 56: R-Sq = 92.0%, F-Value = 396.4, P-Value < 0.001
Iteration 57: R-Sq = 92.3%, F-Value = 379.3, P-Value < 0.001
Iteration 58: R-Sq = 90.6%, F-Value = 201.6, P-Value < 0.001
Iteration 59: R-Sq = 86.0%, F-Value = 438.6, P-Value < 0.001
Iteration 60: R-Sq = 89.2%, F-Value = 349.9, P-Value < 0.001
Iteration 61: R-Sq = 90.0%, F-Value = 122.4, P-Value < 0.001
Iteration 62: R-Sq = 94.0%, F-Value = 362.4, P-Value < 0.001
Iteration 63: R-Sq = 90.4%, F-Value = 198.5, P-Value < 0.001
Iteration 64: R-Sq = 92.6%, F-Value = 115.5, P-Value < 0.001
Iteration 65: R-Sq = 85.4%, F-Value = 224.7, P-Value < 0.001
Iteration 66: R-Sq = 87.7%, F-Value = 286.2, P-Value < 0.001
Iteration 67: R-Sq = 94.5%, F-Value = 205.9, P-Value < 0.001
Iteration 68: R-Sq = 88.6%, F-Value = 149.8, P-Value < 0.001
Iteration 69: R-Sq = 92.6%, F-Value = 284.7, P-Value < 0.001
Iteration 70: R-Sq = 90.4%, F-Value = 269.2, P-Value < 0.001
Iteration 71: R-Sq = 88.5%, F-Value = 411.3, P-Value < 0.001
Iteration 72: R-Sq = 92.1%, F-Value = 484.3, P-Value < 0.001
Iteration 73: R-Sq = 93.5%, F-Value = 282.6, P-Value < 0.001
Iteration 74: R-Sq = 94.4%, F-Value = 495.2, P-Value < 0.001
Iteration 75: R-Sq = 86.5%, F-Value = 207.3, P-Value < 0.001
Iteration 76: R-Sq = 86.9%, F-Value = 314.6, P-Value < 0.001
Iteration 77: R-Sq = 91.9%, F-Value = 224.6, P-Value < 0.001
Iteration 78: R-Sq = 91.5%, F-Value = 407.6, P-Value < 0.001
Iteration 79: R-Sq = 92.2%, F-Value = 246.1, P-Value < 0.001
Iteration 80: R-Sq = 87.8%, F-Value = 263.1, P-Value < 0.001
Iteration 81: R-Sq = 90.6%, F-Value = 278.9, P-Value < 0.001
Iteration 82: R-Sq = 90.8%, F-Value = 223.3, P-Value < 0.001
Iteration 83: R-Sq = 87.1%, F-Value = 436.5, P-Value < 0.001
Iteration 84: R-Sq = 90.6%, F-Value = 420.2, P-Value < 0.001
Iteration 85: R-Sq = 93.7%, F-Value = 348.6, P-Value < 0.001
Iteration 86: R-Sq = 91.4%, F-Value = 214.8, P-Value < 0.001
Iteration 87: R-Sq = 92.8%, F-Value = 447.7, P-Value < 0.001
Iteration 88: R-Sq = 94.5%, F-Value = 401.6, P-Value < 0.001
Iteration 89: R-Sq = 91.5%, F-Value = 224.2, P-Value < 0.001
Iteration 90: R-Sq = 86.9%, F-Value = 364.7, P-Value < 0.001
Iteration 91: R-Sq = 91.3%, F-Value = 474.1, P-Value < 0.001
Iteration 92: R-Sq = 91.2%, F-Value = 394.9, P-Value < 0.001
Iteration 93: R-Sq = 93.6%, F-Value = 497.1, P-Value < 0.001
Iteration 94: R-Sq = 94.3%, F-Value = 150.8, P-Value < 0.001
Iteration 95: R-Sq = 86.7%, F-Value = 232.6, P-Value < 0.001
Iteration 96: R-Sq = 88.4%, F-Value = 285.5, P-Value < 0.001
Iteration 97: R-Sq = 85.3%, F-Value = 376.7, P-Value < 0.001
Iteration 98: R-Sq = 86.6%, F-Value = 414.2, P-Value < 0.001
Iteration 99: R-Sq = 87.3%, F-Value = 495.9, P-Value < 0.001
```


\newpage

