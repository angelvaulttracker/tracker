from __future__ import annotations

import sys
import urllib.request
from io import BytesIO
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "app" / "scripts"))

from export_official_web_sonnies import remove_background


ASSETS = [
    {
        "name": "Snow Fairy Fox",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2023/10/img_wonderland_10.png",
        "crop": (40, 30, 430, 500),
        "output": "sonny_png_library/limited/christmas-collections/winter-wonderland-series/07__snow-fairy-fox.png",
    },
    {
        "name": "Snow Fairy Lop Ear Rabbit",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2023/10/img_wonderland_11.png",
        "crop": (40, 30, 430, 500),
        "output": "sonny_png_library/limited/christmas-collections/winter-wonderland-series/08__snow-fairy-lop-ear-rabbit.png",
    },
    {
        "name": "Snow Fairy Mouse",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2023/10/img_wonderland_12.png",
        "crop": (40, 30, 430, 500),
        "output": "sonny_png_library/limited/christmas-collections/winter-wonderland-series/09__snow-fairy-mouse.png",
    },
    {
        "name": "Snowman Robby Angel",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2023/10/img_wonderland_13.png",
        "crop": (40, 30, 430, 500),
        "output": "sonny_png_library/limited/christmas-collections/winter-wonderland-series/10__snowman-robby-angel.png",
    },
    {
        "name": "Blue Panama Hat",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2018/10/news_sa_summer2016.png",
        "crop": (10, 108, 62, 295),
        "output": "sonny_png_library/limited/special-collections/summer-series-caribbean-sea-version-2016/01__blue-panama-hat.png",
    },
    {
        "name": "Blue Straw Hat",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2018/10/news_sa_summer2016.png",
        "crop": (55, 108, 113, 295),
        "output": "sonny_png_library/limited/special-collections/summer-series-caribbean-sea-version-2016/02__blue-straw-hat.png",
    },
    {
        "name": "Orange Panama Hat",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2018/10/news_sa_summer2016.png",
        "crop": (108, 104, 166, 296),
        "output": "sonny_png_library/limited/special-collections/summer-series-caribbean-sea-version-2016/03__orange-panama-hat.png",
    },
    {
        "name": "Pink Straw Hat",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2018/10/news_sa_summer2016.png",
        "crop": (161, 105, 214, 295),
        "output": "sonny_png_library/limited/special-collections/summer-series-caribbean-sea-version-2016/04__pink-straw-hat.png",
    },
    {
        "name": "Yellow Straw Hat",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2018/10/news_sa_summer2016.png",
        "crop": (214, 106, 268, 295),
        "output": "sonny_png_library/limited/special-collections/summer-series-caribbean-sea-version-2016/05__yellow-straw-hat.png",
    },
    {
        "name": "Caribbean Hat",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2018/10/news_sa_summer2016.png",
        "crop": (274, 54, 348, 292),
        "output": "sonny_png_library/limited/special-collections/summer-series-caribbean-sea-version-2016/06__caribbean-hat.png",
    },
    {
        "name": "Tiger-like Cap",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2020/10/img_chinoiserie_2020_02.png",
        "crop": (540, 10, 670, 300),
        "output": "sonny_png_library/collaboration/collaboration-collections/chinoiserie-series/03__tiger-like-cap.png",
    },
    {
        "name": "Chinese Panda",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2020/10/img_chinoiserie_2020_02.png",
        "crop": (640, 10, 785, 300),
        "output": "sonny_png_library/collaboration/collaboration-collections/chinoiserie-series/05__chinese-panda.png",
    },
    {
        "name": "Peking Opera Peacock",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2020/10/img_chinoiserie_2020_02.png",
        "crop": (748, 10, 905, 300),
        "output": "sonny_png_library/collaboration/collaboration-collections/chinoiserie-series/04__peking-opera-peacock.png",
    },
    {
        "name": "Paper Cutting Rabbit",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2020/10/img_chinoiserie_2020_02.png",
        "crop": (860, 10, 995, 300),
        "output": "sonny_png_library/collaboration/collaboration-collections/chinoiserie-series/06__paper-cutting-rabbit.png",
    },
    {
        "name": "Porcelain Monkey",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2020/10/img_chinoiserie_2020_02.png",
        "crop": (500, 210, 650, 500),
        "output": "sonny_png_library/collaboration/collaboration-collections/chinoiserie-series/01__porcelain-monkey.png",
    },
    {
        "name": "Kite Cockerel",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2020/10/img_chinoiserie_2020_02.png",
        "crop": (620, 210, 780, 500),
        "output": "sonny_png_library/collaboration/collaboration-collections/chinoiserie-series/02__kite-cockerel.png",
    },
    {
        "name": "Jeju Surfer",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2022/09/img_hellojeju_10.png",
        "crop": (0, 0, 1000, 1000),
        "output": "sonny_png_library/limited/special-collections/sonny-angel-hello-jeju-2022/07__jeju-surfer.png",
    },
    {
        "name": "Dol Hareubang Robby Angel",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2022/09/img_hellojeju_11.png",
        "crop": (0, 0, 1000, 1000),
        "output": "sonny_png_library/limited/special-collections/sonny-angel-hello-jeju-2022/08__dol-hareubang-robby-angel.png",
    },
    {
        "name": "Movie Night Sonny Angel",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2024/03/img_sweet_home_11.png",
        "crop": (0, 0, 1000, 1000),
        "output": "sonny_png_library/limited/special-collections/home-sweet-home-2024/07__movie-night-sonny-angel.png",
    },
    {
        "name": "Movie Night Robby Angel",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2024/03/img_sweet_home_12.png",
        "crop": (0, 0, 1000, 1000),
        "output": "sonny_png_library/limited/special-collections/home-sweet-home-2024/08__movie-night-robby-angel.png",
    },
    {
        "name": "Love Red Rabbit",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2024/01/img_gifts_of_love_10.png",
        "crop": (0, 110, 320, 500),
        "cleanup": "none",
        "output": "sonny_png_library/limited/valentines-collections/gifts-of-love-2024/07__love-red-rabbit.png",
    },
    {
        "name": "Love Pink Rabbit",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2024/01/img_gifts_of_love_10.png",
        "crop": (300, 60, 620, 500),
        "cleanup": "none",
        "output": "sonny_png_library/limited/valentines-collections/gifts-of-love-2024/08__love-pink-rabbit.png",
    },
    {
        "name": "Love Lop Ear Rabbit",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2024/01/img_gifts_of_love_10.png",
        "crop": (630, 70, 960, 500),
        "cleanup": "none",
        "output": "sonny_png_library/limited/valentines-collections/gifts-of-love-2024/09__love-lop-ear-rabbit.png",
    },
    {
        "name": "Chocolate Robby Angel",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2024/01/img_gifts_of_love_12.png",
        "crop": (0, 0, 1000, 1000),
        "output": "sonny_png_library/limited/valentines-collections/gifts-of-love-2024/10__chocolate-robby-angel.png",
    },
    {
        "name": "Lucky Orange",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2023/05/img_cat-life_15.png",
        "crop": (0, 0, 1000, 1000),
        "output": "sonny_png_library/limited/special-collections/cat-life-2023/10__lucky-orange.png",
    },
    {
        "name": "Lucky Pink",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2023/05/img_cat-life_16.png",
        "crop": (0, 0, 1000, 1000),
        "output": "sonny_png_library/limited/special-collections/cat-life-2023/11__lucky-pink.png",
    },
    {
        "name": "Lucky Purple",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2023/05/img_cat-life_17.png",
        "crop": (0, 0, 1000, 1000),
        "output": "sonny_png_library/limited/special-collections/cat-life-2023/12__lucky-purple.png",
    },
    {
        "name": "Happy Pink",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2023/05/img_cat-life_19.png",
        "crop": (0, 0, 1000, 1000),
        "output": "sonny_png_library/limited/special-collections/cat-life-2023/13__happy-pink.png",
    },
    {
        "name": "Happy Pink Robby Angel",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2023/05/img_cat-life_20.png",
        "crop": (0, 0, 1000, 1000),
        "output": "sonny_png_library/limited/special-collections/cat-life-2023/14__happy-pink-robby-angel.png",
    },
    {
        "name": "Pink Bear",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2022/10/img_christmas2022_11.png",
        "crop": (0, 0, 520, 1000),
        "output": "sonny_png_library/limited/christmas-collections/sonny-angel-christmas-ornament-2022/07__pink-bear.png",
    },
    {
        "name": "Blue Bear",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2022/10/img_christmas2022_11.png",
        "crop": (480, 0, 1000, 1000),
        "output": "sonny_png_library/limited/christmas-collections/sonny-angel-christmas-ornament-2022/08__blue-bear.png",
    },
    {
        "name": "Ornament Robby Angel",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2022/10/img_christmas2022_12.png",
        "crop": (0, 0, 1000, 1000),
        "output": "sonny_png_library/limited/christmas-collections/sonny-angel-christmas-ornament-2022/10__ornament-robby-angel.png",
    },
    {
        "name": "Unicorn",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2022/01/img_massage2022_main.png",
        "crop": (705, 240, 900, 620),
        "output": "sonny_png_library/limited/valentines-collections/message-of-love-2022/07__unicorn.png",
    },
    {
        "name": "Kiss me Robby Angel",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2022/01/img_massage2022_main.png",
        "crop": (870, 260, 1000, 620),
        "output": "sonny_png_library/limited/valentines-collections/message-of-love-2022/08__kiss-me-robby-angel.png",
    },
    {
        "name": "Witch",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2018/10/news_sa_halloween.png",
        "crop": (0, 100, 220, 350),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/halloween-series-2018/01__witch.png",
    },
    {
        "name": "Cat",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2018/10/news_sa_halloween.png",
        "crop": (180, 100, 420, 350),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/halloween-series-2018/02__cat.png",
    },
    {
        "name": "Pumpkin",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2018/10/news_sa_halloween.png",
        "crop": (360, 100, 610, 350),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/halloween-series-2018/03__pumpkin.png",
    },
    {
        "name": "Ghost",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2018/10/news_sa_halloween.png",
        "crop": (760, 110, 1000, 350),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/halloween-series-2018/04__ghost.png",
    },
    {
        "name": "Werewolf",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2018/10/news_halloween2015.png",
        "crop": (0, 120, 245, 780),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/halloween-series-2015/01__werewolf.png",
    },
    {
        "name": "Pumpkin Cat",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2018/10/news_halloween2015.png",
        "crop": (200, 120, 445, 780),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/halloween-series-2015/02__pumpkin-cat.png",
    },
    {
        "name": "Vampire",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2018/10/news_halloween2015.png",
        "crop": (410, 120, 700, 780),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/halloween-series-2015/03__vampire.png",
    },
    {
        "name": "Skeleton",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2018/10/news_halloween2015.png",
        "crop": (690, 120, 980, 780),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/halloween-series-2015/04__skeleton.png",
    },
    {
        "name": "Bat",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2018/10/news_halloween2016.png",
        "crop": (10, 110, 95, 330),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/halloween-series-2016/01__bat.png",
    },
    {
        "name": "Spider",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2018/10/news_halloween2016.png",
        "crop": (75, 110, 165, 330),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/halloween-series-2016/02__spider.png",
    },
    {
        "name": "Pumpkin",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2018/10/news_halloween2016.png",
        "crop": (150, 110, 245, 330),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/halloween-series-2016/03__pumpkin.png",
    },
    {
        "name": "Witch",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2018/10/news_halloween2016.png",
        "crop": (235, 110, 335, 330),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/halloween-series-2016/04__witch.png",
    },
    {
        "name": "Yellow T-shirt",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2018/10/news_summer2018.png",
        "crop": (0, 15, 58, 165),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/summer-series-2018/01__yellow-t-shirt.png",
    },
    {
        "name": "Green Pants",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2018/10/news_summer2018.png",
        "crop": (52, 15, 112, 165),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/summer-series-2018/02__green-pants.png",
    },
    {
        "name": "Sailor",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2018/10/news_summer2018.png",
        "crop": (107, 15, 168, 165),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/summer-series-2018/03__sailor.png",
    },
    {
        "name": "Gray Pants",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2018/10/news_summer2018.png",
        "crop": (162, 15, 222, 165),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/summer-series-2018/04__gray-pants.png",
    },
    {
        "name": "Pink T-shirt",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2018/10/news_summer2018.png",
        "crop": (217, 15, 278, 165),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/summer-series-2018/05__pink-t-shirt.png",
    },
    {
        "name": "Blue Pants",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2018/10/news_summer2018.png",
        "crop": (272, 15, 335, 165),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/summer-series-2018/06__blue-pants.png",
    },
    {
        "name": "Pink Pants",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2018/10/news_summer2018.png",
        "crop": (0, 145, 58, 305),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/summer-series-2018/07__pink-pants.png",
    },
    {
        "name": "Blue T-shirt",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2018/10/news_summer2018.png",
        "crop": (52, 145, 112, 305),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/summer-series-2018/08__blue-t-shirt.png",
    },
    {
        "name": "Purple Pants",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2018/10/news_summer2018.png",
        "crop": (107, 145, 168, 305),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/summer-series-2018/09__purple-pants.png",
    },
    {
        "name": "Green T-shirt",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2018/10/news_summer2018.png",
        "crop": (162, 145, 222, 305),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/summer-series-2018/10__green-t-shirt.png",
    },
    {
        "name": "Light Blue Pants",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2018/10/news_summer2018.png",
        "crop": (217, 145, 278, 305),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/summer-series-2018/11__light-blue-pants.png",
    },
    {
        "name": "Orange T-shirt",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2018/10/news_summer2018.png",
        "crop": (272, 145, 335, 305),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/summer-series-2018/12__orange-t-shirt.png",
    },
    {
        "name": "Red Swimwear",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2018/10/news_sa_summer_vacation.png",
        "crop": (5, 55, 58, 170),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/summer-vacation-series-2017/01__red-swimwear.png",
    },
    {
        "name": "Violet Swimwear",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2018/10/news_sa_summer_vacation.png",
        "crop": (55, 55, 108, 170),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/summer-vacation-series-2017/02__violet-swimwear.png",
    },
    {
        "name": "Blue Swimwear",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2018/10/news_sa_summer_vacation.png",
        "crop": (105, 55, 160, 170),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/summer-vacation-series-2017/03__blue-swimwear.png",
    },
    {
        "name": "Light Green Swimwear",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2018/10/news_sa_summer_vacation.png",
        "crop": (155, 55, 210, 170),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/summer-vacation-series-2017/04__light-green-swimwear.png",
    },
    {
        "name": "Yellow Swimwear",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2018/10/news_sa_summer_vacation.png",
        "crop": (205, 55, 262, 170),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/summer-vacation-series-2017/05__yellow-swimwear.png",
    },
    {
        "name": "Pink Swimwear",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2018/10/news_sa_summer_vacation.png",
        "crop": (255, 55, 315, 170),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/summer-vacation-series-2017/06__pink-swimwear.png",
    },
    {
        "name": "Rainbow T-shirt",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2018/10/news_sa_summer_vacation.png",
        "crop": (5, 155, 58, 292),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/summer-vacation-series-2017/07__rainbow-t-shirt.png",
    },
    {
        "name": "Blue Green T-shirt",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2018/10/news_sa_summer_vacation.png",
        "crop": (55, 155, 108, 292),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/summer-vacation-series-2017/08__blue-green-t-shirt.png",
    },
    {
        "name": "Pink T-shirt",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2018/10/news_sa_summer_vacation.png",
        "crop": (105, 155, 160, 292),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/summer-vacation-series-2017/09__pink-t-shirt.png",
    },
    {
        "name": "Orange T-shirt",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2018/10/news_sa_summer_vacation.png",
        "crop": (155, 155, 210, 292),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/summer-vacation-series-2017/10__orange-t-shirt.png",
    },
    {
        "name": "Light Yellow T-shirt",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2018/10/news_sa_summer_vacation.png",
        "crop": (205, 155, 262, 292),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/summer-vacation-series-2017/11__light-yellow-t-shirt.png",
    },
    {
        "name": "Blue T-shirt",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2018/10/news_sa_summer_vacation.png",
        "crop": (255, 155, 315, 292),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/summer-vacation-series-2017/12__blue-t-shirt.png",
    },
    {
        "name": "Mint Rabbit",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2023/12/img_candy-store_10.png",
        "crop": (0, 0, 1000, 1000),
        "output": "sonny_png_library/limited/sweets-collections/charm-candy-store-2023/06__mint-rabbit.png",
    },
    {
        "name": "Pierrot Angel",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2018/10/news_sa_christmas_2017.png",
        "crop": (8, 95, 88, 285),
        "cleanup": "lineup",
        "output": "sonny_png_library/limited/christmas-collections/christmas-series-2017/05__pierrot-angel.png",
    },
    {
        "name": "Rainbow Sunflower Lion Robby Angel",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2023/02/sa_flower_gift_11.png",
        "crop": (0, 0, 1000, 1000),
        "output": "sonny_png_library/limited/flower-collections/flower-gift-2023/07__rainbow-sunflower-lion-robby-angel.png",
    },
    {
        "name": "Friendship Work With Robby Angel",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2022/09/img_enjoy_the_moment_09.png",
        "crop": (0, 0, 1000, 1000),
        "output": "sonny_png_library/limited/special-collections/sonny-angel-enjoy-the-moment-2022/07__friendship-work-with-robby-angel.png",
    },
    {
        "name": "Friendship Work With Sonny Angel",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2022/09/img_enjoy_the_moment_10.png",
        "crop": (0, 0, 1000, 1000),
        "output": "sonny_png_library/limited/special-collections/sonny-angel-enjoy-the-moment-2022/08__friendship-work-with-sonny-angel.png",
    },
    {
        "name": "Bumblebee",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2022/04/SA_bugsworld_banner_sahp_10.jpg",
        "crop": (0, 0, 1000, 1000),
        "output": "sonny_png_library/limited/animal-collections/bug-s-world-2022/07__bumblebee.png",
    },
    {
        "name": "Bumblebee Robby Angel",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2022/04/SA_bugsworld_banner_sahp_11.jpg",
        "crop": (0, 0, 1000, 1000),
        "output": "sonny_png_library/limited/animal-collections/bug-s-world-2022/08__bumblebee-robby-angel.png",
    },
    {
        "name": "Dino Hatchling",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2024/07/img_dinosaur_11.png",
        "crop": (0, 0, 1000, 1000),
        "output": "sonny_png_library/limited/special-collections/dinosaur-2024/07__dino-hatchling.png",
    },
    {
        "name": "Egg Robby Angel",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2024/07/img_dinosaur_12.png",
        "crop": (0, 0, 1000, 1000),
        "output": "sonny_png_library/limited/special-collections/dinosaur-2024/08__egg-robby-angel.png",
    },
    {
        "name": "Happy Little Bear",
        "url": "https://cdn.shopify.com/s/files/1/0449/5163/4086/files/img_afternoontea_02.png?v=1675066380",
        "crop": (500, 15, 760, 390),
        "cleanup": "none",
        "output": "sonny_png_library/limited/drink-collections/afternoon-tea-2023/04__happy-little-bear.png",
    },
    {
        "name": "Brave as me Limited Color",
        "url": "https://pickaparty.com/cdn/shop/files/BRAVE_AS_ME_1_1024x1024@2x.jpg?v=1763583490",
        "crop": (350, 90, 1450, 1900),
        "output": "sonny_png_library/collaboration/collaboration-collections/collaboration-with-cai/03__brave-as-me-limited-color.png",
    },
    {
        "name": "Classical",
        "url": "https://www.sonnyangelstore.com.hk/cdn/shop/products/products_lovethemusic_4.png?v=1666876892",
        "crop": (720, 260, 995, 625),
        "cleanup": "none",
        "output": "sonny_png_library/limited/valentines-collections/love-the-music-2022/05__classical.png",
    },
    {
        "name": "Mini Marie-Antoinette",
        "url": "https://i.ebayimg.com/images/g/JJ0AAOSw~NdnnI~q/s-l1600.jpg",
        "crop": (120, 0, 600, 800),
        "cleanup": "none",
        "output": "sonny_png_library/limited/collaboration-collections/ladur-e-p-tisserie-collection/13__mini-marie-antoinette.png",
    },
    {
        "name": "Mini Marie-Antoinette Ornament",
        "url": "https://i.ebayimg.com/images/g/JJ0AAOSw~NdnnI~q/s-l1600.jpg",
        "crop": (120, 0, 600, 800),
        "cleanup": "none",
        "output": "sonny_png_library/limited/christmas-collections/christmas-ornament-ladur-e-patisseries-collection/07__mini-marie-antoinette.png",
    },
    {
        "name": "Wool Snowman",
        "url": "https://i.ebayimg.com/images/g/ViQAAeSwWyRo0PnQ/s-l1600.webp",
        "crop": (185, 70, 610, 790),
        "cleanup": "none",
        "output": "sonny_png_library/limited/christmas-collections/christmas-series-2019/05__wool-snowman.png",
    },
    {
        "name": "Carrot",
        "url": "https://i.ebayimg.com/images/g/5Y0AAOSwMFVmsGno/s-l1600.webp",
        "crop": (0, 0, 500, 500),
        "cleanup": "none",
        "output": "sonny_png_library/limited/drink-collections/refreshing-cold-drinks-2022/05__carrot.png",
    },
    {
        "name": "Happiness",
        "url": "https://i.ebayimg.com/images/g/cacAAOSw1ndnwdjK/s-l1600.webp",
        "crop": (0, 0, 500, 500),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/harvest-series-2021/05__happiness.png",
    },
    {
        "name": "Ocean Robby Angel",
        "url": "https://i.ebayimg.com/images/g/ZWAAAeSwHSho52ol/s-l1600.webp",
        "crop": (145, 85, 800, 700),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/summer-series-2018/13__ocean-robby-angel.png",
    },
    {
        "name": "Beach Robby Angel",
        "url": "https://i.ebayimg.com/images/g/6AoAAeSwJfVpW9me/s-l1600.webp",
        "crop": (150, 80, 650, 780),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/summer-vacation-series-2017/13__beach-robby-angel.png",
    },
    {
        "name": "Caribbean Robby Angel",
        "url": "https://i.ebayimg.com/images/g/9UEAAOSwvGpldnpa/s-l1600.webp",
        "crop": (125, 40, 680, 760),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/summer-series-caribbean-sea-version-2016/07__caribbean-robby-angel.png",
    },
    {
        "name": "Chipmunk",
        "url": "https://i.ebayimg.com/images/g/QyoAAeSwrj9pXlq6/s-l1600.webp",
        "crop": (120, 45, 505, 780),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/the-sonny-angel-town-musicians-2021/07__chipmunk.png",
    },
    {
        "name": "Color Guard Robby Angel",
        "url": "https://i.ebayimg.com/images/g/LzYAAeSwnyhpXldA/s-l1600.webp",
        "crop": (145, 45, 420, 770),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/the-sonny-angel-town-musicians-2021/08__color-guard-robby-angel.png",
    },
    {
        "name": "Aurora Robby Angel",
        "url": "https://i.ebayimg.com/images/g/XgIAAeSwpj9pB6b0/s-l1600.webp",
        "crop": (120, 80, 620, 760),
        "cleanup": "none",
        "output": "sonny_png_library/limited/birthday-collections/birthday-gift-bear-2021/08__aurora-robby-angel.png",
    },
    {
        "name": "Wool Robby Angel",
        "url": "https://i.ebayimg.com/images/g/d54AAeSw~R1odghy/s-l1600.webp",
        "crop": (150, 95, 730, 760),
        "cleanup": "none",
        "output": "sonny_png_library/limited/christmas-collections/christmas-series-2019/06__wool-robby-angel.png",
    },
    {
        "name": "Aurora Balloon Bear",
        "url": "https://i.ebayimg.com/images/g/pvAAAeSwxEVpYrQG/s-l1600.webp",
        "crop": (95, 40, 700, 760),
        "cleanup": "none",
        "output": "sonny_png_library/limited/birthday-collections/birthday-gift-bear-2021/07__aurora-balloon-bear.png",
    },
    {
        "name": "Aurora",
        "url": "https://i.ebayimg.com/images/g/cykAAeSw7F5o65z6/s-l1600.webp",
        "crop": (115, 35, 650, 760),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/sky-color-series/05__aurora.png",
    },
    {
        "name": "Humpty Dumpty",
        "url": "https://i.ebayimg.com/images/g/exYAAeSwsXFpXnE8/s-l1600.webp",
        "crop": (120, 20, 565, 760),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/sonny-angel-in-wonderland-series-2020/07__humpty-dumpty.png",
    },
    {
        "name": "Drink me Robby Angel",
        "url": "https://i.ebayimg.com/images/g/ZsIAAeSwppFpXm6b/s-l1600.webp",
        "crop": (160, 60, 470, 760),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/sonny-angel-in-wonderland-series-2020/08__drink-me-robby-angel.png",
    },
    {
        "name": "Alien Robby Angel",
        "url": "https://i.ebayimg.com/images/g/qIQAAeSwCglpXmcJ/s-l1600.webp",
        "crop": (170, 70, 640, 780),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/sonny-angel-in-space-adventure-series-2020/08__alien-robby-angel.png",
    },
    {
        "name": "Golden Lucky Cat",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2023/07/img_japanese_good_luck_05.png",
        "crop": (90, 55, 430, 470),
        "output": "sonny_png_library/limited/special-collections/japanese-good-luck-2021/07__golden-lucky-cat.png",
    },
    {
        "name": "Daruma Robby Angel",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2023/07/img_japanese_good_luck_05.png",
        "crop": (570, 35, 900, 470),
        "output": "sonny_png_library/limited/special-collections/japanese-good-luck-2021/08__daruma-robby-angel.png",
    },
    {
        "name": "Lucky Daruma Victory",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2023/07/img_japanese_good_luck_07.png",
        "crop": (215, 55, 450, 500),
        "output": "sonny_png_library/limited/special-collections/japanese-good-luck-2021/09__lucky-daruma-victory.png",
    },
    {
        "name": "Lucky Daruma Great Blessing",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2023/07/img_japanese_good_luck_07.png",
        "crop": (705, 55, 940, 500),
        "output": "sonny_png_library/limited/special-collections/japanese-good-luck-2021/10__lucky-daruma-great-blessing.png",
    },
    {
        "name": "Lucky Daruma Love",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2023/07/img_japanese_good_luck_08.png",
        "crop": (205, 55, 440, 500),
        "output": "sonny_png_library/limited/special-collections/japanese-good-luck-2021/11__lucky-daruma-love.png",
    },
    {
        "name": "Lucky Daruma Good Luck",
        "url": "https://www.sonnyangel.com/renewal/wp-content/uploads/2023/07/img_japanese_good_luck_08.png",
        "crop": (705, 55, 940, 500),
        "output": "sonny_png_library/limited/special-collections/japanese-good-luck-2021/12__lucky-daruma-good-luck.png",
    },
    {
        "name": "Big Apple Robby Angel",
        "url": "https://i.ebayimg.com/images/g/nt0AAeSw~DNpYKrC/s-l1600.webp",
        "crop": (320, 150, 915, 1400),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/newyork-series/05__big-apple-robby-angel.png",
    },
    {
        "name": "NY Bull",
        "url": "https://i.ebayimg.com/images/g/7XwAAeSwHBlokrdR/s-l1600.webp",
        "crop": (120, 70, 700, 1035),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/newyork-series/06__ny-bull.png",
    },
    {
        "name": "Shooting Star Robby Angel",
        "url": "https://u-mercari-images.mercdn.net/photos/m75327348529_1.jpg?_=1768185661&quality=75&width=1280",
        "crop": (115, 120, 485, 980),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/sky-color-series/07__shooting-star-robby-angel.png",
    },
    {
        "name": "Ice",
        "url": "https://i.ebayimg.com/images/g/GykAAOSwuQhl6JTd/s-l1600.webp",
        "crop": (55, 35, 710, 760),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/summer-festival-series-2021/05__ice.png",
    },
    {
        "name": "UFO",
        "url": "https://i.ebayimg.com/images/g/HYcAAOSwbXdnUoHh/s-l1600.webp",
        "crop": (120, 55, 620, 780),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/sonny-angel-in-space-adventure-series-2020/07__ufo.png",
    },
    {
        "name": "Humpty Dumpty",
        "url": "https://i.ebayimg.com/images/g/exYAAeSwsXFpXnE8/s-l1600.webp",
        "crop": (120, 20, 565, 760),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/sonny-angel-in-wonderland-series-2020/07__humpty-dumpty.png",
    },
    {
        "name": "Drink me Robby Angel",
        "url": "https://i.ebayimg.com/images/g/ZsIAAeSwppFpXm6b/s-l1600.webp",
        "crop": (160, 60, 470, 760),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/sonny-angel-in-wonderland-series-2020/08__drink-me-robby-angel.png",
    },
    {
        "name": "Aurora",
        "url": "https://i.ebayimg.com/images/g/cykAAeSw7F5o65z6/s-l1600.webp",
        "crop": (115, 35, 650, 760),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/sky-color-series/05__aurora.png",
    },
    {
        "name": "Alien Robby Angel",
        "url": "https://i.ebayimg.com/images/g/qIQAAeSwCglpXmcJ/s-l1600.webp",
        "crop": (170, 70, 640, 780),
        "cleanup": "none",
        "output": "sonny_png_library/limited/special-collections/sonny-angel-in-space-adventure-series-2020/08__alien-robby-angel.png",
    },
]


def border_background_mask(image: Image.Image, tolerance: int = 28) -> np.ndarray:
    rgba = image.convert("RGBA")
    rgb = np.array(rgba)[:, :, :3].astype(np.int32)
    border = np.concatenate([rgb[0], rgb[-1], rgb[:, 0], rgb[:, -1]], axis=0)
    samples = np.unique(border, axis=0)
    height, width = rgb.shape[:2]
    min_dist = np.full((height, width), 10_000.0)
    for color in samples:
        diff = rgb - color.astype(np.int32)
        dist = np.sqrt(np.sum(diff * diff, axis=2))
        min_dist = np.minimum(min_dist, dist)
    return min_dist <= tolerance


def remove_lineup_background(image: Image.Image) -> Image.Image:
    rgba = image.convert("RGBA")
    border_mask = border_background_mask(rgba)
    arr = np.array(rgba)
    arr[:, :, 3] = np.where(border_mask, 0, 255).astype(np.uint8)
    arr[arr[:, :, 3] == 0, :3] = 255
    result = Image.fromarray(arr)
    bbox = result.getchannel("A").getbbox()
    return result.crop(bbox) if bbox else result


def cleaned_crop(
    image: Image.Image,
    crop: tuple[int, int, int, int],
    cleanup: str = "auto",
) -> Image.Image:
    cropped = image.crop(crop)
    if cleanup == "none":
        return cropped
    if cleanup == "lineup":
        return remove_lineup_background(cropped)
    cleaned = remove_background(cropped)
    alpha_bbox = cleaned.getchannel("A").getbbox()
    if alpha_bbox:
        cleaned = cleaned.crop(alpha_bbox)
    # If the simple white-background cleanup kept too much poster/background,
    # fall back to a border-color flood-fill style cleanup.
    solid_alpha = np.array(cleaned.getchannel("A"))
    if np.count_nonzero(solid_alpha == 0) < 100:
        cleaned = remove_lineup_background(cropped)
    return cleaned


def fetch(url: str) -> Image.Image:
    request = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(request, timeout=30) as response:
        return Image.open(BytesIO(response.read())).convert("RGBA")


def main() -> None:
    cache: dict[str, Image.Image] = {}
    saved = 0
    skipped = 0
    for asset in ASSETS:
        destination = ROOT / asset["output"]
        if destination.exists():
            skipped += 1
            print(f"skip {asset['name']} -> {destination}")
            continue
        image = cache.setdefault(asset["url"], fetch(asset["url"]))
        cropped = cleaned_crop(image, asset["crop"], asset.get("cleanup", "auto"))
        destination.parent.mkdir(parents=True, exist_ok=True)
        cropped.save(destination)
        saved += 1
        print(f"saved {asset['name']} -> {destination}")
    print(f"saved {saved}, skipped {skipped}")


if __name__ == "__main__":
    main()
