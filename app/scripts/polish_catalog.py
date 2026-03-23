from __future__ import annotations

import json
import re
import sys
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from app.scripts.curated_late_pages import LATE_CURATED_PAGES
JSON_PATH = ROOT / "app" / "data" / "sonnies.json"
JS_PATH = ROOT / "app" / "data" / "sonnies.js"
ASSET_DIR = ROOT / "app" / "assets" / "pages"

CROP_W = 180
CROP_H = 300

CURATED_PAGES = {
    10: {
        "series": "Animal Series Ver. 1",
        "items": [
            ("Rabbit", 330, 152),
            ("Elephant", 470, 152),
            ("Cockerel", 675, 152),
            ("Dalmatian", 820, 152),
            ("Frog", 985, 152),
            ("Koala", 1140, 152),
            ("Panda", 90, 543),
            ("Sloth", 245, 543),
            ("Tiger", 405, 543),
            ("White Bear", 555, 543),
            ("Monkey", 705, 543),
            ("Owl", 865, 543),
            ("Chipmunk", 1025, 543),
            ("Robby Angel", 1185, 543),
        ],
    },
    11: {
        "series": "Animal Series Ver. 2",
        "items": [
            ("Mouse", 290, 142),
            ("Lesser Panda", 455, 142),
            ("Chameleon", 650, 142),
            ("Uribou", 810, 142),
            ("Skunk", 975, 142),
            ("Sheep", 1135, 142),
            ("Hedgehog", 90, 541),
            ("Fawn", 250, 541),
            ("Duck", 405, 541),
            ("Cow", 560, 541),
            ("Reindeer", 710, 541),
            ("Pig", 865, 541),
            ("Kappa", 1030, 541),
            ("Robby Angel", 1185, 541),
        ],
    },
    12: {
        "series": "Animal Series Ver. 3",
        "items": [
            ("Parrot", 330, 161),
            ("Rhinoceros", 470, 161),
            ("Chihuahua", 645, 161),
            ("Crocodile", 805, 161),
            ("French Bulldog", 965, 161),
            ("Giraffe", 1130, 161),
            ("Snake", 90, 564),
            ("Toy Poodle", 250, 564),
            ("Zebra", 405, 564),
            ("American Shorthair", 565, 564),
            ("Lop Ear Rabbit", 720, 564),
            ("Macaw", 870, 564),
            ("Unicorn", 1030, 564),
            ("Robby Angel", 1185, 564),
        ],
    },
    13: {
        "series": "Animal Series Ver. 4",
        "items": [
            ("Hippopotamus", 330, 162),
            ("Horse", 475, 162),
            ("Anteater", 645, 162),
            ("Buffalo", 805, 162),
            ("Calico Cat", 970, 162),
            ("Cheetah", 1135, 162),
            ("Lion", 50, 562),
            ("Peacock", 215, 562),
            ("Shiba Inu", 380, 562),
            ("Alpaca", 545, 562),
            ("Goat", 710, 562),
            ("Gorilla", 875, 562),
            ("Dragon", 1040, 562),
            ("Robby Angel", 1185, 562),
        ],
    },
    14: {
        "series": "Marine Series",
        "items": [
            ("Shark", 335, 161),
            ("Jellyfish", 470, 161),
            ("Clownfish", 640, 161),
            ("Shell", 805, 161),
            ("Penguin", 970, 161),
            ("Manta", 1135, 161),
            ("Dolphin", 85, 562),
            ("Seal", 245, 562),
            ("Seahorse", 405, 562),
            ("Whale", 560, 562),
            ("Blowfish", 720, 562),
            ("Starfish", 875, 562),
            ("Turtle", 1030, 562),
            ("Robby Angel", 1185, 562),
        ],
    },
    15: {
        "series": "Flower Series",
        "items": [
            ("Rose", 330, 155),
            ("Cherry Blossom", 470, 155),
            ("Lily Bell", 640, 155),
            ("Hydrangea", 805, 155),
            ("Pansy", 970, 155),
            ("Carnation", 1135, 155),
            ("Poppy", 80, 555),
            ("Sunflower", 245, 555),
            ("Cactus", 410, 555),
            ("Morning Glory", 560, 555),
            ("Acorn", 715, 555),
            ("Tulip", 875, 555),
            ("Bee", 1035, 555),
            ("Robby Angel", 1185, 555),
        ],
    },
    16: {
        "series": "Vegetable Series",
        "items": [
            ("Carrot", 330, 153),
            ("Tomato", 470, 153),
            ("Green Pepper", 635, 153),
            ("Eggplant", 800, 153),
            ("Bok Choy", 970, 153),
            ("Corn", 1135, 153),
            ("Garlic", 85, 554),
            ("Zucchini", 245, 554),
            ("Onion", 410, 554),
            ("Radish", 560, 554),
            ("Cauliflower", 715, 554),
            ("Cabbage", 875, 554),
            ("Shiitake", 1035, 554),
            ("Robby Angel", 1185, 554),
        ],
    },
    17: {
        "series": "Sweets Series",
        "items": [
            ("Cream Puff", 330, 150),
            ("Cupcake", 470, 150),
            ("Pancake", 640, 150),
            ("Popcorn", 805, 150),
            ("Pudding", 970, 150),
            ("Candy", 1135, 150),
            ("Fruit Tart", 80, 548),
            ("Ice Cream", 245, 548),
            ("Jelly Beans", 410, 548),
            ("Konpeito", 560, 548),
            ("Cookie", 715, 548),
            ("Strawberry Shortcake", 875, 548),
            ("Patissier", 1035, 548),
            ("Robby Angel", 1185, 548),
        ],
    },
    18: {
        "items": [
            ("Rabbit", "Unrefined Animal Series Ver. 1", 120, 120),
            ("Elephant", "Unrefined Animal Series Ver. 1", 265, 120),
            ("Panda", "Unrefined Animal Series Ver. 1", 410, 120),
            ("Cheetah", "Unrefined Animal Series Ver. 1", 555, 120),
            ("Tiger", "Unrefined Animal Series Ver. 1", 40, 360),
            ("Lion", "Unrefined Animal Series Ver. 1", 185, 360),
            ("Cockerel", "Unrefined Animal Series Ver. 1", 330, 360),
            ("Dalmatian", "Unrefined Animal Series Ver. 1", 475, 360),
            ("Frog", "Unrefined Animal Series Ver. 1", 600, 360),
            ("Koala", "Unrefined Animal Series Ver. 1", 40, 620),
            ("Monkey", "Unrefined Animal Series Ver. 1", 185, 620),
            ("Crocodile", "Unrefined Animal Series Ver. 1", 330, 620),
            ("Chipmunk", "Unrefined Animal Series Ver. 1", 475, 620),
            ("Robby Angel", "Unrefined Animal Series Ver. 1", 595, 620),
            ("Mouse", "Unrefined Animal Series Ver. 2", 735, 120),
            ("Lesser Panda", "Unrefined Animal Series Ver. 2", 880, 120),
            ("Giraffe", "Unrefined Animal Series Ver. 2", 1020, 120),
            ("Fawn", "Unrefined Animal Series Ver. 2", 1160, 120),
            ("Parakeet", "Unrefined Animal Series Ver. 2", 700, 360),
            ("Cow", "Unrefined Animal Series Ver. 2", 840, 360),
            ("White Bear", "Unrefined Animal Series Ver. 2", 980, 360),
            ("Uribou", "Unrefined Animal Series Ver. 2", 1115, 360),
            ("Rhinoceros", "Unrefined Animal Series Ver. 2", 1230, 360),
            ("Sheep", "Unrefined Animal Series Ver. 2", 700, 620),
            ("Reindeer", "Unrefined Animal Series Ver. 2", 840, 620),
            ("Pig", "Unrefined Animal Series Ver. 2", 980, 620),
            ("Kappa", "Unrefined Animal Series Ver. 2", 1115, 620),
            ("Robby Angel", "Unrefined Animal Series Ver. 2", 1230, 620),
        ],
    },
    19: {
        "items": [
            ("Parrot", "Unrefined Animal Series Ver. 3", 125, 120),
            ("Gorilla", "Unrefined Animal Series Ver. 3", 270, 120),
            ("Alpaca", "Unrefined Animal Series Ver. 3", 415, 120),
            ("Buffalo", "Unrefined Animal Series Ver. 3", 560, 120),
            ("Zebra", "Unrefined Animal Series Ver. 3", 45, 360),
            ("American Shorthair", "Unrefined Animal Series Ver. 3", 190, 360),
            ("Hippopotamus", "Unrefined Animal Series Ver. 3", 335, 360),
            ("Chameleon", "Unrefined Animal Series Ver. 3", 475, 360),
            ("French Bulldog", "Unrefined Animal Series Ver. 3", 595, 360),
            ("Duckbill", "Unrefined Animal Series Ver. 3", 45, 620),
            ("Lop Ear Rabbit", "Unrefined Animal Series Ver. 3", 190, 620),
            ("Owl", "Unrefined Animal Series Ver. 3", 335, 620),
            ("Unicorn", "Unrefined Animal Series Ver. 3", 475, 620),
            ("Robby Angel", "Unrefined Animal Series Ver. 3", 595, 620),
            ("Snake", "Unrefined Animal Series Ver. 4", 735, 120),
            ("Horse", "Unrefined Animal Series Ver. 4", 875, 120),
            ("Chihuahua", "Unrefined Animal Series Ver. 4", 1015, 120),
            ("Peacock", "Unrefined Animal Series Ver. 4", 1155, 120),
            ("Shiba Inu", "Unrefined Animal Series Ver. 4", 700, 360),
            ("Hamadryas Baboon", "Unrefined Animal Series Ver. 4", 840, 360),
            ("Mongoose", "Unrefined Animal Series Ver. 4", 980, 360),
            ("Skunk", "Unrefined Animal Series Ver. 4", 1115, 360),
            ("Calico Cat", "Unrefined Animal Series Ver. 4", 1230, 360),
            ("Japanese Crane", "Unrefined Animal Series Ver. 4", 700, 620),
            ("Goat", "Unrefined Animal Series Ver. 4", 840, 620),
            ("Duck", "Unrefined Animal Series Ver. 4", 980, 620),
            ("Dragon", "Unrefined Animal Series Ver. 4", 1115, 620),
            ("Robby Angel", "Unrefined Animal Series Ver. 4", 1230, 620),
        ],
    },
    20: {
        "items": [
            ("Shark", "Unrefined Marine Series", 110, 130),
            ("Jellyfish", "Unrefined Marine Series", 255, 130),
            ("Dolphin", "Unrefined Marine Series", 400, 130),
            ("Seal", "Unrefined Marine Series", 545, 130),
            ("Seahorse", "Unrefined Marine Series", 45, 380),
            ("Whale", "Unrefined Marine Series", 190, 380),
            ("Clownfish", "Unrefined Marine Series", 335, 380),
            ("Shell", "Unrefined Marine Series", 480, 380),
            ("Penguin", "Unrefined Marine Series", 600, 380),
            ("Ray", "Unrefined Marine Series", 45, 640),
            ("Blowfish", "Unrefined Marine Series", 190, 640),
            ("Starfish", "Unrefined Marine Series", 335, 640),
            ("Turtle", "Unrefined Marine Series", 480, 640),
            ("Robby Angel", "Unrefined Marine Series", 600, 640),
            ("Mangosteen", "Unrefined Fruit Series", 730, 130),
            ("Peach", "Unrefined Fruit Series", 870, 130),
            ("Persimmon", "Unrefined Fruit Series", 1015, 130),
            ("Pear", "Unrefined Fruit Series", 1160, 130),
            ("Strawberry", "Unrefined Fruit Series", 700, 380),
            ("Grape", "Unrefined Fruit Series", 840, 380),
            ("Watermelon", "Unrefined Fruit Series", 980, 380),
            ("Melon", "Unrefined Fruit Series", 1115, 380),
            ("Lemon", "Unrefined Fruit Series", 1230, 380),
            ("Chestnut", "Unrefined Fruit Series", 700, 640),
            ("Pineapple", "Unrefined Fruit Series", 840, 640),
            ("Apple", "Unrefined Fruit Series", 980, 640),
            ("Seed Leaf", "Unrefined Fruit Series", 1115, 640),
            ("Robby Angel", "Unrefined Fruit Series", 1230, 640),
        ],
    },
    21: {
        "items": [
            ("Rose", "Unrefined Flower Series", 110, 130),
            ("Cherry Blossoms", "Unrefined Flower Series", 255, 130),
            ("Poppy", "Unrefined Flower Series", 400, 130),
            ("Dandelion", "Unrefined Flower Series", 545, 130),
            ("Cactus", "Unrefined Flower Series", 45, 380),
            ("Morning Glory", "Unrefined Flower Series", 190, 380),
            ("Lily Bell", "Unrefined Flower Series", 335, 380),
            ("Hydrangea", "Unrefined Flower Series", 480, 380),
            ("Pansy", "Unrefined Flower Series", 600, 380),
            ("Carnation", "Unrefined Flower Series", 45, 640),
            ("Acorn", "Unrefined Flower Series", 190, 640),
            ("Tulip", "Unrefined Flower Series", 335, 640),
            ("Bee", "Unrefined Flower Series", 480, 640),
            ("Robby Angel", "Unrefined Flower Series", 600, 640),
            ("Carrot", "Unrefined Vegetable Series", 730, 130),
            ("Tomato", "Unrefined Vegetable Series", 870, 130),
            ("Bamboo Shoot", "Unrefined Vegetable Series", 1015, 130),
            ("Sweet Potato", "Unrefined Vegetable Series", 1160, 130),
            ("Onion", "Unrefined Vegetable Series", 700, 380),
            ("Radish", "Unrefined Vegetable Series", 840, 380),
            ("Green Pepper", "Unrefined Vegetable Series", 980, 380),
            ("Eggplant", "Unrefined Vegetable Series", 1115, 380),
            ("Japanese Ginger", "Unrefined Vegetable Series", 1230, 380),
            ("Corn", "Unrefined Vegetable Series", 700, 640),
            ("Japanese Radish", "Unrefined Vegetable Series", 840, 640),
            ("Cabbage", "Unrefined Vegetable Series", 980, 640),
            ("Shiitake", "Unrefined Vegetable Series", 1115, 640),
            ("Robby Angel", "Unrefined Vegetable Series", 1230, 640),
        ],
    },
    22: {
        "items": [
            ("Sunflower Lion Blue", "Flower Gift", 130, 145),
            ("Rose Lion Yellow", "Flower Gift", 485, 145),
            ("Round Balloon", "Birthday Gift -Bear-", 880, 145),
            ("Present Hug", "Birthday Gift -Bear-", 1115, 145),
            ("Sunflower Lion Mint Green", "Flower Gift", 20, 470),
            ("Daisy Lion Lime Green", "Flower Gift", 250, 470),
            ("Daisy Lion Orange", "Flower Gift", 470, 470),
            ("Heart Hug", "Birthday Gift -Bear-", 835, 470),
            ("Star Balloon", "Birthday Gift -Bear-", 1015, 470),
            ("Birthday Cake Hug", "Birthday Gift -Bear-", 1180, 470),
            ("Rose Lion Pink", "Flower Gift", 95, 720),
            ("Rainbow Sunflower Lion Robby Angel", "Flower Gift", 365, 720),
            ("Heart Balloon", "Birthday Gift -Bear-", 845, 720),
            ("Aurora Balloon Bear", "Birthday Gift -Bear-", 1015, 720),
            ("Aurora Robby Angel", "Birthday Gift -Bear-", 1185, 720),
        ],
    },
    23: {
        "items": [
            ("Blueberry Cake", "Birthday Gift", 110, 260),
            ("Lemon Cake", "Birthday Gift", 280, 260),
            ("Mint Cake", "Birthday Gift", 450, 260),
            ("Raspberry Cake", "Birthday Gift", 620, 260),
            ("Cloudy", "Sky Color Series", 760, 260),
            ("Rainbow", "Sky Color Series", 920, 260),
            ("Rainy", "Sky Color Series", 1080, 260),
            ("Thunder", "Sky Color Series", 1230, 260),
            ("Chocolate Cake", "Birthday Gift", 110, 620),
            ("Strawberry Shortcake", "Birthday Gift", 280, 620),
            ("Special Cake", "Birthday Gift", 450, 620),
            ("Snowy", "Sky Color Series", 760, 620),
            ("Sunny", "Sky Color Series", 920, 620),
            ("Aurora", "Sky Color Series", 1080, 620),
            ("Shooting Star Robby Angel", "Sky Color Series", 1230, 620),
        ],
    },
    24: {
        "items": [
            ("Crown Green", "Crown Series", 60, 170),
            ("Crown Pink", "Crown Series", 230, 170),
            ("Crown Red", "Crown Series", 400, 170),
            ("Groove on!", "T-Shirt Series", 855, 170),
            ("What's up", "T-Shirt Series", 1025, 170),
            ("Rejoice", "T-Shirt Series", 1195, 170),
            ("Crown Yellow", "Crown Series", 30, 475),
            ("Crown Orange", "Crown Series", 180, 475),
            ("Crown Silver", "Crown Series", 330, 475),
            ("Cross Crown Blue", "Crown Series", 480, 475),
            ("Cross Crown Orange", "Crown Series", 615, 475),
            ("Fun to be with", "T-Shirt Series", 760, 475),
            ("Hug me!", "T-Shirt Series", 920, 475),
            ("Sorry, Mom", "T-Shirt Series", 1080, 475),
            ("Yummy?", "T-Shirt Series", 1230, 475),
            ("Cross Crown Light Blue", "Crown Series", 25, 770),
            ("Cross Crown Pink", "Crown Series", 180, 770),
            ("Heart Crown Red", "Crown Series", 330, 770),
            ("Heart Crown Yellow", "Crown Series", 485, 770),
            ("Laurel Crown", "Crown Series", 620, 770),
            ("Thanks!", "T-Shirt Series", 760, 770),
            ("cha cha cha", "T-Shirt Series", 920, 770),
            ("SOS", "T-Shirt Series", 1080, 770),
            ("Cry for joy!", "T-Shirt Series", 1230, 770),
            ("Chu", "T-Shirt Series", 1370, 770),
        ],
    },
    25: {
        "series": "Hippers Looking Back Series",
        "items": [
            ("Monkey", 70, 360),
            ("Fawn", 185, 160),
            ("Mouse", 300, 430),
            ("Rabbit", 415, 250),
            ("Duck", 525, 430),
            ("Koala", 635, 430),
            ("Hamster", 760, 500),
            ("Crocodile", 880, 340),
            ("Sloth", 980, 500),
            ("Cat", 1080, 250),
            ("Chipmunk", 960, 180),
            ("French Bull Dog", 1135, 340),
            ("Elephant", 1210, 430),
        ],
    },
    26: {
        "series": "Hippers Dreaming Series",
        "items": [
            ("Rabbit", 45, 165),
            ("Elephant", 250, 165),
            ("Panda", 470, 165),
            ("Fawn", 715, 165),
            ("Lop Ear Rabbit", 950, 165),
            ("Lion", 45, 430),
            ("Pig", 300, 430),
            ("Duck", 715, 430),
            ("Mouse", 960, 430),
            ("Sheep", 45, 680),
            ("Koala", 300, 680),
            ("Giraffe", 700, 680),
            ("Unicorn", 960, 680),
        ],
    },
    27: {
        "series": "Hippers Harvest Series",
        "items": [
            ("Grape", 80, 170),
            ("Carrot", 300, 170),
            ("Pear", 515, 170),
            ("Tomato", 735, 170),
            ("Apple", 965, 170),
            ("Pineapple", 80, 430),
            ("Strawberry", 300, 430),
            ("Melon", 735, 430),
            ("Radish", 965, 430),
            ("Cherry", 80, 680),
            ("Mushroom", 300, 680),
            ("Eggplant", 735, 680),
            ("Seed Leaf", 965, 680),
        ],
    },
    28: {
        "series": "Hippers Animal Series",
        "items": [
            ("Rabbit", 45, 165),
            ("Elephant", 250, 165),
            ("Panda", 470, 165),
            ("Fawn", 735, 165),
            ("Lop Ear Rabbit", 965, 165),
            ("Lion", 45, 430),
            ("Pig", 300, 430),
            ("Duck", 735, 430),
            ("Mouse", 965, 430),
            ("Sheep", 45, 680),
            ("Koala", 300, 680),
            ("Giraffe", 735, 680),
            ("Unicorn", 965, 680),
        ],
    },
    29: {
        "series": "Christmas Dinner Series",
        "items": [
            ("Strawberry", 235, 600),
            ("Reindeer", 355, 600),
            ("Carrot", 475, 600),
            ("Lion", 595, 600),
            ("Owl", 760, 610),
            ("Dinner Robby Angel", 875, 610),
            ("Crocodile", 955, 610),
            ("Dinner Rabbit", 1085, 610),
        ],
    },
    30: {
        "items": [
            ("Rabbit", "Winter Wonderland Series", 60, 170),
            ("Dalmatian", "Winter Wonderland Series", 200, 170),
            ("Reindeer", "Winter Wonderland Series", 340, 170),
            ("Bear", "Winter Wonderland Series", 480, 170),
            ("Fawn", "Winter Wonderland Series", 605, 170),
            ("Koala", "Winter Wonderland Series", 730, 170),
            ("Snow Fairy Fox", "Winter Wonderland Series", 55, 520),
            ("Snow Fairy Lop Ear Rabbit", "Winter Wonderland Series", 190, 520),
            ("Snow Fairy Mouse", "Winter Wonderland Series", 330, 520),
            ("Snowman Robby Angel", "Winter Wonderland Series", 470, 520),
            ("Sonny Angel Wooden Christmas Tree", "Winter Wonderland Series", 595, 520),
            ("Sheep", "Christmas Series 2021 Dreaming Christmas", 770, 230),
            ("Tapir", "Christmas Series 2021 Dreaming Christmas", 900, 230),
            ("Monkey", "Christmas Series 2021 Dreaming Christmas", 1035, 230),
            ("Rabbit", "Christmas Series 2021 Dreaming Christmas", 1170, 230),
            ("Fawn", "Christmas Series 2021 Dreaming Christmas", 770, 520),
            ("Owl", "Christmas Series 2021 Dreaming Christmas", 900, 520),
            ("Santa's Helper Mouse", "Christmas Series 2021 Dreaming Christmas", 1035, 520),
            ("Santa's Helper Robby Angel", "Christmas Series 2021 Dreaming Christmas", 1170, 520),
        ],
    },
    31: {
        "items": [
            ("Stuffed Robby", "Christmas Series 2020 Presents from Sonny Angel", 35, 150),
            ("Wrapped Present", "Christmas Series 2020 Presents from Sonny Angel", 145, 150),
            ("Christmas Stocking", "Christmas Series 2020 Presents from Sonny Angel", 255, 150),
            ("Poinsettia", "Christmas Series 2020 Presents from Sonny Angel", 365, 150),
            ("Kittens", "Christmas Series 2020 Presents from Sonny Angel", 475, 150),
            ("Snow Globe", "Christmas Series 2020 Presents from Sonny Angel", 585, 150),
            ("Angel", "Christmas Series 2020 Presents from Sonny Angel", 695, 150),
            ("Angel Robby Angel", "Christmas Series 2020 Presents from Sonny Angel", 785, 150),
            ("Classic Santa", "Christmas Series 2018", 805, 150),
            ("Classic Reindeer", "Christmas Series 2018", 915, 150),
            ("Church Bell", "Christmas Series 2018", 1025, 150),
            ("Christmas Angel", "Christmas Series 2018", 1135, 150),
            ("Classic Santa", "Christmas Series 2018", 1240, 150),
            ("Classic Reindeer", "Christmas Series 2018", 1340, 150),
            ("Classic Robby Angel", "Christmas Series 2018", 1440, 150),
            ("Wool Reindeer", "Christmas Series 2019", 40, 520),
            ("Wool Penguin", "Christmas Series 2019", 165, 520),
            ("Wool Bear", "Christmas Series 2019", 295, 520),
            ("Wool Sheep", "Christmas Series 2019", 425, 520),
            ("Wool Snowman", "Christmas Series 2019", 555, 520),
            ("Wool Robby Angel", "Christmas Series 2019", 685, 520),
            ("Wood Doll Santa", "Christmas Series 2017", 815, 520),
            ("Reindeer Plushie", "Christmas Series 2017", 945, 520),
            ("Drum Boy", "Christmas Series 2017", 1075, 520),
            ("Rocking Horse", "Christmas Series 2017", 1205, 520),
            ("Wood Doll Santa", "Christmas Series 2017", 1335, 520),
            ("Reindeer Plushie", "Christmas Series 2017", 1465, 520),
            ("Pierrot Angel", "Christmas Series 2017", 1595, 520),
        ],
    },
    43: {
        "items": [
            ("Mummy", "Halloween Series 2012", 20, 165),
            ("Pumpkin", "Halloween Series 2012", 185, 165),
            ("Witch", "Halloween Series 2012", 360, 165),
            ("Vampire", "Halloween Series 2012", 535, 165),
            ("Pumpkin", "Halloween Series 2007", 35, 560),
            ("Ghost", "Halloween Series 2007", 190, 560),
            ("Pumpkin", "Halloween Series 2007", 360, 560),
            ("Ghost", "Halloween Series 2007", 530, 560),
            ("Love Pink Rabbit", "Rabbit Popularity Poll 2024", 1080, 420),
            ("Cherry Blossom Rabbit", "Rabbit Popularity Poll 2024", 1380, 420),
            ("Dreaming Rabbit", "Rabbit Popularity Poll 2024", 850, 560),
        ],
    },
    44: {
        "series": "Rabbit Popularity Poll 2024",
        "items": [
            ("Hippers Animal Rabbit", 35, 180),
            ("Mint Rabbit", 270, 165),
            ("Rabbit", 520, 165),
            ("Rabbit", 20, 500),
            ("Robby", 210, 570),
            ("Colorful Coke Rabbit", 430, 520),
            ("Rabbit", 640, 520),
            ("Love Red Rabbit", 820, 165),
            ("Kiss Mark Rabbit", 980, 165),
            ("Orange Rabbit", 1140, 165),
            ("Captain Bunny", 1305, 165),
            ("Robbit", 1455, 165),
            ("Photo Contest Figure Robby Winner", 820, 520),
            ("Hat Rabbit", 980, 520),
            ("Moon Rabbit", 1140, 520),
            ("Rabbit Strawberry Chocolate", 1305, 520),
            ("Rose Rabbit", 1455, 520),
        ],
    },
    56: {
        "series": "Cat Life Series",
        "items": [
            ("Red Tabby", 110, 235),
            ("Calico", 35, 520),
            ("Silver Tabby", 170, 520),
            ("Brown & Black", 285, 520),
            ("Tuxedo", 350, 450),
            ("Siamese", 415, 520),
            ("Blush Gray", 550, 520),
            ("Black", 715, 520),
            ("Happy Pink", 835, 235),
            ("Lucky Orange", 1035, 235),
            ("White", 820, 520),
            ("Lucky Purple", 940, 520),
            ("Lucky Pink", 1070, 520),
            ("Happy Pink Robby Angel", 1200, 520),
        ],
    },
    57: {
        "series": "Dog Time Series",
        "items": [
            ("Toy Poodle", 145, 220),
            ("Chihuahua", 35, 520),
            ("Beagle", 145, 520),
            ("Shiba Inu", 285, 520),
            ("French Bull Dog", 425, 520),
            ("Pomeranian", 565, 520),
            ("Dalmatian", 700, 520),
            ("Dachshund", 815, 220),
            ("Doberman", 1040, 220),
            ("Lucky Pomeranian Blue", 745, 520),
            ("Lucky Pomeranian Orange", 885, 520),
            ("Lucky Pomeranian Pink", 1015, 520),
            ("Pug", 1160, 520),
            ("Bull Terrier Robby Angel", 1290, 520),
        ],
    },
    60: {
        "items": [
            ("Folk", "Love the Music", 90, 220),
            ("Rock", "Love the Music", 305, 220),
            ("Jazz", "Love the Music", 515, 220),
            ("Bossa Nova", "Love the Music", 120, 520),
            ("Classical", "Love the Music", 405, 520),
            ("Jelly Puppy", "Pet Treats", 820, 215),
            ("Cookie Cat", "Pet Treats", 1110, 215),
            ("Cupcake", "Afternoon Tea Series", 775, 565),
            ("Cherry Pudding", "Afternoon Tea Series", 945, 565),
            ("Herbal Tea", "Afternoon Tea Series", 1110, 565),
            ("Happy Little Bear", "Afternoon Tea Series", 1275, 565),
        ],
    },
    64: {
        "items": [
            ("Fawn", "Animal Series Ver. 2 Special Color", 255, 165),
            ("Pig", "Animal Series Ver. 2 Special Color", 395, 165),
            ("Lesser Panda", "Animal Series Ver. 2 Special Color", 535, 165),
            ("Bear", "Animal Series Ver. 2 Special Color", 110, 430),
            ("Parakeet", "Animal Series Ver. 2 Special Color", 255, 430),
            ("Rhinoceros", "Animal Series Ver. 2 Special Color", 395, 430),
            ("Uribou", "Animal Series Ver. 2 Special Color", 535, 430),
            ("Giraffe", "Animal Series Ver. 2 Special Color", 670, 430),
            ("Sheep", "Animal Series Ver. 2 Special Color", 110, 690),
            ("Mouse", "Animal Series Ver. 2 Special Color", 255, 690),
            ("Reindeer", "Animal Series Ver. 2 Special Color", 395, 690),
            ("Cow", "Animal Series Ver. 2 Special Color", 535, 690),
            ("Kappa", "Animal Series Ver. 2 Special Color", 670, 690),
            ("French Bulldog", "Animal Series Ver. 3 Special Color", 820, 165),
            ("Duckbill", "Animal Series Ver. 3 Special Color", 955, 165),
            ("Lop Ear Rabbit", "Animal Series Ver. 3 Special Color", 1100, 165),
            ("Owl", "Animal Series Ver. 3 Special Color", 790, 430),
            ("Hippopotamus", "Animal Series Ver. 3 Special Color", 930, 430),
            ("Zebra", "Animal Series Ver. 3 Special Color", 1070, 430),
            ("Alpaca", "Animal Series Ver. 3 Special Color", 1205, 430),
            ("Buffalo", "Animal Series Ver. 3 Special Color", 1340, 430),
            ("American Shorthair", "Animal Series Ver. 3 Special Color", 790, 690),
            ("Gorilla", "Animal Series Ver. 3 Special Color", 930, 690),
            ("Chameleon", "Animal Series Ver. 3 Special Color", 1070, 690),
            ("Parrot", "Animal Series Ver. 3 Special Color", 1205, 690),
            ("Unicorn", "Animal Series Ver. 3 Special Color", 1340, 690),
        ],
    },
    75: {
        "items": [
            ("Pig White", "Prototypes", 20, 150),
            ("Pig Gold", "Prototypes", 155, 150),
            ("Monkey Glow", "Prototypes", 295, 150),
            ("Frog Glow", "Prototypes", 425, 150),
            ("Catfish", "Prototypes", 565, 150),
            ("Laurel Crown Silver", "Prototypes", 35, 450),
            ("Laurel Crown Gold", "Prototypes", 165, 450),
            ("Wink Left Eye", "Prototypes", 295, 450),
            ("Closed Eyes", "Prototypes", 425, 450),
            ("Wink Right Eye", "Prototypes", 555, 450),
            ("Have Hope", "Prototypes", 685, 450),
            ("Celebrate Meow", "Lucky Meow Meow Series", 885, 150),
            ("Happy Meow", "Lucky Meow Meow Series", 1040, 150),
            ("Surprise Meow", "Lucky Meow Meow Series", 1190, 150),
            ("Lucky Meow", "Lucky Meow Meow Series", 1340, 150),
            ("Red Pineapple", "Black Pineapple -Love You-", 1030, 455),
            ("Green Pineapple", "Black Pineapple -Love You-", 1190, 455),
            ("Golden Pineapple", "Black Pineapple -Love You-", 1345, 455),
            ("Banana Monkey Yellow", "It's BANANAS!", 1040, 705),
            ("Banana Monkey Green", "It's BANANAS!", 1190, 705),
            ("Banana Monkey Pink", "It's BANANAS!", 1345, 705),
        ],
    },
    76: {
        "items": [
            ("Rose Quartz", "Sonny Angel Store 100Pt Crown Figure", 300, 140),
            ("Blue Topaz", "Sonny Angel Store 100Pt Crown Figure", 490, 140),
            ("Garnet", "Sonny Angel Store 100Pt Crown Figure", 680, 140),
            ("Seoul Lucky Bag Pink", "Sonny Angel Terrace Seoul Limited", 980, 180),
            ("Seoul Lucky Bag Blue", "Sonny Angel Terrace Seoul Limited", 1135, 250),
            ("Mango Rabbit", "Sonny Angel Official Store Taiwan", 1465, 145),
            ("Rabbit", "Chinese Festival", 270, 440),
            ("Monkey", "Chinese Festival", 425, 440),
            ("Mouse", "Chinese Festival", 575, 440),
            ("Pig", "Chinese Festival", 730, 440),
            ("Dragon Pink", "Never Sold Limited Models", 1170, 455),
            ("Dragon Pink", "Never Sold Limited Models", 1335, 455),
            ("Ishigaki Pineapple", "Sonny Angel Terrace Ishigaki Limited", 295, 740),
            ("Shisa", "Sonny Angel Terrace Ishigaki", 605, 735),
            ("Shisa", "Sonny Angel Terrace Ishigaki", 750, 735),
            ("Gold Love Robby Angel", "Valentine Event Shenzhen Limited", 1070, 755),
            ("Red Rose Robby Angel", "Valentine Event Shenzhen Limited", 1190, 755),
            ("Pink Love Robby Angel", "Valentine Event Shenzhen Limited", 1310, 755),
            ("White Rose Robby Angel", "Valentine Event Shenzhen Limited", 1430, 755),
            ("Purple Love Robby Angel", "Valentine Event Shenzhen Limited", 1550, 755),
        ],
    },
    78: {
        "items": [
            ("Anniversary Decorations", "Anniversary Decorations", 245, 170),
            ("Summer Photo Contest Figure 2017", "Summer Photo Contest Figure 2017", 550, 170),
            ("Photo Contest Travel Figure 2016", "Photo Contest Travel Figure 2016", 230, 470),
            ("Photo Contest Travel Figure 2015", "Photo Contest Travel Figure 2015", 560, 470),
            ("Birthday Party Special Color 2015", "Birthday Party Special Color 2015", 305, 785),
            ("Birthday Party Special Color 2015", "Birthday Party Special Color 2015", 500, 785),
            ("Blue Rabbit", "Follow Your Heart", 1075, 180),
            ("Yellow Rabbit", "Follow Your Heart", 1245, 180),
            ("Robby Angel", "Follow Your Heart", 1415, 180),
            ("19th Anniversary", "19th Anniversary", 995, 610),
            ("18th Anniversary", "18th Anniversary", 1255, 610),
            ("17th Anniversary", "17th Anniversary", 1510, 610),
        ],
    },
    86: {
        "items": [
            ("Rabbit", "Workshop Event", 50, 295),
            ("Elephant", "Workshop Event", 220, 295),
            ("Shiba Inu", "Workshop Event", 390, 295),
            ("Monkey", "Workshop Event", 560, 295),
            ("Cockerel", "Workshop Event", 730, 295),
            ("Sheep", "Workshop Event", 80, 605),
            ("Birthday Cake", "Workshop Event", 250, 605),
            ("Uribou", "Workshop Event", 420, 605),
            ("Mouse", "Workshop Event", 590, 605),
            ("Collector's Trophy Rabbit Red", "Collector's Trophy", 1275, 280),
        ],
    },
    87: {
        "items": [
            ("Collector's Trophy Rabbit White", "Collector's Trophy", 75, 120),
            ("Collector's Trophy Rabbit Pink", "Collector's Trophy", 245, 120),
            ("Authorized Dealer's Trophy Rabbit Gold", "Collector's Trophy", 420, 120),
            ("Authorized Dealer's Trophy Rabbit Pink", "Collector's Trophy", 595, 120),
            ("Collector's Trophy Robby Angel Blue", "Collector's Trophy", 920, 125),
            ("Collector's Trophy Robby Angel Pink", "Collector's Trophy", 1090, 125),
            ("Collector's Trophy Robby Angel Violet", "Collector's Trophy", 1260, 125),
            ("Collector's Trophy Robby Angel Gold", "Collector's Trophy", 1430, 125),
            ("Collector's Trophy Rabbit Blue", "Collector's Trophy", 95, 520),
            ("Collector's Trophy Elephant Blue", "Collector's Trophy", 270, 520),
            ("Collector's Trophy 18th Anniversary", "Collector's Trophy", 490, 500),
            ("Collector's Trophy Lucky Cat L Size", "Collector's Trophy", 1175, 560),
            ("Collector's Trophy Lucky Cat S Size", "Collector's Trophy", 1455, 560),
        ],
    },
    89: {
        "items": [
            ("White Rabbit", "Cuddly Rabbit", 85, 180),
            ("Pink Rabbit", "Cuddly Rabbit", 275, 180),
            ("White Bear", "Cuddly Bear", 490, 180),
            ("Brown Bear", "Cuddly Bear", 685, 180),
            ("Rabbit", "Bobbing Head LOG-ON 20th Anniversary Limited", 1030, 180),
            ("Elephant", "Bobbing Head LOG-ON 20th Anniversary Limited", 1205, 180),
            ("Mouse", "Bobbing Head LOG-ON 20th Anniversary Limited", 1380, 180),
            ("Strawberry Robby Angel", "Sonny Angel Terrace Seoul Limited Stuffed", 120, 610),
            ("Morning Glow", "Summer Island Holiday", 530, 610),
            ("Sunset Glow", "Summer Island Holiday", 700, 610),
            ("Rabbit", "Bobbing Head Cloud Style", 1080, 620),
            ("Sheep", "Bobbing Head Cloud Style", 1260, 620),
            ("Cow", "Bobbing Head Cloud Style", 1440, 620),
        ],
    },
}

CURATED_PAGES.update(LATE_CURATED_PAGES)

SERIES_BY_PAGE = {
    10: "Animal Series Ver. 1",
    11: "Animal Series Ver. 2",
    12: "Animal Series Ver. 3",
    13: "Animal Series Ver. 4",
    14: "Marine Series",
    15: "Flower Series",
    16: "Vegetable Series",
    17: "Sweets Series",
    25: "Hippers Looking Back Series",
    26: "Hippers Dreaming Series",
    27: "Hippers Harvest Series",
    28: "Hippers Animal Series",
    29: "Christmas Dinner Series",
}

SERIES_SPLITS = {
    18: ("Unrefined Animal Series Ver. 1", "Unrefined Animal Series Ver. 2"),
    19: ("Unrefined Animal Series Ver. 3", "Unrefined Animal Series Ver. 4"),
    20: ("Unrefined Marine Series", "Unrefined Fruit Series"),
    21: ("Unrefined Flower Series", "Unrefined Vegetable Series"),
    22: ("Flower Gift", "Birthday Gift -Bear-"),
    23: ("Birthday Gift", "Sky Color Series"),
    24: ("Crown Series", "T-Shirt Series"),
    30: ("Winter Wonderland Series", "Christmas Series 2021 Dreaming Christmas"),
}

SERIES_QUADRANTS = {
    31: {
        "top_left": "Christmas Series 2020 Presents from Sonny Angel",
        "top_right": "Christmas Series 2018",
        "bottom_left": "Christmas Series 2019",
        "bottom_right": "Christmas Series 2017",
    }
}

NAME_FIXES = {
    "deimatian": "Dalmatian",
    "frag": "Frog",
    "white beat": "White Bear",
    "white gear": "White Bear",
    "white boar": "White Bear",
    "chihushua": "Chihuahua",
    "crocedilz": "Crocodile",
    "franch bulldeg": "French Bulldog",
    "perrat": "Parrot",
    "poacock": "Peacock",
    "gont": "Goat",
    "jelivfish": "Jellyfish",
    "sheil": "Shell",
    "be nguin": "Penguin",
    "whaie": "Whale",
    "biowfish": "Blowfish",
    "turtie": "Turtle",
    "lily beil": "Lily Bell",
    "moring giory": "Morning Glory",
    "livy bell": "Lily Bell",
    "hydrangen": "Hydrangea",
    "carret": "Carrot",
    "green papper": "Green Pepper",
    "sok chay": "Bok Choy",
    "zuechini": "Zucchini",
    "jupanese ginger": "Japanese Ginger",
    "calice cat": "Calico Cat",
    "shiba inu": "Shiba Inu",
    "shiba inu ": "Shiba Inu",
    "robhy angel": "Robby Angel",
    "robby ange": "Robby Angel",
    "robby angei": "Robby Angel",
    "rabby angel": "Robby Angel",
    "mint chocsiate ange": "Mint Chocolate Angel",
    "bitter strawborry": "Bitter Strawberry",
    "sweat kitty": "Sweet Kitty",
    "rose bouguet": "Rose Bouquet",
    "chacolate": "Chocolate",
    "welormeion ath": "Watermelon Hat",
    "panama het": "Panama Hat",
    "straw haz": "Straw Hat",
    "straw hai": "Straw Hat",
    "sicy blue": "Sky Blue",
    "seaonal events series": "Seasonal Events Series",
    "seasonai events series": "Seasonal Events Series",
    "sensonal events sertes": "Seasonal Events Series",
    "seasonal evants series": "Seasonal Events Series",
    "collaboration sevies": "Collaboration Series",
    "sonny angel seoul": "Sonny Angel Seoul",
}

BLOCKLIST = {
    "this",
    "the",
    "and",
    "series",
    "seasonal events series",
    "events series",
    "seasonal events",
    "valentine",
    "collaboration series",
    "sonny angel",
    "birthday",
    "guide page",
}

KEEP_EXACT = {
    "Robby Angel",
    "Snow Robby Angel",
    "Angel Robby",
    "Dinner Robby Angel",
    "Shooting Star Robby Angel",
    "Seed Leaf",
    "Mint Chocolate Angel",
}


def slugify(text: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")


def titlecase(text: str) -> str:
    return " ".join(word.capitalize() if word.islower() else word for word in text.split())


def clean_name(name: str) -> str | None:
    raw = " ".join(name.replace("\n", " ").split())
    key = raw.lower()
    if key in NAME_FIXES:
        return NAME_FIXES[key]
    if raw in KEEP_EXACT:
        return raw
    if len(raw) > 24:
        return None
    if any(ch.isdigit() for ch in raw):
        return None
    words = raw.split()
    if not words:
        return None
    lowered = [w.lower().strip(".,-") for w in words]
    if " ".join(lowered) in BLOCKLIST:
        return None
    if len(words) > 3 and raw not in KEEP_EXACT:
        return None
    if sum(w in BLOCKLIST for w in lowered) >= 1 and raw not in KEEP_EXACT:
        return None
    if all(word.islower() for word in words):
        return None
    if len(raw) <= 2:
        return None
    return titlecase(raw)


def assign_series(item: dict) -> str:
    page = item["page"]
    x = item["image"]["x"] + CROP_W / 2
    y = item["image"]["y"] + CROP_H / 2
    page_width = item["image"]["pageWidth"]
    page_height = item["image"]["pageHeight"]

    if page in SERIES_BY_PAGE:
        return SERIES_BY_PAGE[page]
    if page in SERIES_SPLITS:
        left, right = SERIES_SPLITS[page]
        return left if x < page_width / 2 else right
    if page in SERIES_QUADRANTS:
        quad = SERIES_QUADRANTS[page]
        top = y < page_height / 2
        left = x < page_width / 2
        if top and left:
            return quad["top_left"]
        if top and not left:
            return quad["top_right"]
        if not top and left:
            return quad["bottom_left"]
        return quad["bottom_right"]
    return item["series"]


def curated_entries(page: int) -> list[dict]:
    config = CURATED_PAGES[page]
    image_path = ASSET_DIR / f"page-{page:03d}.png"
    image = Image.open(image_path)
    entries = []
    for index, item in enumerate(config["items"], start=1):
        if len(item) == 3:
            name, x, y = item
            series = config["series"]
        else:
            name, series, x, y = item
        x = max(0, min(x, image.width - CROP_W))
        y = max(0, min(y, image.height - CROP_H))
        entries.append(
            {
                "id": f"page-{page}-{index:02d}-{slugify(name)}",
                "name": name,
                "series": series,
                "page": page,
                "image": {
                    "page": f"./assets/pages/page-{page:03d}.png",
                    "pageWidth": image.width,
                    "pageHeight": image.height,
                    "x": x,
                    "y": y,
                },
            }
        )
    return entries


def polish() -> list[dict]:
    items = json.loads(JSON_PATH.read_text())
    polished = []
    curated_pages = set(CURATED_PAGES)

    for item in items:
        if item["page"] in curated_pages:
            continue
        cleaned = clean_name(item["name"])
        if not cleaned:
            continue
        item["name"] = cleaned
        item["series"] = assign_series(item)
        polished.append(item)

    for page in curated_pages:
        polished.extend(curated_entries(page))

    polished.sort(key=lambda item: (item["page"], item["image"]["y"], item["image"]["x"], item["name"]))
    return polished


def main() -> None:
    polished = polish()
    JSON_PATH.write_text(json.dumps(polished, indent=2))
    JS_PATH.write_text(f"window.SONNIES_DATA = {json.dumps(polished)};\n")
    print(f"Polished catalog written with {len(polished)} entries")


if __name__ == "__main__":
    main()
