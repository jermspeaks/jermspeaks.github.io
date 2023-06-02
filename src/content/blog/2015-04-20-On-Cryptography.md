---
category: letters
title: On Cryptography
date: 2015-04-20
description: ""
pubDate: "2015-04-20"
heroImage: ""
postType: "newsletter"
tags: [season_1, letters]

---



I’ve been fascinated by cryptography ever since I was a kid. I remember briefly when my parents got a free subscription to the SF Chronicle and skipping straight to the comics and puzzles. One puzzle in particular, the cryptogram puzzles, got me to take my pen out and try to decode the message. It's a simple monoalphabetic cipher where one letter maps to another letter, but the letter can never map to itself.

The simplest monoalphabetic cipher is called a Caesar Cipher, where you simply shift the alphabet by a certain amount. If you and the key party you are trying to encrypt the message to knows the shift amount, you can easily decode the message. So if we shifted the alphabet by 10 letters, letting “K” represent “A", we could decode the word “JUMP” as “TEWZ”. The limitation of the Caesar shift is that there are only 26 configurations, so one could easily go through each letter until they figure out what the encoded message says.

Message Alphabet:     ABCDEFGHIJKLMNOPQRSTUVWXYZ  
Encoded Alphabet:     KLMNOPQRSTUVWXYZABCDEFGHIJ

A slightly strong encryption is one where each letter maps to another letter in a random order. For example, if you had the word "JEAR BEAR", it could be substituted as "FIPH DIPH” given the following key map.

Key Map:

F -> J  
I -> E  
P -> A  
H -> R  
D -> B  

Both parties would have to agree to a certain key map. The biggest flaw of this monoalphabetic cipher is the frequency to which we use the letters. For example, the letter “E” is the most common letter found in writing versus the letter “Q”. The Arabs back in the 9th century were the first to figure this out and developed this practice we know now as frequency analysis. For the Chronicle’s puzzles, you could tell there were going to to be certain repeated words, like single letter words like “a” and “I” are bound to be in the puzzle, so you can fill those out first. Also, “the” and “and” are two most frequently used three-letter words, so you can start filling those out too, and figure out the message by trial and error. Of course, you could just send the text in one long string, like this, “Afellowofficerlosthislifeinthelineofduty”.

Frequency analysis allows us to break down how often each letter is used and map it to a known frequency index, like looking at all english words and breaking down how often each letter is used, and figure out with high accuracy which letters map to which encrypted letter. Frequency analysis gets stronger the longer the message is. If it helps, you can think of the ratios for frequency analysis with Scrabble letter points. The lower the score, the higher the frequency.

In looking for a stronger encryption, polyalphabetic ciphers were created to make sure letters would be encoded with different letters each time. One form, called the Vigenère cipher, utilizes different monoalphabetic ciphers to encode a message. Each letter would map to a different shifted alphabet based on a key, and the key itself would map to different shifted alphabets. Let’s give an example. If we used the word “KING” as a key, and we wanted to decode the message, “A little boy and his fox,” we would first go to the letter “A” and map it to where “A” is in the shifted alphabet where “K”, from the key “KING”, is the first letter of the alphabet. In this case, it is easy. “A” maps to “K”.

Message Alphabet:     ABCDEFGHIJKLMNOPQRSTUVWXYZ  
Encoded Alphabet:     KLMNOPQRSTUVWXYZABCDEFGHIJ

The next letter from the text, “L”, would map to the shifted alphabet where “I” is the first letter, where “I” is the next letter in the key, “KING". In this case, we would encode “L” with “S”.

Message Alphabet:     ABCDEFGHIJKLMNOPQRSTUVWXYZ  
Encoded Alphabet:     IJKLMNOPQRSTUVWXYZABCDEFGH

We continue to encode the next letter with the shifted alphabet starting with “N”, and then the next letter after that with the shifted alphabet starting with “G”, and then we repeat the key and start again with the shifted alphabet starting with “K” for the next letter of the text, and repeat for the entire sequence until the entire message is encoded. In its entirety, the message reads “KTVZDTRHYGNTNPVYPWK”. You will notice that the fourth and fifth letter from the text are the same, “TT”, but in the encoded text, they are different letters, “ZD”. Now each letter does not necessarily map to each letter. For hundreds of years, it appeared that this encryption was impossible to break and was known as “Le Chiffre Indèchiffrable”, French for the indecipherable cipher.

In the mid-1800's, Charles Babbage was the first person to figure out how to decipher the Vigenère cipher decryption technique without prior knowledge of the key. There had been others who deciphered messages before, but Babbage’s technique ensured repeatability. Babbage never went public with this discovery, and for quite some time, the discovery went to a French codebreaker Friedrich Kasiski, who published a paper on breaking the cipher. What they found was a flaw in the cipher. The flaw in this case is the repeatability of the key. If the shared key is short enough, like “KING”, and if the text is long enough, you’ll start to see repeated patterns. For example, the word “and” could appear in 4 different ways using “KING” as a key. You could look for those exact phrases to piece together where you see repeated instances of the word. By process of elimination, you could look through the text and start to piece together what the key might be. Like in the cryptogram puzzles, you start figuring out what the message of the text. With these and possibly other letters decoded, you can work backwards and figure out what the shifted alphabet was that was used, grab the first letter in that alphabet, and determine what the key could be.

This was a huge blow to people creating encryptions. Suddenly, Le Chiffre Indèchiffrable became vulnerable. Cryptographers up to the early 1920’s were creating encryptions in the variation of the Vigenère cipher. In WWI, the British intercepted German messages and decrypted them with relative “ease”. This was a heavy advantage for the British and Allied forces, and was a major factor in helping them win the war. Come WWII, the Germans had a much more powerful encryption machine that helped power an effort to decrypt its messages.

I watched “The Imitation Game” a few weeks ago, and was fascinated to known how they would depict the Enigma machine, the German encryption machine. The Enigma machine is a mechanized way of encoding and decoding messages utilizing polyalphabetic ciphers. I won’t go over the intricacy of the machine as you could read many articles about it on Wikipedia, watch the film, or read “The Code Book,” where I gathered most of the information about mono- and polyalphabetic ciphers.
The British set up grounds at Bletchley Park dedicated to decoding German messages during WWII. I want to shift focus of this essay to explore the differences between the movie and reality.

First, I really wanted to know what Alan Turing’s role was in creating “Christopher”. In the film, “Christopher” was the codename for the machine Turing built in order to decode Enigma's messages. But I couldn’t find out if Turing ever called it “Christopher. In reality, the machines were called bombes, machines that would loop through every combination that would short circuit if the right combination was found. Understanding from some decoded messages that there were common words in almost every message, like “weather” in the first message at 6 in the morning, or “hail hitler” at the end of the message, cryptographers would try to find a chain of encrypted letters that would loop back to itself. The German word for “weather”, “witter”, would be mapped to the first 6 letters of the message. With those letters, and perhaps other common German words known to exist in the text, the cryptographers would try to find specific patterns, or instructions, to give the bombe. There was a great amount of human error that could have happened before telling the bombe what to look for in order to short circuit the machine. Multiple bombes were used in order to test all of their theories. 19 were used in its first year of development.

The bombe itself was a Polish creation when Poland was trying to decipher the Enigma machine during the 1930’s. There’s an entire neglected story there that is understandable the film glossed over. The Polish, paranoid of the growing power of Germany, obtained one of these Enigma machines. It was later smuggled to Bletchley Park, mentioned briefly in the movie’s beginning when Commander Denniston shows Turing the Enigma machine for the first time. Also untold is the story of the Polish mathematician Marian Rejewski and his decade of work trying to find weaknesses within Enigma. The Polish, knowing that their research might help the Allies in breaking Enigma, gave the intelligence to the British. Turing built on top of Rejewski’s work when he started building the bombes. The film poorly looks at the past achievements and puts Turing on a pedestal of being the radical of making a machine that could decode the key. In the film, almost everyone he’s working with doesn’t take his idea serious enough and Turing goes out of his way to convince Churchill to put him in charge. It is true the British funded around £100,000 to help build the bombes, but the drama surrounding the shutdown of these machines were not really mentioned in any literature I could find.

The Germans upgraded the number of combinations possible for their Enigma machine later in the war. More bombes were created in order to cut down the time to find the combinations. Plus, Enigma was not the only machine used to encrypt messages. For example, between Hitler and his main generals, they used an even larger encoding device with much more complexity. The film failed to mention Colossus, the machine that tried to decrypt this machine, that built off of the mechanisms in Turing’s bombes. Some proclaim Colossus was the first programmable computer even though it had to be dismantled after the war.

The film disturbed me in how easily it looked for Turing’s machine to decode the key. Knowing what I know now of what Turing’s machines actually did, the whole plot after of trying to determine what was statistically significant in delivering information after it was obtained did not seem to solely rest upon the cryptographers, in my opinion. It was the film’s opportunity to utilize a Machiavellian perspective of warfare, of which we saw very little of.

All that I’ve said though doesn’t mean I didn’t like the film. I actually thought it was an enjoyable movie with questionable drama, like the marriage subplot between Turing and Kiera Knightley’s character. I really liked how the film portrayed Turing’s eventual downfall after the war and the injustice brought to him because he was gay. But at the same time, I write this because I have a love for cryptography, and I needed to scratch this itchy spot of curiosity.
