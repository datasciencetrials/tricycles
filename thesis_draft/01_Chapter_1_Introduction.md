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
