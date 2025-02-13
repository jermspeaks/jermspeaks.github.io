export interface Holiday {
  date: string;
  holiday: string;
  note?: string;
}

const holidays: Holiday[] = [
  {
    date: "2025-01-01",
    holiday: "New Year's Day",
    note: "All",
  },
  {
    date: "2025-01-01",
    holiday: "New Year's Day",
  },
  {
    date: "2025-01-02",
    holiday: "Last Day of Chanukah",
  },
  {
    date: "2025-01-04",
    holiday: "World Braille Day",
  },
  {
    date: "2025-01-06",
    holiday: "Epiphany",
  },
  {
    date: "2025-01-07",
    holiday: "Orthodox Christmas Day",
  },
  {
    date: "2025-01-07",
    holiday: "International Programmers' Day",
  },
  {
    date: "2025-01-07",
    holiday: "Estelle Reel Day",
    note: "Wyoming",
  },
  {
    date: "2025-01-08",
    holiday: "Battle of New Orleans",
    note: "Louisiana",
  },
  {
    date: "2025-01-09",
    holiday: "National Day of Mourning for Jimmy Carter",
  },
  {
    date: "2025-01-10",
    holiday: "Asarah B'Tevet",
  },
  {
    date: "2025-01-14",
    holiday: "Orthodox New Year",
  },
  {
    date: "2025-01-19",
    holiday: "World Religion Day",
  },
  {
    date: "2025-01-19",
    holiday: "Robert E. Lee's Birthday",
    note: "Florida",
  },
  {
    date: "2025-01-19",
    holiday: "State Holiday",
    note: "Georgia",
  },
  {
    date: "2025-01-19",
    holiday: "Confederate Heroes' Day",
    note: "Texas",
  },
  {
    date: "2025-01-20",
    holiday: "Martin Luther King Jr. Day",
    note: "All",
  },
  {
    date: "2025-01-20",
    holiday: "Martin Luther King Jr. Day",
  },
  {
    date: "2025-01-20",
    holiday: "Robert E. Lee's Birthday",
    note: "Alabama, Mississippi",
  },
  {
    date: "2025-01-20",
    holiday: "Idaho Human Rights Day",
    note: "Idaho",
  },
  {
    date: "2025-01-20",
    holiday: "Civil Rights Day",
    note: "Arizona, New Hampshire",
  },
  {
    date: "2025-01-20",
    holiday: "Inauguration Day",
    note: "District of Columbia",
  },
  {
    date: "2025-01-20",
    holiday: "Inauguration Day",
    note: "DC, MD*, VA*",
  },
  {
    date: "2025-01-24",
    holiday: "International Day of Education",
  },
  {
    date: "2025-01-26",
    holiday: "International Customs Day",
  },
  {
    date: "2025-01-26",
    holiday: "World Leprosy Day",
  },
  {
    date: "2025-01-27",
    holiday: "World Holocaust Victims Remembrance Day",
  },
  {
    date: "2025-01-28",
    holiday: "Isra and Mi'raj",
  },
  {
    date: "2025-01-29",
    holiday: "Kansas Day",
    note: "Kansas",
  },
  {
    date: "2025-01-29",
    holiday: "Lunar New Year",
  },
  {
    date: "2025-01-29",
    holiday: "Lunar New Year",
    note: "California, Washington",
  },
  {
    date: "2025-02-01",
    holiday: "National Freedom Day",
  },
  {
    date: "2025-02-01",
    holiday: "First Day of Black History Month",
  },
  {
    date: "2025-02-02",
    holiday: "World Wetlands Day",
  },
  {
    date: "2025-02-02",
    holiday: "Groundhog Day",
  },
  {
    date: "2025-02-04",
    holiday: "International Day of Human Fraternity",
  },
  {
    date: "2025-02-04",
    holiday: "World Cancer Day",
  },
  {
    date: "2025-02-04",
    holiday: "Rosa Parks Day",
    note: "CA, MO, NY",
  },
  {
    date: "2025-02-05",
    holiday: "National Girls and Women in Sports Day",
  },
  {
    date: "2025-02-06",
    holiday:
      "International Day of Zero Tolerance for Female Genital Mutilation",
  },
  {
    date: "2025-02-06",
    holiday: "Ronald Reagan Day",
    note: "California",
  },
  {
    date: "2025-02-07",
    holiday: "Lunar New Year",
    note: "Colorado",
  },
  {
    date: "2025-02-07",
    holiday: "National Wear Red Day",
  },
  {
    date: "2025-02-09",
    holiday: "Super Bowl",
  },
  {
    date: "2025-02-10",
    holiday: "World Pulses Day",
  },
  {
    date: "2025-02-11",
    holiday: "International Day of Women and Girls in Science",
  },
  {
    date: "2025-02-11",
    holiday: "World Day of the Sick",
  },
  {
    date: "2025-02-12",
    holiday: "Lincoln's Birthday",
    note: "CT, IL, MO, NY",
  },
  {
    date: "2025-02-12",
    holiday: "Lincoln's Birthday",
    note: "Florida",
  },
  {
    date: "2025-02-12",
    holiday: "Georgia Day",
    note: "Georgia",
  },
  {
    date: "2025-02-13",
    holiday: "Tu Bishvat/Tu B'Shevat",
  },
  {
    date: "2025-02-13",
    holiday: "World Radio Day",
  },
  {
    date: "2025-02-14",
    holiday: "Valentine's Day",
  },
  {
    date: "2025-02-14",
    holiday: "Statehood Day",
    note: "Arizona",
  },
  {
    date: "2025-02-15",
    holiday: "Susan B. Anthony's Birthday",
    note: "Florida, Wisconsin",
  },
  {
    date: "2025-02-15",
    holiday: "Susan B. Anthony Day",
    note: "Colorado, New York",
  },
  {
    date: "2025-02-16",
    holiday: "Elizabeth Peratrovich Day",
    note: "Alaska",
  },
  {
    date: "2025-02-17",
    holiday: "Presidents' Day",
  },
  {
    date: "2025-02-17",
    holiday: "Presidents' Day",
    note: "Most regions",
  },
  {
    date: "2025-02-17",
    holiday: "Presidents' Day",
    note: "Many regions",
  },
  {
    date: "2025-02-17",
    holiday: "Daisy Gatson Bates Day",
    note: "Arkansas",
  },
  {
    date: "2025-02-20",
    holiday: "World Day of Social Justice",
  },
  {
    date: "2025-02-21",
    holiday: "International Mother Language Day",
  },
  {
    date: "2025-02-25",
    holiday: "Maha Shivaratri",
  },
  {
    date: "2025-02-25",
    holiday: "African-American Scientist and Inventor Day",
    note: "Virginia",
  },
  {
    date: "2025-02-25",
    holiday: "George Rogers Clark Day",
    note: "Indiana",
  },
  {
    date: "2025-02-26",
    holiday: "Maha Shivaratri",
  },
  {
    date: "2025-02-28",
    holiday: "Linus Pauling Day",
    note: "Oregon",
  },
  {
    date: "2025-03-01",
    holiday: "First Day of Ramadan",
  },
  {
    date: "2025-03-01",
    holiday: "Zero Discrimination Day",
  },
  {
    date: "2025-03-01",
    holiday: "Self-Injury Awareness Day",
  },
  {
    date: "2025-03-01",
    holiday: "St. David's Day",
  },
  {
    date: "2025-03-01",
    holiday: "First Day of Women's History Month",
  },
  {
    date: "2025-03-01",
    holiday: "First Day of Irish American Heritage Month",
  },
  {
    date: "2025-03-02",
    holiday: "Texas Independence Day",
    note: "Texas",
  },
  {
    date: "2025-03-03",
    holiday: "World Wildlife Day",
  },
  {
    date: "2025-03-03",
    holiday: "Casimir Pulaski Day",
    note: "Illinois, Indiana",
  },
  {
    date: "2025-03-03",
    holiday: "Read Across America Day",
  },
  {
    date: "2025-03-04",
    holiday: "Shrove Tuesday/Mardi Gras",
    note: "AL*, FL*, LA, MS*",
  },
  {
    date: "2025-03-04",
    holiday: "Shrove Tuesday/Mardi Gras",
  },
  {
    date: "2025-03-04",
    holiday: "Casimir Pulaski Day",
    note: "Wisconsin",
  },
  {
    date: "2025-03-04",
    holiday: "Town Meeting Day",
    note: "Vermont",
  },
  {
    date: "2025-03-05",
    holiday: "Ash Wednesday",
  },
  {
    date: "2025-03-07",
    holiday: "Employee Appreciation Day",
  },
  {
    date: "2025-03-08",
    holiday: "International Women's Day",
  },
  {
    date: "2025-03-09",
    holiday: "Daylight Saving Time starts",
  },
  {
    date: "2025-03-10",
    holiday: "International Day of Women Judges",
  },
  {
    date: "2025-03-13",
    holiday: "World Kidney Day",
  },
  {
    date: "2025-03-14",
    holiday: "Holi",
  },
  {
    date: "2025-03-14",
    holiday: "Purim",
  },
  {
    date: "2025-03-15",
    holiday: "Long Covid Awareness Day",
  },
  {
    date: "2025-03-17",
    holiday: "St. Patrick's Day",
  },
  {
    date: "2025-03-17",
    holiday: "Evacuation Day",
    note: "Massachusetts",
  },
  {
    date: "2025-03-20",
    holiday: "French Language Day",
  },
  {
    date: "2025-03-20",
    holiday: "International Day of Happiness",
  },
  {
    date: "2025-03-20",
    holiday: "March Equinox",
  },
  {
    date: "2025-03-21",
    holiday: "World Day to Eliminate Racial Discrimination",
  },
  {
    date: "2025-03-21",
    holiday: "World Poetry Day",
  },
  {
    date: "2025-03-21",
    holiday: "International Day of Nowruz",
  },
  {
    date: "2025-03-21",
    holiday: "World Down Syndrome Day",
  },
  {
    date: "2025-03-21",
    holiday: "International Day of Forests",
  },
  {
    date: "2025-03-22",
    holiday: "World Water Day",
  },
  {
    date: "2025-03-23",
    holiday: "World Meteorological Day",
  },
  {
    date: "2025-03-24",
    holiday: "World Tuberculosis Day",
  },
  {
    date: "2025-03-24",
    holiday: "World Day for Truth concerning Human Rights Violations",
  },
  {
    date: "2025-03-25",
    holiday: "Day to Remember Slavery Victims and Transatlantic Slave Trade",
  },
  {
    date: "2025-03-25",
    holiday: "World Solidarity Day for Detained and Missing Workers",
  },
  {
    date: "2025-03-25",
    holiday: "Maryland Day",
    note: "Maryland",
  },
  {
    date: "2025-03-26",
    holiday: "Lailat al-Qadr",
  },
  {
    date: "2025-03-26",
    holiday: "Prince Jonah Kuhio Kalanianaole Day",
    note: "Hawaii",
  },
  {
    date: "2025-03-29",
    holiday: "Earth Hour",
  },
  {
    date: "2025-03-29",
    holiday: "National Vietnam War Veterans Day",
  },
  {
    date: "2025-03-30",
    holiday: "Wyoming Veterans Welcome Home Day",
    note: "Wyoming",
  },
  {
    date: "2025-03-30",
    holiday: "Doctors' Day",
  },
  {
    date: "2025-03-30",
    holiday: "Vietnam Veterans Day",
    note: "Delaware",
  },
  {
    date: "2025-03-30",
    holiday: "Vietnam Veteran Recognition Day",
    note: "West Virginia",
  },
  {
    date: "2025-03-31",
    holiday: "Eid al-Fitr",
  },
  {
    date: "2025-03-31",
    holiday: "International Transgender Day of Visibility",
  },
  {
    date: "2025-03-31",
    holiday: "Seward's Day",
    note: "Alaska",
  },
  {
    date: "2025-03-31",
    holiday: "César Chávez Day",
    note: "Many regions",
  },
  {
    date: "2025-03-31",
    holiday: "César Chávez Day",
    note: "Washington",
  },
  {
    date: "2025-04-01",
    holiday: "April Fool's Day",
  },
  {
    date: "2025-04-02",
    holiday: "World Autism Awareness Day",
  },
  {
    date: "2025-04-02",
    holiday: "Pascua Florida Day",
    note: "Florida",
  },
  {
    date: "2025-04-04",
    holiday: "Mine Awareness Day",
  },
  {
    date: "2025-04-05",
    holiday: "International Day of Conscience",
  },
  {
    date: "2025-04-06",
    holiday: "International Sport Day",
  },
  {
    date: "2025-04-06",
    holiday: "National Tartan Day",
  },
  {
    date: "2025-04-07",
    holiday: "United Nations' World Health Day",
  },
  {
    date: "2025-04-07",
    holiday: "Day to Remember Rwanda Genocide Victims",
  },
  {
    date: "2025-04-08",
    holiday: "National Library Workers' Day",
  },
  {
    date: "2025-04-12",
    holiday: "Passover Eve",
  },
  {
    date: "2025-04-12",
    holiday: "International Day of Human Space Flight",
  },
  {
    date: "2025-04-13",
    holiday: "Palm Sunday",
  },
  {
    date: "2025-04-13",
    holiday: "Passover",
    note: "first day",
  },
  {
    date: "2025-04-13",
    holiday: "Thomas Jefferson's Birthday",
  },
  {
    date: "2025-04-14",
    holiday: "World Chagas Disease Day",
  },
  {
    date: "2025-04-15",
    holiday: "World Art Day",
  },
  {
    date: "2025-04-15",
    holiday: "Tax Day",
  },
  {
    date: "2025-04-15",
    holiday: "Father Damien Day",
    note: "Hawaii",
  },
  {
    date: "2025-04-16",
    holiday: "Emancipation Day",
    note: "District of Columbia",
  },
  {
    date: "2025-04-17",
    holiday: "Maundy Thursday",
  },
  {
    date: "2025-04-18",
    holiday: "Orthodox Good Friday",
  },
  {
    date: "2025-04-18",
    holiday: "International Day for Monuments and Sites",
  },
  {
    date: "2025-04-18",
    holiday: "Good Friday",
    note: "Many regions",
  },
  {
    date: "2025-04-18",
    holiday: "Arbor Day",
    note: "Colorado",
  },
  {
    date: "2025-04-18",
    holiday: "State Holiday",
    note: "Georgia",
  },
  {
    date: "2025-04-19",
    holiday: "Holy Saturday",
  },
  {
    date: "2025-04-19",
    holiday: "Orthodox Holy Saturday",
  },
  {
    date: "2025-04-20",
    holiday: "Last Day of Passover",
  },
  {
    date: "2025-04-20",
    holiday: "Orthodox Easter",
  },
  {
    date: "2025-04-20",
    holiday: "Chinese Language Day",
  },
  {
    date: "2025-04-20",
    holiday: "Easter Sunday",
  },
  {
    date: "2025-04-21",
    holiday: "Orthodox Easter Monday",
  },
  {
    date: "2025-04-21",
    holiday: "World Creativity and Innovation Day",
  },
  {
    date: "2025-04-21",
    holiday: "Easter Monday",
  },
  {
    date: "2025-04-21",
    holiday: "Patriots' Day",
    note: "Maine, Massachusetts",
  },
  {
    date: "2025-04-21",
    holiday: "San Jacinto Day",
    note: "Texas",
  },
  {
    date: "2025-04-21",
    holiday: "Boston Marathon",
  },
  {
    date: "2025-04-22",
    holiday: "Earth Day",
  },
  {
    date: "2025-04-22",
    holiday: "Oklahoma Day",
    note: "Oklahoma",
  },
  {
    date: "2025-04-23",
    holiday: "Yom HaShoah",
  },
  {
    date: "2025-04-23",
    holiday: "World Book and Copyright Day",
  },
  {
    date: "2025-04-23",
    holiday: "World Spanish Language Day",
  },
  {
    date: "2025-04-23",
    holiday: "English Language Day",
  },
  {
    date: "2025-04-23",
    holiday: "Administrative Professionals Day",
  },
  {
    date: "2025-04-24",
    holiday: "International Girls in ICT Day",
  },
  {
    date: "2025-04-24",
    holiday: "International Day of Multilateralism and Diplomacy for Peace",
  },
  {
    date: "2025-04-24",
    holiday: "Take our Daughters and Sons to Work Day",
  },
  {
    date: "2025-04-25",
    holiday: "International Delegate's Day",
  },
  {
    date: "2025-04-25",
    holiday: "World Malaria Day",
  },
  {
    date: "2025-04-25",
    holiday: "Arbor Day",
    note: "Nebraska",
  },
  {
    date: "2025-04-25",
    holiday: "Arbor Day",
    note: "Arizona, Delaware",
  },
  {
    date: "2025-04-26",
    holiday: "World Intellectual Property Day",
  },
  {
    date: "2025-04-26",
    holiday: "International Chernobyl Disaster Remembrance Day",
  },
  {
    date: "2025-04-26",
    holiday: "Confederate Memorial Day",
    note: "Florida",
  },
  {
    date: "2025-04-26",
    holiday: "State Holiday",
    note: "Georgia",
  },
  {
    date: "2025-04-28",
    holiday: "World Day for Safety and Health at Work",
  },
  {
    date: "2025-04-28",
    holiday: "Arbor Day",
    note: "Wyoming",
  },
  {
    date: "2025-04-28",
    holiday: "Confederate Memorial Day",
    note: "Alabama",
  },
  {
    date: "2025-04-28",
    holiday: "Confederate Memorial Day",
    note: "Mississippi",
  },
  {
    date: "2025-04-30",
    holiday: "International Jazz Day",
  },
  {
    date: "2025-05-01",
    holiday: "Yom Ha'atzmaut",
  },
  {
    date: "2025-05-01",
    holiday: "Law Day",
  },
  {
    date: "2025-05-01",
    holiday: "Loyalty Day",
  },
  {
    date: "2025-05-01",
    holiday: "National Day of Prayer",
  },
  {
    date: "2025-05-01",
    holiday: "Lei Day",
    note: "Hawaii",
  },
  {
    date: "2025-05-01",
    holiday: "West Virginia Day of Prayer",
    note: "West Virginia",
  },
  {
    date: "2025-05-01",
    holiday: "First Day of Military Appreciation Month",
  },
  {
    date: "2025-05-01",
    holiday: "First Day of Asian Pacific American Heritage Month",
  },
  {
    date: "2025-05-01",
    holiday: "First Day of Jewish American Heritage Month",
  },
  {
    date: "2025-05-02",
    holiday: "World Tuna Day",
  },
  {
    date: "2025-05-02",
    holiday: "Kentucky Oaks",
  },
  {
    date: "2025-05-03",
    holiday: "World Press Freedom Day",
  },
  {
    date: "2025-05-03",
    holiday: "Kentucky Derby",
  },
  {
    date: "2025-05-03",
    holiday: "National Explosive Ordnance Disposal (EOD) Day",
  },
  {
    date: "2025-05-04",
    holiday: "International Family Equality Day",
  },
  {
    date: "2025-05-04",
    holiday: "Kent State Shootings Remembrance",
    note: "Ohio",
  },
  {
    date: "2025-05-04",
    holiday: "Rhode Island Independence Day",
    note: "Rhode Island",
  },
  {
    date: "2025-05-05",
    holiday: "World Portuguese Language Day",
  },
  {
    date: "2025-05-05",
    holiday: "Cinco de Mayo",
  },
  {
    date: "2025-05-06",
    holiday: "National Nurses Day",
  },
  {
    date: "2025-05-06",
    holiday: "National Teacher Appreciation Day",
  },
  {
    date: "2025-05-08",
    holiday: "Time to Remember Lost Lives From World War II",
  },
  {
    date: "2025-05-08",
    holiday: "World Ovarian Cancer Day",
  },
  {
    date: "2025-05-08",
    holiday: "World Red Cross and Red Crescent Day",
  },
  {
    date: "2025-05-08",
    holiday: "Truman Day",
    note: "Missouri",
  },
  {
    date: "2025-05-08",
    holiday: "Victory in Europe Day",
  },
  {
    date: "2025-05-09",
    holiday: "'Confederate Memorial Day' observed",
    note: "South Carolina",
  },
  {
    date: "2025-05-09",
    holiday: "Native American Day",
    note: "Wyoming",
  },
  {
    date: "2025-05-09",
    holiday: "Military Spouse Appreciation Day",
    note: "Delaware",
  },
  {
    date: "2025-05-09",
    holiday: "Military Spouse Appreciation Day",
  },
  {
    date: "2025-05-10",
    holiday: "World Migratory Bird Day",
  },
  {
    date: "2025-05-10",
    holiday: "International Day of Argania",
  },
  {
    date: "2025-05-10",
    holiday: "Confederate Memorial Day",
    note: "South Carolina",
  },
  {
    date: "2025-05-10",
    holiday: "Confederate Memorial Day",
    note: "North Carolina",
  },
  {
    date: "2025-05-11",
    holiday: "Mother's Day",
  },
  {
    date: "2025-05-11",
    holiday: "Mother's Day",
    note: "Arizona",
  },
  {
    date: "2025-05-12",
    holiday: "Vesak Day",
  },
  {
    date: "2025-05-12",
    holiday: "International Nurses Day",
  },
  {
    date: "2025-05-15",
    holiday: "International Day of Families",
  },
  {
    date: "2025-05-15",
    holiday: "Peace Officers Memorial Day",
  },
  {
    date: "2025-05-16",
    holiday: "Lag BaOmer",
  },
  {
    date: "2025-05-16",
    holiday: "International Day of Living Together in Peace",
  },
  {
    date: "2025-05-16",
    holiday: "International Day of Light",
  },
  {
    date: "2025-05-16",
    holiday: "National Defense Transportation Day",
  },
  {
    date: "2025-05-17",
    holiday: "World Telecommunication and Information Society Day",
  },
  {
    date: "2025-05-17",
    holiday: "Public Lands Day",
    note: "Colorado",
  },
  {
    date: "2025-05-17",
    holiday: "Armed Forces Day",
  },
  {
    date: "2025-05-17",
    holiday: "Preakness Stakes",
  },
  {
    date: "2025-05-20",
    holiday: "World Bee Day",
  },
  {
    date: "2025-05-20",
    holiday: "World Autoimmune / Autoinflammatory Arthritis Day",
  },
  {
    date: "2025-05-21",
    holiday: "World Day for Cultural Diversity",
  },
  {
    date: "2025-05-21",
    holiday: "International Tea Day",
  },
  {
    date: "2025-05-21",
    holiday: "Emergency Medical Services for Children Day",
  },
  {
    date: "2025-05-22",
    holiday: "World Biological Diversity Day",
  },
  {
    date: "2025-05-22",
    holiday: "National Maritime Day",
  },
  {
    date: "2025-05-22",
    holiday: "Harvey Milk Day",
    note: "California",
  },
  {
    date: "2025-05-23",
    holiday: "International Day to End Obstetric Fistula",
  },
  {
    date: "2025-05-25",
    holiday: "African Liberation Day",
  },
  {
    date: "2025-05-25",
    holiday: "National Missing Children's Day",
  },
  {
    date: "2025-05-26",
    holiday: "Memorial Day",
  },
  {
    date: "2025-05-26",
    holiday: "Decoration Day",
    note: "AK, AL, AR, AZ, CA",
  },
  {
    date: "2025-05-26",
    holiday: "Jefferson Davis' Birthday",
    note: "Mississippi",
  },
  {
    date: "2025-05-29",
    holiday: "Ascension Day",
  },
  {
    date: "2025-05-29",
    holiday: "International Day of United Nations Peacekeepers",
  },
  {
    date: "2025-05-31",
    holiday: "World No Tobacco Day",
  },
  {
    date: "2025-06-01",
    holiday: "Global Day of Parents",
  },
  {
    date: "2025-06-01",
    holiday: "First Day of Pride Month",
  },
  {
    date: "2025-06-01",
    holiday: "First Day of Caribbean-American Heritage Month",
  },
  {
    date: "2025-06-01",
    holiday: "Statehood Day",
    note: "Kentucky, Tennessee",
  },
  {
    date: "2025-06-02",
    holiday: "Shavuot",
  },
  {
    date: "2025-06-02",
    holiday: "Jefferson Davis' Birthday",
    note: "Alabama",
  },
  {
    date: "2025-06-03",
    holiday: "World Bicycle Day",
  },
  {
    date: "2025-06-03",
    holiday: "Jefferson Davis' Birthday",
    note: "Florida",
  },
  {
    date: "2025-06-04",
    holiday: "World Day for Child Victims of Aggression",
  },
  {
    date: "2025-06-05",
    holiday: "World Environment Day",
  },
  {
    date: "2025-06-05",
    holiday:
      "International Day for the Fight against Illegal, Unreported and Unregulated Fishing",
  },
  {
    date: "2025-06-06",
    holiday: "Day of the Russian Language",
  },
  {
    date: "2025-06-06",
    holiday: "D-Day",
  },
  {
    date: "2025-06-07",
    holiday: "Eid al-Adha",
  },
  {
    date: "2025-06-07",
    holiday: "World Food Safety Day",
  },
  {
    date: "2025-06-07",
    holiday: "Belmont Stakes",
  },
  {
    date: "2025-06-08",
    holiday: "Pentecost",
  },
  {
    date: "2025-06-08",
    holiday: "World Oceans Day",
  },
  {
    date: "2025-06-08",
    holiday: "Native American Day",
    note: "Arizona",
  },
  {
    date: "2025-06-09",
    holiday: "Whit Monday",
  },
  {
    date: "2025-06-11",
    holiday: "Kamehameha Day",
    note: "Hawaii",
  },
  {
    date: "2025-06-12",
    holiday: "World Day Against Child Labour",
  },
  {
    date: "2025-06-12",
    holiday: "Loving Day",
  },
  {
    date: "2025-06-13",
    holiday: "International Albinism Awareness Day",
  },
  {
    date: "2025-06-13",
    holiday: "Friday the 13th",
  },
  {
    date: "2025-06-14",
    holiday: "World Blood Donor Day",
  },
  {
    date: "2025-06-14",
    holiday: "Army Birthday",
  },
  {
    date: "2025-06-14",
    holiday: "Flag Day",
  },
  {
    date: "2025-06-15",
    holiday: "Trinity Sunday",
  },
  {
    date: "2025-06-15",
    holiday: "World Elder Abuse Awareness Day",
  },
  {
    date: "2025-06-15",
    holiday: "Father's Day",
    note: "Arizona",
  },
  {
    date: "2025-06-15",
    holiday: "Father's Day",
  },
  {
    date: "2025-06-16",
    holiday: "International Day of Family Remittances",
  },
  {
    date: "2025-06-16",
    holiday: "'Juneteenth Freedom Day' day off",
    note: "Utah",
  },
  {
    date: "2025-06-17",
    holiday: "World Day to Combat Desertification",
  },
  {
    date: "2025-06-17",
    holiday: "Bunker Hill Day",
    note: "Massachusetts",
  },
  {
    date: "2025-06-18",
    holiday: "Sustainable Gastronomy Day",
  },
  {
    date: "2025-06-19",
    holiday: "Corpus Christi",
  },
  {
    date: "2025-06-19",
    holiday:
      "International Day for the Elimination of Sexual Violence in Conflict",
  },
  {
    date: "2025-06-19",
    holiday: "Juneteenth",
  },
  {
    date: "2025-06-19",
    holiday: "Juneteenth National Freedom Day",
    note: "Iowa",
  },
  {
    date: "2025-06-19",
    holiday: "Juneteenth Day",
    note: "Kansas",
  },
  {
    date: "2025-06-19",
    holiday: "Juneteenth",
    note: "Alabama",
  },
  {
    date: "2025-06-19",
    holiday: "Juneteenth Day",
    note: "AZ, FL, HI, WI",
  },
  {
    date: "2025-06-19",
    holiday: "Juneteenth Day",
    note: "Georgia",
  },
  {
    date: "2025-06-19",
    holiday: "Juneteenth National Freedom Day",
    note: "Idaho",
  },
  {
    date: "2025-06-19",
    holiday: "Juneteenth",
    note: "Colorado",
  },
  {
    date: "2025-06-19",
    holiday: "Juneteenth Independence Day",
    note: "Connecticut",
  },
  {
    date: "2025-06-19",
    holiday: "Juneteenth National Freedom Day",
    note: "Delaware",
  },
  {
    date: "2025-06-19",
    holiday: "Juneteenth National Freedom Day",
    note: "Illinois",
  },
  {
    date: "2025-06-19",
    holiday: "Juneteenth",
    note: "South Dakota",
  },
  {
    date: "2025-06-19",
    holiday: "National Juneteenth Freedom Day",
    note: "Kentucky",
  },
  {
    date: "2025-06-19",
    holiday: "Juneteenth",
    note: "Maine",
  },
  {
    date: "2025-06-19",
    holiday: "Juneteenth National Independence Day",
    note: "District of Columbia, Maryland",
  },
  {
    date: "2025-06-19",
    holiday: "Juneteenth Independence Day",
    note: "Massachusetts",
  },
  {
    date: "2025-06-19",
    holiday: "Juneteenth",
    note: "Minnesota",
  },
  {
    date: "2025-06-19",
    holiday: "Juneteenth Freedom Day",
    note: "Mississippi",
  },
  {
    date: "2025-06-19",
    holiday: "Juneteenth",
    note: "Missouri",
  },
  {
    date: "2025-06-19",
    holiday: "Juneteenth",
    note: "Nebraska",
  },
  {
    date: "2025-06-19",
    holiday: "Juneteenth Day",
    note: "Nevada",
  },
  {
    date: "2025-06-19",
    holiday: "Juneteenth",
    note: "New Hampshire",
  },
  {
    date: "2025-06-19",
    holiday: "Juneteenth",
    note: "NY, VA, WA",
  },
  {
    date: "2025-06-19",
    holiday: "Juneteenth Freedom Day",
    note: "New Mexico",
  },
  {
    date: "2025-06-19",
    holiday: "Juneteenth",
    note: "North Carolina",
  },
  {
    date: "2025-06-19",
    holiday: "Juneteenth",
    note: "North Dakota",
  },
  {
    date: "2025-06-19",
    holiday: "Juneteenth",
    note: "Ohio",
  },
  {
    date: "2025-06-19",
    holiday: "Juneteenth",
    note: "Oregon",
  },
  {
    date: "2025-06-19",
    holiday: "Juneteenth National Freedom Day",
    note: "Pennsylvania",
  },
  {
    date: "2025-06-19",
    holiday: "Juneteenth National Freedom Day",
    note: "Rhode Island",
  },
  {
    date: "2025-06-19",
    holiday: "Juneteenth Celebration of Freedom Day",
    note: "South Carolina",
  },
  {
    date: "2025-06-19",
    holiday: "Juneteenth",
    note: "Tennessee",
  },
  {
    date: "2025-06-19",
    holiday: "Juneteenth Freedom Day",
    note: "Utah",
  },
  {
    date: "2025-06-19",
    holiday: "Juneteenth",
    note: "West Virginia",
  },
  {
    date: "2025-06-19",
    holiday: "Emancipation Day",
    note: "Texas",
  },
  {
    date: "2025-06-20",
    holiday: "World Refugee Day",
  },
  {
    date: "2025-06-20",
    holiday: "Juneteenth Day",
    note: "New Jersey",
  },
  {
    date: "2025-06-20",
    holiday: "West Virginia Day",
    note: "West Virginia",
  },
  {
    date: "2025-06-20",
    holiday: "American Eagle Day",
  },
  {
    date: "2025-06-20",
    holiday: "June Solstice",
  },
  {
    date: "2025-06-21",
    holiday: "International Day of Yoga",
  },
  {
    date: "2025-06-21",
    holiday: "International Day of the Celebration of the Solstice",
  },
  {
    date: "2025-06-21",
    holiday: "Juneteenth",
    note: "Wyoming",
  },
  {
    date: "2025-06-21",
    holiday: "Juneteenth Day",
    note: "Alaska, Arkansas",
  },
  {
    date: "2025-06-21",
    holiday: "Juneteenth National Freedom Day",
    note: "California",
  },
  {
    date: "2025-06-21",
    holiday: "Juneteenth",
    note: "Louisiana",
  },
  {
    date: "2025-06-21",
    holiday: "Juneteenth National Freedom Day",
    note: "Michigan",
  },
  {
    date: "2025-06-21",
    holiday: "Juneteenth National Freedom Day",
    note: "Montana, Oklahoma",
  },
  {
    date: "2025-06-21",
    holiday: "Juneteenth National Freedom Day",
    note: "Vermont",
  },
  {
    date: "2025-06-23",
    holiday: "Public Service Day",
  },
  {
    date: "2025-06-23",
    holiday: "International Widows' Day",
  },
  {
    date: "2025-06-25",
    holiday: "Day of the Seafarer",
  },
  {
    date: "2025-06-26",
    holiday: "World Day against Drug Abuse and Trafficking",
  },
  {
    date: "2025-06-26",
    holiday: "World Day to Support Torture Victims",
  },
  {
    date: "2025-06-27",
    holiday: "Muharram",
  },
  {
    date: "2025-06-27",
    holiday: "Micro-, Small and Medium-sized Enterprises Day",
  },
  {
    date: "2025-06-28",
    holiday: "Carolina Day",
    note: "South Carolina",
  },
  {
    date: "2025-06-29",
    holiday: "International Day of the Tropics",
  },
  {
    date: "2025-06-30",
    holiday: "International Asteroid Day",
  },
  {
    date: "2025-06-30",
    holiday: "International Day of Parliamentarism",
  },
  {
    date: "2025-07-04",
    holiday: "Independence Day",
    note: "All",
  },
  {
    date: "2025-07-04",
    holiday: "Independence Day",
    note: "Many regions",
  },
  {
    date: "2025-07-05",
    holiday: "International Day of Cooperatives",
  },
  {
    date: "2025-07-06",
    holiday: "Ashura",
  },
  {
    date: "2025-07-11",
    holiday: "World Population Day",
  },
  {
    date: "2025-07-13",
    holiday: "Nathan Bedford Forrest Day",
    note: "Tennessee",
  },
  {
    date: "2025-07-14",
    holiday: "Bastille Day",
  },
  {
    date: "2025-07-15",
    holiday: "World Youth Skills Day",
  },
  {
    date: "2025-07-16",
    holiday: "Rural Transit Day",
  },
  {
    date: "2025-07-18",
    holiday: "Nelson Mandela Day",
  },
  {
    date: "2025-07-20",
    holiday: "World Chess Day",
  },
  {
    date: "2025-07-24",
    holiday: "Pioneer Day",
    note: "Utah",
  },
  {
    date: "2025-07-25",
    holiday: "World Drowning Prevention Day",
  },
  {
    date: "2025-07-27",
    holiday: "Parents' Day",
    note: "All",
  },
  {
    date: "2025-07-27",
    holiday: "Parents' Day",
    note: "West Virginia",
  },
  {
    date: "2025-07-27",
    holiday: "National Korean War Veterans Armistice Day",
  },
  {
    date: "2025-07-28",
    holiday: "World Hepatitis Day",
  },
  {
    date: "2025-07-30",
    holiday: "World Friendship Day",
  },
  {
    date: "2025-07-30",
    holiday: "World Day Against Trafficking in Persons",
  },
  {
    date: "2025-08-01",
    holiday: "Colorado Day",
    note: "Colorado",
  },
  {
    date: "2025-08-03",
    holiday: "Tisha B'Av",
  },
  {
    date: "2025-08-03",
    holiday: "American Family Day",
    note: "Arizona",
  },
  {
    date: "2025-08-04",
    holiday: "Coast Guard Birthday",
  },
  {
    date: "2025-08-04",
    holiday: "Barack Obama Day",
    note: "Illinois",
  },
  {
    date: "2025-08-07",
    holiday: "Purple Heart Day",
    note: "West Virginia, Wyoming",
  },
  {
    date: "2025-08-07",
    holiday: "Purple Heart Day",
  },
  {
    date: "2025-08-08",
    holiday: "Raksha Bandhan",
  },
  {
    date: "2025-08-09",
    holiday: "World Indigenous Peoples' Day",
  },
  {
    date: "2025-08-11",
    holiday: "Victory Day",
    note: "Rhode Island",
  },
  {
    date: "2025-08-12",
    holiday: "International Youth Day",
  },
  {
    date: "2025-08-15",
    holiday: "Assumption of Mary",
  },
  {
    date: "2025-08-15",
    holiday: "Statehood Day",
    note: "Hawaii",
  },
  {
    date: "2025-08-15",
    holiday: "'Bennington Battle Day' observed",
    note: "Vermont",
  },
  {
    date: "2025-08-16",
    holiday: "Janmashtami",
  },
  {
    date: "2025-08-16",
    holiday: "Bennington Battle Day",
    note: "Vermont",
  },
  {
    date: "2025-08-17",
    holiday: "National Navajo Code Talkers Day",
    note: "Arizona",
  },
  {
    date: "2025-08-17",
    holiday: "National Senior Citizens Day",
  },
  {
    date: "2025-08-19",
    holiday: "World Humanitarian Day",
  },
  {
    date: "2025-08-19",
    holiday: "National Aviation Day",
  },
  {
    date: "2025-08-21",
    holiday:
      "International Day of Remembrance of and Tribute to the Victims of Terrorism",
  },
  {
    date: "2025-08-22",
    holiday:
      "International Day Commemorating the Victims of Acts of Violence Based on Religion or Belief",
  },
  {
    date: "2025-08-23",
    holiday: "World Day for Slave Trade Abolition",
  },
  {
    date: "2025-08-26",
    holiday: "Ganesh Chaturthi",
  },
  {
    date: "2025-08-26",
    holiday: "Susan B. Anthony Day",
    note: "Massachusetts",
  },
  {
    date: "2025-08-26",
    holiday: "Women's Equality Day",
  },
  {
    date: "2025-08-27",
    holiday: "Lyndon Baines Johnson Day",
    note: "Texas",
  },
  {
    date: "2025-08-29",
    holiday: "International Day against Nuclear Tests",
  },
  {
    date: "2025-08-30",
    holiday: "World Day of Victims of Enforced Disappearance",
  },
  {
    date: "2025-08-31",
    holiday: "International Day for People of African Descent",
  },
  {
    date: "2025-08-31",
    holiday: "International Overdose Awareness Day",
  },
  {
    date: "2025-09-01",
    holiday: "Labor Day",
    note: "All",
  },
  {
    date: "2025-09-01",
    holiday: "Labor Day",
  },
  {
    date: "2025-09-04",
    holiday: "World Sexual Health Day",
  },
  {
    date: "2025-09-05",
    holiday: "The Prophet's Birthday",
  },
  {
    date: "2025-09-05",
    holiday: "International Day of Charity",
  },
  {
    date: "2025-09-06",
    holiday: "Carl Garner Federal Lands Cleanup Day",
  },
  {
    date: "2025-09-06",
    holiday: "Native American Day",
    note: "Delaware",
  },
  {
    date: "2025-09-07",
    holiday: "International Day of Clean Air for Blue Skies",
  },
  {
    date: "2025-09-07",
    holiday: "Still's Disease Awareness Day",
  },
  {
    date: "2025-09-07",
    holiday: "National Grandparents Day",
  },
  {
    date: "2025-09-08",
    holiday: "International Literacy Day",
  },
  {
    date: "2025-09-09",
    holiday: "International Day to Protect Education from Attack",
  },
  {
    date: "2025-09-09",
    holiday: "California Admission Day",
    note: "California",
  },
  {
    date: "2025-09-10",
    holiday: "World Suicide Prevention Day",
  },
  {
    date: "2025-09-11",
    holiday: "First Responders Day",
    note: "North Carolina",
  },
  {
    date: "2025-09-11",
    holiday: "Patriot Day",
  },
  {
    date: "2025-09-11",
    holiday: "Patriot Day",
    note: "Alaska",
  },
  {
    date: "2025-09-12",
    holiday: "International South-South Cooperation Day",
  },
  {
    date: "2025-09-13",
    holiday: "International Programmers' Day",
  },
  {
    date: "2025-09-14",
    holiday: "Constitution Commemoration Day",
    note: "Arizona",
  },
  {
    date: "2025-09-15",
    holiday: "International Day of Democracy",
  },
  {
    date: "2025-09-15",
    holiday: "First Day of National Hispanic Heritage Month",
  },
  {
    date: "2025-09-16",
    holiday: "World Ozone Layer Day",
  },
  {
    date: "2025-09-17",
    holiday: "World Patient Safety Day",
  },
  {
    date: "2025-09-17",
    holiday: "Constitution Day and Citizenship Day",
  },
  {
    date: "2025-09-18",
    holiday: "International Equal Pay Day",
  },
  {
    date: "2025-09-18",
    holiday: "Air Force Birthday",
  },
  {
    date: "2025-09-19",
    holiday: "National POW/MIA Recognition Day",
  },
  {
    date: "2025-09-21",
    holiday: "International Day of Peace",
  },
  {
    date: "2025-09-22",
    holiday: "Navratri",
  },
  {
    date: "2025-09-22",
    holiday: "American Indian Day",
    note: "Tennessee",
  },
  {
    date: "2025-09-22",
    holiday: "Emancipation Day",
    note: "Ohio",
  },
  {
    date: "2025-09-22",
    holiday: "September Equinox",
  },
  {
    date: "2025-09-23",
    holiday: "Rosh Hashana",
  },
  {
    date: "2025-09-23",
    holiday: "International Day of Sign Languages",
  },
  {
    date: "2025-09-23",
    holiday: "International Celebrate Bisexuality Day",
  },
  {
    date: "2025-09-23",
    holiday: "Rosh Hashana",
    note: "Texas",
  },
  {
    date: "2025-09-25",
    holiday: "World Maritime Day",
  },
  {
    date: "2025-09-26",
    holiday: "World Day to Eliminate Nuclear Weapons",
  },
  {
    date: "2025-09-26",
    holiday: "Native American Day",
    note: "California, Nevada",
  },
  {
    date: "2025-09-26",
    holiday: "American Indian Heritage Day",
    note: "Montana, Texas",
  },
  {
    date: "2025-09-26",
    holiday: "Michigan Indian Day",
    note: "Michigan",
  },
  {
    date: "2025-09-27",
    holiday: "World Tourism Day",
  },
  {
    date: "2025-09-27",
    holiday: "Public Lands Day",
    note: "Wyoming",
  },
  {
    date: "2025-09-27",
    holiday: "National Public Lands Day",
  },
  {
    date: "2025-09-28",
    holiday: "International Day for Universal Access to Information",
  },
  {
    date: "2025-09-28",
    holiday: "World Rabies Day",
  },
  {
    date: "2025-09-28",
    holiday: "Gold Star Mother's Day",
  },
  {
    date: "2025-09-29",
    holiday: "International Day of Awareness of Food Loss and Waste",
  },
  {
    date: "2025-09-29",
    holiday: "World Heart Day",
  },
  {
    date: "2025-09-30",
    holiday: "International Translation Day",
  },
  {
    date: "2025-10-01",
    holiday: "International Day of Older Persons",
  },
  {
    date: "2025-10-01",
    holiday: "World Vegetarian Day",
  },
  {
    date: "2025-10-02",
    holiday: "Dussehra",
  },
  {
    date: "2025-10-02",
    holiday: "Yom Kippur",
  },
  {
    date: "2025-10-02",
    holiday: "International Day of Non-Violence",
  },
  {
    date: "2025-10-02",
    holiday: "Yom Kippur",
    note: "Texas",
  },
  {
    date: "2025-10-04",
    holiday: "Feast of St Francis of Assisi",
  },
  {
    date: "2025-10-05",
    holiday: "World Teachers' Day",
  },
  {
    date: "2025-10-06",
    holiday: "World Habitat Day",
  },
  {
    date: "2025-10-06",
    holiday: "World Cerebral Palsy Day",
  },
  {
    date: "2025-10-06",
    holiday: "Frances Xavier Cabrini Day",
    note: "Colorado",
  },
  {
    date: "2025-10-06",
    holiday: "German American Day",
  },
  {
    date: "2025-10-06",
    holiday: "Child Health Day",
  },
  {
    date: "2025-10-07",
    holiday: "First Day of Sukkot",
  },
  {
    date: "2025-10-08",
    holiday: "World Day for Natural Disaster Reduction",
  },
  {
    date: "2025-10-09",
    holiday: "World Post Day",
  },
  {
    date: "2025-10-09",
    holiday: "World Sight Day",
  },
  {
    date: "2025-10-09",
    holiday: "Leif Erikson Day",
    note: "Colorado",
  },
  {
    date: "2025-10-09",
    holiday: "Leif Erikson Day",
  },
  {
    date: "2025-10-10",
    holiday: "World Mental Health Day",
  },
  {
    date: "2025-10-11",
    holiday: "World Migratory Bird Day",
  },
  {
    date: "2025-10-11",
    holiday: "International Day of the Girl Child",
  },
  {
    date: "2025-10-11",
    holiday: "Robert E. Lee's Birthday",
    note: "Arkansas",
  },
  {
    date: "2025-10-11",
    holiday: "Casimir Pulaski Day",
    note: "Michigan, Rhode Island",
  },
  {
    date: "2025-10-11",
    holiday: "Anniversary of Death of General Pulaski",
    note: "Massachusetts",
  },
  {
    date: "2025-10-12",
    holiday: "Chicago Marathon",
  },
  {
    date: "2025-10-13",
    holiday: "Last Day of Sukkot",
  },
  {
    date: "2025-10-13",
    holiday: "Navy Birthday",
  },
  {
    date: "2025-10-13",
    holiday: "Columbus Day",
    note: "Many regions",
  },
  {
    date: "2025-10-13",
    holiday: "Columbus Day",
  },
  {
    date: "2025-10-13",
    holiday: "Fraternal Day",
    note: "Alabama",
  },
  {
    date: "2025-10-13",
    holiday: "Yorktown Victory Day",
    note: "Virginia",
  },
  {
    date: "2025-10-13",
    holiday: "Discoverers' Day",
    note: "Hawaii",
  },
  {
    date: "2025-10-13",
    holiday: "Native American Day",
    note: "South Dakota",
  },
  {
    date: "2025-10-13",
    holiday: "Native American Day",
    note: "Oklahoma",
  },
  {
    date: "2025-10-13",
    holiday: "Indigenous People's Day",
    note: "Most regions",
  },
  {
    date: "2025-10-13",
    holiday: "Indigenous People's Day",
    note: "Michigan, Minnesota",
  },
  {
    date: "2025-10-13",
    holiday: "Indigenous People's Day",
    note: "DC, ME, NE, NM",
  },
  {
    date: "2025-10-13",
    holiday: "American Indian Heritage Day",
    note: "Alabama",
  },
  {
    date: "2025-10-14",
    holiday: "Shmini Atzeret",
  },
  {
    date: "2025-10-15",
    holiday: "Simchat Torah",
  },
  {
    date: "2025-10-15",
    holiday: "International Day of Rural Women",
  },
  {
    date: "2025-10-15",
    holiday: "White Cane Safety Day",
  },
  {
    date: "2025-10-16",
    holiday: "World Food Day",
  },
  {
    date: "2025-10-16",
    holiday: "Boss's Day",
  },
  {
    date: "2025-10-17",
    holiday: "World Day for Poverty Eradication",
  },
  {
    date: "2025-10-17",
    holiday: "'Alaska Day' observed",
    note: "Alaska",
  },
  {
    date: "2025-10-18",
    holiday: "Alaska Day",
    note: "Alaska",
  },
  {
    date: "2025-10-18",
    holiday: "Sweetest Day",
    note: "Many regions",
  },
  {
    date: "2025-10-20",
    holiday: "Diwali/Deepavali",
  },
  {
    date: "2025-10-20",
    holiday: "World Statistics Day",
  },
  {
    date: "2025-10-24",
    holiday: "United Nations Day",
  },
  {
    date: "2025-10-24",
    holiday: "World Development Information Day",
  },
  {
    date: "2025-10-27",
    holiday: "World Day for Audiovisual Heritage",
  },
  {
    date: "2025-10-29",
    holiday: "World Stroke Day",
  },
  {
    date: "2025-10-31",
    holiday: "World Cities Day",
  },
  {
    date: "2025-10-31",
    holiday: "Halloween",
  },
  {
    date: "2025-10-31",
    holiday: "Nevada Day",
    note: "Nevada",
  },
  {
    date: "2025-11-01",
    holiday: "All Saints' Day",
  },
  {
    date: "2025-11-01",
    holiday: "World Vegan Day",
  },
  {
    date: "2025-11-01",
    holiday: "First Day of Native American Heritage Month",
  },
  {
    date: "2025-11-02",
    holiday: "All Souls' Day",
  },
  {
    date: "2025-11-02",
    holiday: "International Day to End Impunity",
  },
  {
    date: "2025-11-02",
    holiday: "New York City Marathon",
  },
  {
    date: "2025-11-02",
    holiday: "Daylight Saving Time ends",
  },
  {
    date: "2025-11-04",
    holiday: "Election Day",
  },
  {
    date: "2025-11-04",
    holiday: "Election Day",
    note: "New Jersey, Virginia",
  },
  {
    date: "2025-11-05",
    holiday: "World Tsunami Awareness Day",
  },
  {
    date: "2025-11-06",
    holiday: "World Day to Protect the Environment in War",
  },
  {
    date: "2025-11-10",
    holiday: "World Science Day",
  },
  {
    date: "2025-11-10",
    holiday: "Marine Corps Birthday",
  },
  {
    date: "2025-11-10",
    holiday: "Barack Obama Day",
    note: "Alabama",
  },
  {
    date: "2025-11-11",
    holiday: "Singles' Day",
  },
  {
    date: "2025-11-11",
    holiday: "Veterans Day",
    note: "All except MA, RI, TX, WY",
  },
  {
    date: "2025-11-11",
    holiday: "Veterans' Day/Armistice Day",
    note: "MS, RI, TX",
  },
  {
    date: "2025-11-12",
    holiday: "World Pneumonia Day",
  },
  {
    date: "2025-11-14",
    holiday: "World Diabetes Day",
  },
  {
    date: "2025-11-16",
    holiday: "International Day for Tolerance",
  },
  {
    date: "2025-11-16",
    holiday: "World Day for Road Traffic Victims",
  },
  {
    date: "2025-11-17",
    holiday: "World Prematurity Day",
  },
  {
    date: "2025-11-19",
    holiday: "World Toilet Day",
  },
  {
    date: "2025-11-19",
    holiday: "International Men's Day",
  },
  {
    date: "2025-11-19",
    holiday: "George Rogers Clark Day",
    note: "Ohio",
  },
  {
    date: "2025-11-20",
    holiday: "Universal Children's Day",
  },
  {
    date: "2025-11-20",
    holiday: "Africa Industrialization Day",
  },
  {
    date: "2025-11-20",
    holiday: "World Philosophy Day",
  },
  {
    date: "2025-11-20",
    holiday: "Transgender Day of Remembrance",
  },
  {
    date: "2025-11-21",
    holiday: "World Television Day",
  },
  {
    date: "2025-11-21",
    holiday: "Fake Friday",
  },
  {
    date: "2025-11-25",
    holiday: "World Day to Eliminate Violence on Women",
  },
  {
    date: "2025-11-27",
    holiday: "Thanksgiving Day",
    note: "All",
  },
  {
    date: "2025-11-27",
    holiday: "Thanksgiving Day",
  },
  {
    date: "2025-11-28",
    holiday: "State Holiday",
    note: "Georgia",
  },
  {
    date: "2025-11-28",
    holiday: "Presidents' Day",
    note: "Observed (New Mexico)",
  },
  {
    date: "2025-11-28",
    holiday: "Lincoln's Birthday/Lincoln's Day",
    note: "Indiana",
  },
  {
    date: "2025-11-28",
    holiday: "Day After Thanksgiving",
    note: "Many regions",
  },
  {
    date: "2025-11-28",
    holiday: "Family Day",
    note: "Nevada",
  },
  {
    date: "2025-11-28",
    holiday: "Acadian Day",
    note: "Louisiana",
  },
  {
    date: "2025-11-28",
    holiday: "Black Friday",
  },
  {
    date: "2025-11-28",
    holiday: "American Indian Heritage Day",
    note: "Maryland",
  },
  {
    date: "2025-11-28",
    holiday: "Native American Heritage Day",
  },
  {
    date: "2025-11-28",
    holiday: "Native American Heritage Day",
    note: "Washington",
  },
  {
    date: "2025-11-29",
    holiday: "World Solidarity Day with Palestinian People",
  },
  {
    date: "2025-11-29",
    holiday: "Nellie Tayloe Ross's Birthday",
    note: "Wyoming",
  },
  {
    date: "2025-11-30",
    holiday: "First Sunday of Advent",
  },
  {
    date: "2025-11-30",
    holiday: "Day to Remember Chemical Warfare Victims",
  },
  {
    date: "2025-12-01",
    holiday: "World AIDS Day",
  },
  {
    date: "2025-12-01",
    holiday: "Cyber Monday",
  },
  {
    date: "2025-12-01",
    holiday: "Rosa Parks Day",
    note: "Alabama, Ohio",
  },
  {
    date: "2025-12-02",
    holiday: "World Day for Slavery Abolition",
  },
  {
    date: "2025-12-02",
    holiday: "Giving Tuesday",
  },
  {
    date: "2025-12-02",
    holiday: "Giving Tuesday",
  },
  {
    date: "2025-12-03",
    holiday: "World Day for Persons with Disabilities",
  },
  {
    date: "2025-12-04",
    holiday: "International Day of Banks",
  },
  {
    date: "2025-12-05",
    holiday: "International Volunteer Day",
  },
  {
    date: "2025-12-05",
    holiday: "World Soil Day",
  },
  {
    date: "2025-12-06",
    holiday: "St Nicholas Day",
  },
  {
    date: "2025-12-07",
    holiday: "International Civil Aviation Day",
  },
  {
    date: "2025-12-07",
    holiday: "Pearl Harbor Remembrance Day",
    note: "Alaska, Wyoming",
  },
  {
    date: "2025-12-07",
    holiday: "Pearl Harbor Remembrance Day",
  },
  {
    date: "2025-12-07",
    holiday: "Delaware Day",
    note: "Delaware",
  },
  {
    date: "2025-12-08",
    holiday: "Feast of the Immaculate Conception",
  },
  {
    date: "2025-12-08",
    holiday: "Green Monday",
  },
  {
    date: "2025-12-09",
    holiday: "International Anti-Corruption Day",
  },
  {
    date: "2025-12-09",
    holiday: "World Genocide Commemoration Day",
  },
  {
    date: "2025-12-10",
    holiday: "Human Rights Day",
  },
  {
    date: "2025-12-10",
    holiday: "Wyoming Day",
    note: "Wyoming",
  },
  {
    date: "2025-12-11",
    holiday: "International Mountain Day",
  },
  {
    date: "2025-12-12",
    holiday: "International Day of Neutrality",
  },
  {
    date: "2025-12-12",
    holiday: "International Universal Health Coverage Day",
  },
  {
    date: "2025-12-12",
    holiday: "Feast of Our Lady of Guadalupe",
  },
  {
    date: "2025-12-13",
    holiday: "National Guard Birthday",
  },
  {
    date: "2025-12-15",
    holiday: "Chanukah/Hanukkah",
    note: "first day",
  },
  {
    date: "2025-12-15",
    holiday: "Bill of Rights Day",
  },
  {
    date: "2025-12-17",
    holiday: "Pan American Aviation Day",
  },
  {
    date: "2025-12-17",
    holiday: "Wright Brothers Day",
  },
  {
    date: "2025-12-18",
    holiday: "International Migrants Day",
  },
  {
    date: "2025-12-18",
    holiday: "Arabic Language Day",
  },
  {
    date: "2025-12-20",
    holiday: "International Human Solidarity Day",
  },
  {
    date: "2025-12-20",
    holiday: "Super Saturday",
  },
  {
    date: "2025-12-21",
    holiday: "December Solstice",
  },
  {
    date: "2025-12-22",
    holiday: "Last Day of Chanukah",
  },
  {
    date: "2025-12-24",
    holiday: "Christmas Eve",
    note: "Many regions",
  },
  {
    date: "2025-12-24",
    holiday: "Christmas Eve",
  },
  {
    date: "2025-12-25",
    holiday: "Christmas Day",
    note: "All",
  },
  {
    date: "2025-12-25",
    holiday: "Christmas Day",
  },
  {
    date: "2025-12-26",
    holiday: "Kwanzaa",
    note: "first day",
  },
  {
    date: "2025-12-26",
    holiday: "Day After Christmas Day",
    note: "NC, SC, TX",
  },
  {
    date: "2025-12-27",
    holiday: "International Day of Epidemic Preparedness",
  },
  {
    date: "2025-12-30",
    holiday: "Asarah B'Tevet",
  },
  {
    date: "2025-12-31",
    holiday: "New Year's Eve",
    note: "Michigan, Wisconsin",
  },
  {
    date: "2025-12-31",
    holiday: "New Year's Eve",
  },
];

export default holidays;
