window.SONNY_MANUAL_OVERRIDES = (() => {
  const items = {};

  function assign(id, patch) {
    items[id] = {
      ...(items[id] || {}),
      ...patch,
    };
  }

  function mapUnrefinedSeries({ artById = {}, secretIds = [] }) {
    Object.entries(artById).forEach(([id, artPath]) => {
      assign(id, { artPath, artSource: "manual-web-override" });
    });

    secretIds.forEach((id) => {
      assign(id, { isSecret: true });
    });
  }

  mapUnrefinedSeries({
    artById: {
      "page-18-01-rabbit":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-1-2018/11__rabbit.png",
      "page-18-02-elephant":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-1-2018/03__elephant.png",
      "page-18-03-panda":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-1-2018/04__panda.png",
      "page-18-04-cheetah":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-1-2018/01__cheetah.png",
      "page-18-05-tiger":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-1-2018/06__tiger.png",
      "page-18-06-lion":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-1-2018/12__lion.png",
      "page-18-07-cockerel":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-1-2018/02__cockerel.png",
      "page-18-08-dalmatian":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-1-2018/09__dalmatian.png",
      "page-18-09-frog":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-1-2018/10__frog.png",
      "page-18-10-koala":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-1-2018/08__koala.png",
      "page-18-11-monkey":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-1-2018/05__monkey.png",
      "page-18-12-crocodile":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-1-2018/07__crocodile.png",
    },
    secretIds: ["page-18-13-chipmunk"],
  });

  assign("page-18-13-chipmunk", {
    artPath: "./app/assets/manual/unrefined-chipmunk.jpg",
    artSource: "manual-upload",
  });

  assign("page-18-14-robby-angel", {
    artPath: "./app/assets/manual/unrefined-robby-ver-1.jpg",
    artSource: "manual-upload",
  });

  mapUnrefinedSeries({
    artById: {
      "page-18-15-mouse":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-2-2018/10__mouse.png",
      "page-18-16-lesser-panda":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-2-2018/03__lesser-panda.png",
      "page-18-17-giraffe":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-2-2018/04__giraffe.png",
      "page-18-18-fawn":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-2-2018/01__fawn.png",
      "page-18-19-parakeet":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-2-2018/05__parakeet.png",
      "page-18-20-cow":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-2-2018/09__cow.png",
      "page-18-21-white-bear":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-2-2018/06__white-bear.png",
      "page-18-22-uribou":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-2-2018/07__uribou.png",
      "page-18-23-rhinoceros":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-2-2018/08__rhinoceros.png",
      "page-18-24-sheep":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-2-2018/12__sheep.png",
      "page-18-25-reindeer":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-2-2018/11__reindeer.png",
      "page-18-26-pig":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-2-2018/02__pig.png",
    },
    secretIds: ["page-18-27-kappa"],
  });

  mapUnrefinedSeries({
    artById: {
      "page-19-01-parrot":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-3-2018/07__parrot.png",
      "page-19-02-gorilla":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-3-2018/02__gorilla.png",
      "page-19-03-alpaca":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-3-2018/05__alpaca.png",
      "page-19-04-buffalo":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-3-2018/04__buffalo.png",
      "page-19-05-zebra":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-3-2018/09__zebra.png",
      "page-19-06-american-shorthair":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-3-2018/03__american-short-hair.png",
      "page-19-07-hippopotamus":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-3-2018/01__hippopotamus.png",
      "page-19-08-chameleon":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-3-2018/11__chameleon.png",
      "page-19-09-french-bulldog":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-3-2018/06__french-bull-dog.png",
      "page-19-10-duckbill":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-3-2018/10__duckbill.png",
      "page-19-11-lop-ear-rabbit":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-3-2018/08__lop-ear-rabbit.png",
      "page-19-12-owl":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-3-2018/12__owl.png",
    },
    secretIds: ["page-19-13-unicorn"],
  });

  mapUnrefinedSeries({
    artById: {
      "page-19-15-snake":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-4-2018/12__snake.png",
      "page-19-16-horse":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-4-2018/01__horse.png",
      "page-19-17-chihuahua":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-4-2018/03__chihuahua.png",
      "page-19-18-peacock":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-4-2018/10__peacock.png",
      "page-19-19-shiba-inu":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-4-2018/04__shiba-inu.png",
      "page-19-20-hamadryas-baboon":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-4-2018/06__hamadryas-baboon.png",
      "page-19-21-mongoose":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-4-2018/05__mongoose.png",
      "page-19-22-skunk":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-4-2018/08__skunk.png",
      "page-19-23-calico-cat":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-4-2018/07__calico-cat.png",
      "page-19-24-japanese-crane":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-4-2018/09__japanese-crane.png",
      "page-19-25-goat":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-4-2018/02__goat.png",
      "page-19-26-duck":
        "./sonny_png_library_web/regulars/animal-collections/animal-series-4-2018/11__duck.png",
    },
    secretIds: ["page-19-27-dragon"],
  });

  mapUnrefinedSeries({
    artById: {
      "page-20-01-shark":
        "./sonny_png_library_web/regulars/marine-collections/marine-series-2019/12__shark.png",
      "page-20-02-jellyfish":
        "./sonny_png_library_web/regulars/marine-collections/marine-series-2019/02__jellyfish.png",
      "page-20-03-dolphin":
        "./sonny_png_library_web/regulars/marine-collections/marine-series-2019/03__dolphin.png",
      "page-20-04-seal":
        "./sonny_png_library_web/regulars/marine-collections/marine-series-2019/04__seal.png",
      "page-20-05-seahorse":
        "./sonny_png_library_web/regulars/marine-collections/marine-series-2019/05__seahorse.png",
      "page-20-06-whale":
        "./sonny_png_library_web/regulars/marine-collections/marine-series-2019/06__whale.png",
      "page-20-07-clownfish":
        "./sonny_png_library_web/regulars/marine-collections/marine-series-2019/07__clownfish.png",
      "page-20-08-shell":
        "./sonny_png_library_web/regulars/marine-collections/marine-series-2019/08__shell.png",
      "page-20-09-penguin":
        "./sonny_png_library_web/regulars/marine-collections/marine-series-2019/09__penguin.png",
      "page-20-10-ray":
        "./sonny_png_library_web/regulars/marine-collections/marine-series-2019/10__ray.png",
      "page-20-11-blowfish":
        "./sonny_png_library_web/regulars/marine-collections/marine-series-2019/11__blowfish.png",
      "page-20-12-starfish":
        "./sonny_png_library_web/regulars/marine-collections/marine-series-2019/01__starfish.png",
    },
    secretIds: ["page-20-13-turtle"],
  });

  mapUnrefinedSeries({
    artById: {
      "page-20-15-mangosteen":
        "./sonny_png_library_web/regulars/fruit-collections/fruit-series-2019/01__mangosteen.png",
      "page-20-16-peach":
        "./sonny_png_library_web/regulars/fruit-collections/fruit-series-2019/02__peach.png",
      "page-20-17-persimmon":
        "./sonny_png_library_web/regulars/fruit-collections/fruit-series-2019/03__persimmon.png",
      "page-20-18-pear":
        "./sonny_png_library_web/regulars/fruit-collections/fruit-series-2019/04__pear.png",
      "page-20-19-strawberry":
        "./sonny_png_library_web/regulars/fruit-collections/fruit-series-2019/05__strawberry.png",
      "page-20-20-grape":
        "./sonny_png_library_web/regulars/fruit-collections/fruit-series-2019/06__grapes.png",
      "page-20-21-watermelon":
        "./sonny_png_library_web/regulars/fruit-collections/fruit-series-2019/08__watermelon.png",
      "page-20-22-melon":
        "./sonny_png_library_web/regulars/fruit-collections/fruit-series-2019/07__melon.png",
      "page-20-23-lemon":
        "./sonny_png_library_web/regulars/fruit-collections/fruit-series-2019/09__lemon.png",
      "page-20-24-chestnut":
        "./sonny_png_library_web/regulars/fruit-collections/fruit-series-2019/10__chestnut.png",
      "page-20-25-pineapple":
        "./sonny_png_library_web/regulars/fruit-collections/fruit-series-2019/11__pineapple.png",
      "page-20-26-apple":
        "./sonny_png_library_web/regulars/fruit-collections/fruit-series-2019/12__apple.png",
    },
    secretIds: ["page-20-27-seed-leaf"],
  });

  mapUnrefinedSeries({
    artById: {
      "page-21-01-rose":
        "./sonny_png_library_web/regulars/flower-collections/flower-series-2019/01__rose.png",
      "page-21-02-cherry-blossoms":
        "./sonny_png_library_web/regulars/flower-collections/flower-series-2019/12__cherry-blossoms.png",
      "page-21-03-poppy":
        "./sonny_png_library_web/regulars/flower-collections/flower-series-2019/03__poppy.png",
      "page-21-04-dandelion":
        "./sonny_png_library_web/regulars/flower-collections/flower-series-2019/04__dandelion.png",
      "page-21-05-cactus":
        "./sonny_png_library_web/regulars/flower-collections/flower-series-2019/05__cactus.png",
      "page-21-06-morning-glory":
        "./sonny_png_library_web/regulars/flower-collections/flower-series-2019/06__morning-glory.png",
      "page-21-07-lily-bell":
        "./sonny_png_library_web/regulars/flower-collections/flower-series-2019/07__lily-bell.png",
      "page-21-08-hydrangea":
        "./sonny_png_library_web/regulars/flower-collections/flower-series-2019/08__hydrangea.png",
      "page-21-09-pansy":
        "./sonny_png_library_web/regulars/flower-collections/flower-series-2019/09__pansy.png",
      "page-21-10-carnation":
        "./sonny_png_library_web/regulars/flower-collections/flower-series-2019/10__carnation.png",
      "page-21-11-acorn":
        "./sonny_png_library_web/regulars/flower-collections/flower-series-2019/11__acorn.png",
      "page-21-12-tulip":
        "./sonny_png_library_web/regulars/flower-collections/flower-series-2019/02__tulip.png",
    },
    secretIds: ["page-21-13-bee"],
  });

  mapUnrefinedSeries({
    artById: {
      "page-21-15-carrot":
        "./sonny_png_library_web/regulars/vegetable-collections/vegetable-series-2019/01__carrot.png",
      "page-21-16-tomato":
        "./sonny_png_library_web/regulars/vegetable-collections/vegetable-series-2019/02__tomato.png",
      "page-21-17-bamboo-shoot":
        "./sonny_png_library_web/regulars/vegetable-collections/vegetable-series-2019/03__bamboo-shoot.png",
      "page-21-18-sweet-potato":
        "./sonny_png_library_web/regulars/vegetable-collections/vegetable-series-2019/04__sweet-potato.png",
      "page-21-19-onion":
        "./sonny_png_library_web/regulars/vegetable-collections/vegetable-series-2019/05__onion.png",
      "page-21-20-radish":
        "./sonny_png_library_web/regulars/vegetable-collections/vegetable-series-2019/06__radish.png",
      "page-21-21-green-pepper":
        "./sonny_png_library_web/regulars/vegetable-collections/vegetable-series-2019/08__pimento.png",
      "page-21-22-eggplant":
        "./sonny_png_library_web/regulars/vegetable-collections/vegetable-series-2019/07__eggplant.png",
      "page-21-23-japanese-ginger":
        "./sonny_png_library_web/regulars/vegetable-collections/vegetable-series-2019/09__japanese-ginger.png",
      "page-21-24-corn":
        "./sonny_png_library_web/regulars/vegetable-collections/vegetable-series-2019/11__corn.png",
      "page-21-25-japanese-radish":
        "./sonny_png_library_web/regulars/vegetable-collections/vegetable-series-2019/10__japanese-radish.png",
      "page-21-26-cabbage":
        "./sonny_png_library_web/regulars/vegetable-collections/vegetable-series-2019/12__cabbage.png",
    },
    secretIds: ["page-21-27-shiitake"],
  });

  assign("page-10-10-white-bear", {
    artPath: "./app/assets/manual/animal-series-1-white-bear.png",
    artSource: "manual-upload",
  });

  assign("page-10-13-chipmunk", {
    isSecret: true,
  });

  assign("page-22-11b-sunflower-lion-rainbow", {
    isSecret: true,
  });

  assign("page-10-14-robby-angel", {
    artPath: "./app/assets/manual/animal-series-1-robby.png",
    artSource: "manual-upload",
  });

  [
    "page-89-01-white-rabbit",
    "page-89-02-pink-rabbit",
    "page-89-03-white-bear",
    "page-89-04-brown-bear",
  ].forEach((id) => {
    assign(id, {
      displaySeries: "Plush Collection -Cuddly Rabbit & Bear-",
    });
  });

  [
    "page-54-09-astronaut",
    "page-54-10-moon",
    "page-54-11-alien",
    "page-54-12-earth",
    "page-54-13-sun",
    "page-54-14-rocket",
    "page-54-15-ufo",
    "page-54-16-alien-robby-angel",
  ].forEach((id) => {
    assign(id, {
      displaySeries: "Sonny Angel In Space Adventure Series (2020)",
    });
  });

  assign("page-54-07-chipmunk", {
    isSecret: true,
  });

  assign("page-54-15-ufo", {
    isSecret: true,
  });

  assign("page-55-07-humpty-dumpty", {
    isSecret: true,
  });

  assign("page-56-09-happy-pink", {
    isSecret: true,
  });

  assign("page-56-10-lucky-orange", {
    badges: ["lucky"],
  });

  assign("page-56-12-lucky-purple", {
    badges: ["lucky"],
  });

  assign("page-56-13-lucky-pink", {
    badges: ["lucky"],
  });

  assign("page-57-09-doberman", {
    isSecret: true,
  });

  assign("page-57-10-lucky-pomeranian-blue", {
    badges: ["lucky"],
  });

  assign("page-57-11-lucky-pomeranian-orange", {
    badges: ["lucky"],
  });

  assign("page-57-12-lucky-pomeranian-pink", {
    badges: ["lucky"],
  });

  assign("page-58-07-movie-night-sonny-angel", {
    artPath: "./app/assets/hero/secret-movie-night.png",
    artSource: "manual-web-override",
    isSecret: true,
  });

  assign("page-58-08-movie-night-robby-angel", {
    artPath: "./app/assets/hero/movie-night-robby.png",
    artSource: "manual-web-override",
  });

  assign("page-58-14-mint-rabbit", {
    isSecret: true,
  });

  assign("page-59-07-friendship-work-with-robby-angel", {
    isSecret: true,
    isRobby: false,
  });

  assign("page-59-10-friendship-work-with-sonny-angel", {
    isRobby: true,
  });

  assign("page-60-05-classical", {
    isSecret: true,
  });

  assign("page-60-11-happy-little-bear", {
    isSecret: true,
  });

  assign("page-61-06-golden-lucky-cat", {
    isSecret: true,
  });

  assign("page-61-08-lucky-daruma-victory", {
    badges: ["lucky"],
  });

  assign("page-61-09-lucky-daruma-great-blessing", {
    badges: ["lucky"],
  });

  assign("page-61-10-lucky-daruma-love", {
    badges: ["lucky"],
  });

  assign("page-61-11-lucky-daruma-good-luck", {
    badges: ["lucky"],
  });

  assign("page-61-18-jeju-surfer", {
    isSecret: true,
  });

  assign("page-62-13-ny-bull", {
    isSecret: true,
  });

  assign("page-62-07-lantern-dragon", {
    isSecret: true,
  });

  assign("page-62-22-i-heart-seoul", {
    isSecret: true,
  });

  assign("page-63-07-pineapple-swimmer", {
    isSecret: true,
  });

  assign("page-63-21-chipmunk", {
    isSecret: true,
  });

  assign("page-64-13-kappa", {
    isSecret: true,
  });

  assign("page-64-26-unicorn", {
    isSecret: true,
  });

  assign("page-69-13-peanut", {
    isSecret: true,
  });

  assign("page-70-14-potted-plant", {
    isSecret: true,
  });

  assign("page-70-19-saun-nomini", {
    isSecret: true,
  });

  assign("page-71-13-mini-marie-antoinette", {
    isSecret: true,
  });

  assign("page-72-18-rabbit", {
    isSecret: true,
  });

  assign("page-73-11-santa-claus", {
    isSecret: true,
  });

  assign("page-73-12-reindeer", {
    isSecret: true,
  });

  assign("page-74-09-single-rose", {
    isSecret: true,
  });

  assign("page-74-16-pass", {
    isSecret: true,
  });

  assign("page-74-22-free-your-style", {
    isSecret: true,
  });

  [
    "page-22-03-round-balloon",
    "page-22-04-present-hug",
    "page-22-08-heart-hug",
    "page-22-09-star-balloon",
    "page-22-10-birthday-cake-hug",
    "page-22-13-heart-balloon",
    "page-22-14-aurora-balloon-bear",
    "page-22-15-aurora-robby-angel",
  ].forEach((id) => {
    assign(id, {
      displaySeries: "Birthday Gift Bear (2021)",
    });
  });

  assign("page-22-14-aurora-balloon-bear", {
    isSecret: true,
  });

  assign("page-23-11-special-cake", {
    isSecret: true,
  });

  assign("page-23-14-aurora", {
    isSecret: true,
  });

  assign("page-66-07-aurora", {
    isSecret: true,
  });

  assign("page-24-20-laurel-crown", {
    artPath:
      "./app/assets/manual/user-photo-candidates/crown-series/laurel-crown-candidate.png",
    artSource: "manual-upload",
    isSecret: true,
  });

  assign("page-24-25-chu", {
    isSecret: true,
  });

  assign("page-25-11-chipmunk", {
    isSecret: true,
    catalogSortSlot: 13.5,
  });

  assign("page-26-13-unicorn", {
    isSecret: true,
  });

  assign("page-27-13-seed-leaf", {
    isSecret: true,
  });

  assign("page-28-13-unicorn", {
    isSecret: true,
  });

  assign("page-29-08-dinner-rabbit", {
    isSecret: true,
    catalogSortSlot: 7.5,
  });

  assign("page-29-06-dinner-robby-angel", {
    catalogSortSlot: 8.5,
  });

  assign("page-30-07-snow-fairy-fox", {
    isSecret: true,
  });

  assign("page-30-08-snow-fairy-lop-ear-rabbit", {
    isSecret: true,
  });

  assign("page-30-09-snow-fairy-mouse", {
    isSecret: true,
  });

  assign("page-30-18-santa-s-helper-mouse", {
    isSecret: true,
  });

  assign("page-31-01-stuffed-robby", {
    isRobby: false,
  });

  assign("page-31-07-angel", {
    isSecret: true,
  });

  assign("page-31-13-classic-santa", {
    isSecret: true,
  });

  assign("page-31-14-classic-reindeer", {
    isSecret: true,
  });

  assign("page-31-20-wool-snowman", {
    isSecret: true,
  });

  assign("page-33-05-santa-claus", {
    isSecret: true,
  });

  assign("page-33-06-reindeer", {
    isSecret: true,
  });

  assign("page-33-12-santa-claus", {
    isSecret: true,
  });

  assign("page-33-13-reindeer", {
    isSecret: true,
  });

  assign("page-33-19-santa-claus", {
    isSecret: true,
  });

  assign("page-33-20-reindeer", {
    isSecret: true,
  });

  assign("page-33-26-santa-claus", {
    isSecret: true,
  });

  assign("page-33-27-reindeer", {
    isSecret: true,
  });

  assign("page-32-05-santa-claus", {
    isSecret: true,
  });

  assign("page-32-06-reindeer", {
    isSecret: true,
  });

  assign("page-32-10-star-pendant", {
    isSecret: true,
  });

  assign("page-32-11-cross-pendant", {
    isSecret: true,
  });

  assign("page-32-12-snowflake-pendant", {
    isSecret: true,
  });

  assign("page-32-20-santa-claus", {
    isSecret: true,
  });

  assign("page-32-25-santa-claus", {
    isSecret: true,
  });

  assign("page-34-07-santa-claus", {
    isSecret: true,
  });

  assign("page-34-08-reindeer", {
    isSecret: true,
  });

  assign("page-34-17-lop-ear-rabbit", {
    isSecret: true,
  });

  assign("page-35-07-pink-bear", {
    isSecret: true,
  });

  assign("page-35-08-blue-bear", {
    isSecret: true,
  });

  assign("page-35-09-rabbit", {
    isSecret: true,
  });

  assign("page-36-06-love-lop-ear-rabbit", {
    isSecret: true,
  });

  assign("page-36-07-love-red-rabbit", {
    isSecret: true,
  });

  assign("page-36-08-chocolate-robby-angel", {
    isSecret: true,
    catalogSortSlot: 10.5,
  });

  assign("page-36-09-love-pink-rabbit", {
    isSecret: true,
  });

  assign("page-36-10-balloon", {
    catalogSortSlot: 5.5,
  });

  assign("page-37-07-unicorn", {
    isSecret: true,
  });

  assign("page-37-13-chocolate-toy-poodle", {
    isSecret: true,
  });

  assign("page-37-19-chocolate-rabbit", {
    isSecret: true,
  });

  assign("page-38-05-single-rose", {
    isSecret: true,
  });

  assign("page-38-06-rose-bouquet", {
    isSecret: true,
  });

  assign("page-38-12-teddy-bear", {
    isSecret: true,
  });

  assign("page-38-13-sweet-kitty", {
    isSecret: true,
  });

  assign("page-38-26-mint-chocolate", {
    isSecret: true,
  });

  assign("page-38-27-mint-chocolate", {
    isSecret: true,
  });

  assign("page-39-13-cats", {
    isSecret: true,
  });

  assign("page-40-13-burry-designs-with", {
    isSecret: true,
  });

  assign("page-39-08-easter-bunny", {
    series: "Easter Series 2018",
  });

  assign("page-39-22-hatched-egg", {
    series: "Easter Series 2018",
  });

  assign("page-40-15-koala-bunny", {
    name: "Easter Cow",
    series: "Easter Series 2018",
  });

  assign("page-39-11-easter-lamb", {
    series: "Easter Series 2018",
  });

  assign("page-39-21-easter-bunny", {
    series: "Easter Series 2018",
    isSecret: true,
  });

  assign("page-39-09-hoiched-eada", {
    name: "Hatched Egg",
    series: "Easter Series 2018",
    isSecret: true,
  });

  assign("page-40-18-robhy-hot-angel", {
    name: "Paint Robby Angel",
    series: "Easter Series 2018",
  });

  assign("page-40-28-easter-bunny-secret-2017", {
    isSecret: true,
  });

  assign("page-40-29-egg-bonnet-secret-2017", {
    isSecret: true,
  });

  assign("page-40-35-easter-bunny-secret-2016", {
    isSecret: true,
  });

  assign("page-40-36-easter-egg-secret-2016", {
    isSecret: true,
  });

  assign("page-40-01-robby-angel-eog", {
    series: "Page 40 Review Queue",
  });

  assign("page-40-12-easter-agg", {
    series: "Page 40 Review Queue",
  });

  assign("page-40-09-by-decorated-easter", {
    series: "Page 40 Review Queue",
  });

  assign("page-40-19-rabbit", {
    series: "Page 40 Review Queue",
  });

  assign("page-40-17-easter-bunny", {
    series: "Page 40 Review Queue",
  });

  assign("page-40-16-easter", {
    series: "Page 40 Review Queue",
  });

  assign("page-41-07-rabbit-pumpkin-orange", {
    isSecret: true,
  });

  assign("page-41-08-rabbit-pumpkin-purple", {
    isSecret: true,
  });

  assign("page-41-09-rabbit-pumpkin-green", {
    isSecret: true,
  });

  assign("page-41-14-rabbit-pumpkin-pink", {
    isSecret: true,
  });

  assign("page-42-05-witch", {
    isSecret: true,
  });

  assign("page-42-06-ghost", {
    isSecret: true,
  });

  assign("page-42-12-witch", {
    isSecret: true,
  });

  assign("page-42-13-pumpkin", {
    isSecret: true,
  });

  assign("page-42-15-vampire", {
    isSecret: true,
  });

  assign("page-42-19-vampire", {
    isSecret: true,
  });

  assign("page-42-26-ghost", {
    isSecret: true,
  });

  assign("page-42-27-witch", {
    isSecret: true,
  });

  assign("page-43-07-pumpkin", {
    artPath:
      "./app/assets/manual/user-photo-candidates/halloween-2007/pumpkin-gold-secret-candidate.png",
    artSource: "manual-upload",
    isSecret: true,
  });

  assign("page-43-08-ghost", {
    artPath:
      "./app/assets/manual/user-photo-candidates/halloween-2007/ghost-gold-secret-candidate.png",
    artSource: "manual-upload",
    isSecret: true,
  });

  assign("page-45-05-cherry", {
    isSecret: true,
  });

  assign("page-45-11-cherry", {
    isSecret: true,
  });

  assign("page-45-17-cherry", {
    isSecret: true,
  });

  assign("page-46-07-bumblebee", {
    isSecret: true,
  });

  assign("page-46-13-mexican-cactus", {
    isSecret: true,
  });

  assign("page-46-14-pink-rabbit", {
    isSecret: true,
  });

  assign("page-46-15-pink-monkey", {
    isSecret: true,
  });

  assign("page-46-16-pink-mouse", {
    isSecret: true,
  });

  assign("page-46-17-pink-parrot", {
    isSecret: true,
  });

  assign("page-47-05-carrot", {
    isSecret: true,
  });

  assign("page-47-10-ice", {
    isSecret: true,
  });

  assign("page-47-17-caribbean-hat", {
    isSecret: true,
  });

  assign("page-48-11-sailor", {
    isSecret: true,
  });

  assign("page-49-11-white-swimwear", {
    isSecret: true,
  });

  assign("page-50-13-lifeguard", {
    isSecret: true,
  });

  assign("page-51-09-happiness", {
    isSecret: true,
  });

  assign("page-52-11-dino-hatchling", {
    isSecret: true,
  });

  assign("page-53-07-merry-go-round", {
    isSecret: true,
  });

  assign("page-53-15-silk-hat-rabbit", {
    isSecret: true,
  });

  assign("page-35-11-pink-santa-claus", {
    artPath:
      "./app/assets/manual/user-photo-candidates/christmas-ornament-2014/pink-santa-claus-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-35-12-pink-reindeer", {
    artPath:
      "./app/assets/manual/user-photo-candidates/christmas-ornament-2014/pink-reindeer-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-35-13-pink-snowman", {
    artPath:
      "./app/assets/manual/user-photo-candidates/christmas-ornament-2014/pink-snowman-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-35-14-silver-santa-claus", {
    artPath:
      "./app/assets/manual/user-photo-candidates/christmas-ornament-2014/silver-santa-claus-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-35-15-silver-reindeer", {
    artPath:
      "./app/assets/manual/user-photo-candidates/christmas-ornament-2014/silver-reindeer-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-35-16-silver-snowman", {
    artPath:
      "./app/assets/manual/user-photo-candidates/christmas-ornament-2014/silver-snowman-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-64-14-french-bulldog", {
    artPath:
      "./app/assets/manual/user-photo-candidates/animal-series-ver-3-special-color/french-bulldog-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-64-15-duckbill", {
    artPath:
      "./app/assets/manual/user-photo-candidates/animal-series-ver-3-special-color/duckbill-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-64-16-lop-ear-rabbit", {
    artPath:
      "./app/assets/manual/user-photo-candidates/animal-series-ver-3-special-color/lop-ear-rabbit-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-64-17-owl", {
    artPath:
      "./app/assets/manual/user-photo-candidates/animal-series-ver-3-special-color/owl-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-64-18-hippopotamus", {
    artPath:
      "./app/assets/manual/user-photo-candidates/animal-series-ver-3-special-color/hippopotamus-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-64-19-zebra", {
    artPath:
      "./app/assets/manual/user-photo-candidates/animal-series-ver-3-special-color/zebra-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-64-20-alpaca", {
    artPath:
      "./app/assets/manual/user-photo-candidates/animal-series-ver-3-special-color/alpaca-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-64-21-buffalo", {
    artPath:
      "./app/assets/manual/user-photo-candidates/animal-series-ver-3-special-color/buffalo-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-64-22-american-shorthair", {
    artPath:
      "./app/assets/manual/user-photo-candidates/animal-series-ver-3-special-color/american-shorthair-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-64-23-gorilla", {
    artPath:
      "./app/assets/manual/user-photo-candidates/animal-series-ver-3-special-color/gorilla-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-64-24-chameleon", {
    artPath:
      "./app/assets/manual/user-photo-candidates/animal-series-ver-3-special-color/chameleon-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-64-25-parrot", {
    artPath:
      "./app/assets/manual/user-photo-candidates/animal-series-ver-3-special-color/parrot-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-33-07-gingerbread-robby-angel", {
    artPath:
      "./app/assets/manual/user-photo-candidates/christmas-series-2020/gingerbread-robby-angel-candidate.png",
    artSource: "manual-upload",
    isSecret: true,
  });

  assign("page-79-10-rabbit", {
    artPath:
      "./app/assets/manual/user-photo-candidates/12th-anniversary/rabbit-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-79-11-elephant", {
    artPath:
      "./app/assets/manual/user-photo-candidates/12th-anniversary/elephant-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-79-12-lop-ear-rabbit", {
    artPath:
      "./app/assets/manual/user-photo-candidates/12th-anniversary/lop-ear-rabbit-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-79-13-cactus", {
    artPath:
      "./app/assets/manual/user-photo-candidates/12th-anniversary/cactus-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-79-14-apple", {
    artPath:
      "./app/assets/manual/user-photo-candidates/12th-anniversary/apple-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-79-16-fawn", {
    artPath:
      "./app/assets/manual/user-photo-candidates/12th-anniversary/fawn-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-79-17-monkey", {
    artPath:
      "./app/assets/manual/user-photo-candidates/12th-anniversary/monkey-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-79-18-mouse", {
    artPath:
      "./app/assets/manual/user-photo-candidates/12th-anniversary/mouse-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-79-19-rose", {
    artPath:
      "./app/assets/manual/user-photo-candidates/12th-anniversary/rose-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-79-20-cabbage", {
    artPath:
      "./app/assets/manual/user-photo-candidates/12th-anniversary/cabbage-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-79-21-shark", {
    artPath:
      "./app/assets/manual/user-photo-candidates/12th-anniversary/shark-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-79-05-colorful-cake-rabbit", {
    isSecret: true,
  });

  assign("page-79-22-12th-anniversary-cake", {
    isSecret: true,
  });

  assign("page-80-13-11th-anniversary-cake", {
    isSecret: true,
  });

  assign("page-105-13-seed-leaf", {
    isSecret: true,
  });

  assign("page-31-26-wood-doll-santa", {
    isSecret: true,
  });

  assign("page-31-27-reindeer-plushie", {
    isSecret: true,
  });

  assign("page-31-28-pierrot-angel", {
    name: "Pierrot Robby Angel",
  });

  assign("page-96-07-strawberry-jam", {
    isSecret: true,
  });

  assign("page-97-13-honey-bee", {
    isSecret: true,
  });

  assign("page-98-12-white-bear", {
    isSecret: true,
  });

  assign("page-98-14-red-bear", {
    isSecret: true,
  });

  assign("page-99-07-santa-claus", {
    isSecret: true,
  });

  assign("page-100-07-ghost", {
    isSecret: true,
  });

  assign("page-101-13-big-hamburger", {
    isSecret: true,
  });

  assign("page-102-07-raincoat-rabbit", {
    isSecret: true,
  });

  assign("page-103-07-cherry-tree-rabbit", {
    isSecret: true,
  });

  assign("page-104-06-lop-ear-rabbit", {
    isSecret: true,
  });

  assign("page-49h-13-aloha", {
    isSecret: true,
  });

  [
    "page-91-01-a",
    "page-91-02-b",
    "page-91-03-c",
    "page-91-04-d",
    "page-91-05-e",
    "page-91-06-f",
    "page-91-07-g",
    "page-91-08-h",
    "page-91-09-i",
    "page-91-10-j",
    "page-91-11-k",
    "page-91-12-m",
    "page-91-13-n",
    "page-91-14-o",
    "page-91-15-r",
    "page-91-16-s",
    "page-91-17-t",
    "page-91-18-u",
    "page-91-19-w",
    "page-91-20-y",
  ].forEach((id) => {
    const parts = id.split("-");
    assign(id, {
      artLabel: parts[parts.length - 1].toUpperCase(),
      artSource: "generated-keychain",
    });
  });

  assign("page-52-11-dino-hatchling", {
    artPath: "./app/assets/manual/dinosaur-2024-dino-hatchling-crop.png",
    artSource: "manual-upload",
  });

  assign("page-52-12-egg-robby-angel", {
    artPath: "./app/assets/manual/dinosaur-2024-egg-robby-crop.png",
    artSource: "manual-upload",
  });

  assign("page-39-17-love", {
    artPath:
      "./app/assets/manual/user-photo-candidates/green-tea-tiger-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-39-04-choceiata", {
    artPath:
      "./app/assets/manual/user-photo-candidates/valentine-series-2013/milk-chocolate-zebra-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-39-02-mocha-porakest", {
    artPath:
      "./app/assets/manual/user-photo-candidates/valentine-series-2013/mocha-chocolate-parakeet-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-39-01-panda", {
    artPath:
      "./app/assets/manual/user-photo-candidates/valentine-series-2013/white-chocolate-panda-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-39-06-checelate", {
    artPath:
      "./app/assets/manual/user-photo-candidates/valentine-series-2013/strawberry-chocolate-lop-ear-rabbit-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-39-13-cats", {
    artPath:
      "./app/assets/manual/user-photo-candidates/valentine-series-2013/golden-cheetah-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-14-13-turtle", {
    artPath:
      "./app/assets/manual/user-photo-candidates/refined-turtle-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-12-13-unicorn", {
    artPath: "./app/assets/manual/user-photo-candidates/unicorn-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-11-13-kappa", {
    artPath:
      "./app/assets/manual/user-photo-candidates/refined-kappa-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-13-13-dragon", {
    artPath:
      "./app/assets/manual/user-photo-candidates/refined-dragon-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-18-27-kappa", {
    artPath:
      "./app/assets/manual/user-photo-candidates/unrefined-kappa-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-01-crown-green", {
    artPath:
      "./app/assets/manual/user-photo-candidates/crown-series/crown-green-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-02-crown-pink", {
    artPath:
      "./app/assets/manual/user-photo-candidates/crown-series/crown-pink-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-03-crown-red", {
    artPath:
      "./app/assets/manual/user-photo-candidates/crown-series/crown-red-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-07-crown-yellow", {
    artPath:
      "./app/assets/manual/user-photo-candidates/crown-series/crown-yellow-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-08-crown-orange", {
    artPath:
      "./app/assets/manual/user-photo-candidates/crown-series/crown-orange-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-09-crown-silver", {
    artPath:
      "./app/assets/manual/user-photo-candidates/crown-series/crown-silver-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-10-cross-crown-blue", {
    artPath:
      "./app/assets/manual/user-photo-candidates/crown-series/cross-crown-blue-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-11-cross-crown-orange", {
    artPath:
      "./app/assets/manual/user-photo-candidates/crown-series/cross-crown-orange-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-16-cross-crown-light-blue", {
    artPath:
      "./app/assets/manual/user-photo-candidates/crown-series/cross-crown-light-blue-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-17-cross-crown-pink", {
    artPath:
      "./app/assets/manual/user-photo-candidates/crown-series/cross-crown-pink-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-18-heart-crown-red", {
    artPath:
      "./app/assets/manual/user-photo-candidates/crown-series/heart-crown-red-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-19-heart-crown-yellow", {
    artPath:
      "./app/assets/manual/user-photo-candidates/crown-series/heart-crown-yellow-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-77-09-crown", {
    artPath: "./app/assets/manual/user-photo-candidates/limited-crown-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-65-04-cabbage", {
    artPath:
      "./app/assets/manual/user-photo-candidates/special-color-2007/purple-cabbage-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-65-05-paprika-red", {
    artPath:
      "./app/assets/manual/user-photo-candidates/special-color-2007/red-pepper-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-65-09-paprika-yellow", {
    artPath:
      "./app/assets/manual/user-photo-candidates/special-color-2007/yellow-pepper-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-65-10-muscat", {
    artPath:
      "./app/assets/manual/user-photo-candidates/special-color-2007/green-muskat-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-65-01-elephant", {
    artPath:
      "./app/assets/manual/user-photo-candidates/special-color-2007/pink-elephant-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-64-09-sheep", {
    artPath:
      "./app/assets/manual/user-photo-candidates/special-color-2007/pink-sheep-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-65-02-lion", {
    artPath:
      "./app/assets/manual/user-photo-candidates/special-color-2007/green-lion-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-65-07-monkey", {
    artPath:
      "./app/assets/manual/user-photo-candidates/special-color-2007/white-monkey-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-65-03-tiger", {
    artPath:
      "./app/assets/manual/user-photo-candidates/special-color-2007/white-tiger-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-65-06-sheep", {
    artPath:
      "./app/assets/manual/user-photo-candidates/special-color-2007/white-pig-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-64-02-pig", {
    artPath:
      "./app/assets/manual/user-photo-candidates/special-color-2007/gold-pig-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-65-08-parakeet", {
    artPath:
      "./app/assets/manual/user-photo-candidates/special-color-2007/green-parakeet-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-04-groove-on", {
    artPath:
      "./app/assets/manual/user-photo-candidates/t-shirt-series/groove-on-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-05-what-s-up", {
    artPath:
      "./app/assets/manual/user-photo-candidates/t-shirt-series/whats-up-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-06-rejoice", {
    artPath:
      "./app/assets/manual/user-photo-candidates/t-shirt-series/rejoice-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-12-fun-to-be-with", {
    artPath:
      "./app/assets/manual/user-photo-candidates/t-shirt-series/fun-to-be-with-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-13-hug-me", {
    artPath:
      "./app/assets/manual/user-photo-candidates/t-shirt-series/hug-me-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-14-sorry-mom", {
    artPath:
      "./app/assets/manual/user-photo-candidates/t-shirt-series/sorry-mom-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-15-yummy", {
    artPath:
      "./app/assets/manual/user-photo-candidates/t-shirt-series/yummy-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-15a-go-for-it", {
    artPath:
      "./app/assets/manual/user-photo-candidates/t-shirt-series/go-for-it-candidate.png",
    artSource: "manual-upload",
    catalogSortSlot: 15.5,
  });

  assign("page-24-21-thanks", {
    artPath:
      "./app/assets/manual/user-photo-candidates/t-shirt-series/thanks-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-22-cha-cha-cha", {
    artPath:
      "./app/assets/manual/user-photo-candidates/t-shirt-series/cha-cha-cha-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-23-sos", {
    artPath:
      "./app/assets/manual/user-photo-candidates/t-shirt-series/sos-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-24-cry-for-joy", {
    artPath:
      "./app/assets/manual/user-photo-candidates/t-shirt-series/cry-for-joy-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-24-25-chu", {
    artPath:
      "./app/assets/manual/user-photo-candidates/t-shirt-series/chu-secret-candidate.png",
    artSource: "manual-upload",
    isSecret: true,
  });

  assign("page-74-17-good-luck", {
    artPath:
      "./app/assets/manual/user-photo-candidates/t-shirt-1300k/good-luck-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-74-18-it-s-ok", {
    artPath:
      "./app/assets/manual/user-photo-candidates/t-shirt-1300k/its-ok-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-74-19-i-m-genie", {
    artPath:
      "./app/assets/manual/user-photo-candidates/t-shirt-1300k/im-genie-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-74-20-dream-come-true", {
    artPath:
      "./app/assets/manual/user-photo-candidates/t-shirt-1300k/dream-come-true-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-74-21-try-again", {
    artPath:
      "./app/assets/manual/user-photo-candidates/t-shirt-1300k/try-again-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-74-22-free-your-style", {
    artPath:
      "./app/assets/manual/user-photo-candidates/t-shirt-1300k/free-your-style-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-42-11-spider", {
    artPath:
      "./app/assets/manual/user-photo-candidates/halloween-2016/spider-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-42-10-bat", {
    artPath:
      "./app/assets/manual/user-photo-candidates/halloween-2016/bat-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-42-08-witch", {
    artPath:
      "./app/assets/manual/user-photo-candidates/halloween-2016/witch-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-42-09-pumpkin", {
    artPath:
      "./app/assets/manual/user-photo-candidates/halloween-2016/pumpkin-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-92-01-rabbit", {
    artPath:
      "./app/assets/manual/user-photo-candidates/decoppin-animal-series-ver-1/rabbit-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-92-02-frog", {
    artPath:
      "./app/assets/manual/user-photo-candidates/decoppin-animal-series-ver-1/frog-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-92-03-cockerel", {
    artPath:
      "./app/assets/manual/user-photo-candidates/decoppin-animal-series-ver-1/cockerel-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-92-04-panda", {
    artPath:
      "./app/assets/manual/user-photo-candidates/decoppin-animal-series-ver-1/panda-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-92-05-koala", {
    artPath:
      "./app/assets/manual/user-photo-candidates/decoppin-animal-series-ver-1/koala-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-92-06-tiger", {
    artPath:
      "./app/assets/manual/user-photo-candidates/decoppin-animal-series-ver-1/tiger-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-92-07-elephant", {
    artPath:
      "./app/assets/manual/user-photo-candidates/decoppin-animal-series-ver-1/elephant-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-92-08-dalmation", {
    artPath:
      "./app/assets/manual/user-photo-candidates/decoppin-animal-series-ver-1/dalmatian-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-92-09-monkey", {
    artPath:
      "./app/assets/manual/user-photo-candidates/decoppin-animal-series-ver-1/monkey-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-92-10-cheetah", {
    artPath:
      "./app/assets/manual/user-photo-candidates/decoppin-animal-series-ver-1/cheetah-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-92-11-crocodile", {
    artPath:
      "./app/assets/manual/user-photo-candidates/decoppin-animal-series-ver-1/crocodile-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-92-12-lion", {
    artPath:
      "./app/assets/manual/user-photo-candidates/decoppin-animal-series-ver-1/lion-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-32-01-santa-claus", {
    artPath:
      "./app/assets/manual/user-photo-candidates/christmas-2012/santa-claus-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-32-02-reindeer", {
    artPath:
      "./app/assets/manual/user-photo-candidates/christmas-2012/reindeer-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-32-03-tree-cape", {
    artPath:
      "./app/assets/manual/user-photo-candidates/christmas-2012/tree-cape-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-32-04-christmas-cake", {
    artPath:
      "./app/assets/manual/user-photo-candidates/christmas-2012/christmas-cake-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-32-07-santa-claus", {
    artPath:
      "./app/assets/manual/user-photo-candidates/christmas-2011/santa-claus-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-32-08-snowman", {
    artPath:
      "./app/assets/manual/user-photo-candidates/christmas-2011/snowman-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-32-09-reindeer", {
    artPath:
      "./app/assets/manual/user-photo-candidates/christmas-2011/reindeer-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-32-17-santa-claus", {
    artPath:
      "./app/assets/manual/user-photo-candidates/christmas-2009/santa-claus-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-32-18-reindeer", {
    artPath:
      "./app/assets/manual/user-photo-candidates/christmas-2009/reindeer-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-32-19-angel", {
    artPath:
      "./app/assets/manual/user-photo-candidates/christmas-2009/angel-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-32-20-santa-claus", {
    artPath:
      "./app/assets/manual/user-photo-candidates/christmas-2009/secret-santa-candidate.png",
    artSource: "manual-upload",
    isSecret: true,
  });

  assign("page-32-21-santa-claus", {
    artPath:
      "./app/assets/manual/user-photo-candidates/christmas-2008/santa-claus-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-32-22-snowman", {
    artPath:
      "./app/assets/manual/user-photo-candidates/christmas-2008/snowman-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-32-23-christmas-cone", {
    artPath:
      "./app/assets/manual/user-photo-candidates/christmas-2008/christmas-cone-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-32-24-bell", {
    artPath:
      "./app/assets/manual/user-photo-candidates/christmas-2008/bell-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-32-25-santa-claus", {
    artPath:
      "./app/assets/manual/user-photo-candidates/christmas-2008/secret-santa-candidate.png",
    artSource: "manual-upload",
    isSecret: true,
  });

  assign("page-40-02-chocolate", {
    artPath:
      "./app/assets/manual/user-photo-candidates/valentines-2009/love-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-40-05-taf", {
    artPath:
      "./app/assets/manual/user-photo-candidates/valentines-2009/you-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-40-21-white", {
    artPath:
      "./app/assets/manual/user-photo-candidates/valentines-2009/bitter-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-40-22-milic", {
    artPath:
      "./app/assets/manual/user-photo-candidates/valentines-2009/milky-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-40-23-white-chocolate", {
    artPath:
      "./app/assets/manual/user-photo-candidates/valentines-2009/cupcake-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-40-20-extra-hitter-cheestate", {
    artPath:
      "./app/assets/manual/user-photo-candidates/valentines-2009/donut-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-40-13-burry-designs-with", {
    artPath:
      "./app/assets/manual/user-photo-candidates/valentines-2009/strawberry-secret-candidate.png",
    artSource: "manual-upload",
    isSecret: true,
  });

  assign("page-40-39-rabbit-strawberry-chocolate-2014", {
    artPath:
      "./app/assets/manual/user-photo-candidates/easter-2014/rabbit-strawberry-chocolate-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-40-41-rabbit-milk-chocolate-2014", {
    artPath:
      "./app/assets/manual/user-photo-candidates/easter-2014/rabbit-milk-chocolate-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-40-40-rabbit-white-chocolate-2014", {
    artPath:
      "./app/assets/manual/user-photo-candidates/easter-2014/rabbit-white-chocolate-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-40-42-elephant-white-chocolate-2014", {
    artPath:
      "./app/assets/manual/user-photo-candidates/easter-2014/elephant-white-chocolate-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-40-43-koala-bitter-chocolate-2014", {
    artPath:
      "./app/assets/manual/user-photo-candidates/easter-2014/koala-bitter-chocolate-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-40-44-cockerel-strawberry-chocolate-2014", {
    artPath:
      "./app/assets/manual/user-photo-candidates/easter-2014/cockerel-strawberry-chocolate-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-32-13-santa-claus", {
    artPath:
      "./app/assets/manual/user-photo-candidates/christmas-2010/santa-1-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-32-14-reindeer", {
    artPath:
      "./app/assets/manual/user-photo-candidates/christmas-2010/reindeer-1-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-32-15-santa-claus", {
    artPath:
      "./app/assets/manual/user-photo-candidates/christmas-2010/santa-2-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-32-16-reindeer", {
    artPath:
      "./app/assets/manual/user-photo-candidates/christmas-2010/reindeer-2-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-73-01-uribou-blue", {
    artPath:
      "./app/assets/manual/user-photo-candidates/limited-b/francfranc-uribou-blue-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-73-02-uribou-green", {
    artPath:
      "./app/assets/manual/user-photo-candidates/limited-b/francfranc-uribou-green-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-73-03-uribou-pink", {
    artPath:
      "./app/assets/manual/user-photo-candidates/limited-b/francfranc-uribou-pink-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-73-04-uribou-red", {
    artPath:
      "./app/assets/manual/user-photo-candidates/limited-b/francfranc-uribou-red-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-73-05-uribou-white", {
    artPath:
      "./app/assets/manual/user-photo-candidates/limited-b/francfranc-uribou-white-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-73-06-mouse-red", {
    artPath:
      "./app/assets/manual/user-photo-candidates/limited-b/francfranc-mouse-red-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-73-07-mouse-white", {
    artPath:
      "./app/assets/manual/user-photo-candidates/limited-b/francfranc-mouse-white-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-73-08-mouse-gold", {
    artPath:
      "./app/assets/manual/user-photo-candidates/limited-b/francfranc-mouse-gold-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-77-06-marchand-de-legumes", {
    artPath:
      "./app/assets/manual/user-photo-candidates/limited-b/marchand-de-legumes-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-77-05-cow-gold", {
    artPath:
      "./app/assets/manual/user-photo-candidates/limited-b/cow-gold-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-77-01-normal", {
    artPath:
      "./app/assets/manual/user-photo-candidates/limited-b/normal-black-doll-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-77-07-rabbit-blue", {
    artPath:
      "./app/assets/manual/user-photo-candidates/limited/rabbit-blue-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-77-08-rabbit-white", {
    artPath:
      "./app/assets/manual/user-photo-candidates/limited/rabbit-white-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-74-01-jet-7th-anniversary", {
    artPath:
      "./app/assets/manual/user-photo-candidates/limited-b/jet-7th-anniversary-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-73-09-santa-claus", {
    artPath:
      "./app/assets/manual/user-photo-candidates/christmas-2007/francfranc-xmas-pink-santa-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-73-10-reindeer", {
    artPath:
      "./app/assets/manual/user-photo-candidates/christmas-2007/francfranc-xmas-brown-reindeer-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-73-11-santa-claus", {
    artPath:
      "./app/assets/manual/user-photo-candidates/christmas-2007/francfranc-xmas-gray-santa-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-73-12-reindeer", {
    artPath:
      "./app/assets/manual/user-photo-candidates/christmas-2007/francfranc-xmas-gray-reindeer-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-43-01-mummy", {
    artPath:
      "./app/assets/manual/user-photo-candidates/halloween-2012/mummy-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-43-02-pumpkin", {
    artPath:
      "./app/assets/manual/user-photo-candidates/halloween-2012/pumpkin-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-43-03-witch", {
    artPath:
      "./app/assets/manual/user-photo-candidates/halloween-2012/witch-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-43-04-vampire", {
    artPath:
      "./app/assets/manual/user-photo-candidates/halloween-2012/vampire-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-70-21-blowfish", {
    artPath:
      "./app/assets/manual/user-photo-candidates/exception-living-sea-blue/exception-blowfish-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-70-22-seahorse", {
    artPath:
      "./app/assets/manual/user-photo-candidates/exception-living-sea-blue/exception-seahorse-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-70-23-whale", {
    artPath:
      "./app/assets/manual/user-photo-candidates/exception-living-sea-blue/exception-whale-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-70-10-bed", {
    artPath:
      "./app/assets/manual/user-photo-candidates/dashin-socks-child-of-the-stars/bed-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-70-11-flamingo", {
    artPath:
      "./app/assets/manual/user-photo-candidates/dashin-socks-child-of-the-stars/flamingo-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-70-13-fruit-dish", {
    artPath:
      "./app/assets/manual/user-photo-candidates/dashin-socks-child-of-the-stars/fruit-dish-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-70-12-my-kitty", {
    artPath:
      "./app/assets/manual/user-photo-candidates/dashin-socks-child-of-the-stars/my-kitty-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-53-09-circus-tent", {
    artPath:
      "./app/assets/manual/user-photo-candidates/circus-series/circus-tent-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-53-10-elephant", {
    artPath:
      "./app/assets/manual/user-photo-candidates/circus-series/elephant-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-53-13-ringmaster", {
    artPath:
      "./app/assets/manual/user-photo-candidates/circus-series/ringmaster-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-53-14-lion", {
    artPath:
      "./app/assets/manual/user-photo-candidates/circus-series/lion-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-53-11-clown", {
    artPath:
      "./app/assets/manual/user-photo-candidates/circus-series/clown-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-53-12-bear", {
    artPath:
      "./app/assets/manual/user-photo-candidates/circus-series/bear-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-53-15-silk-hat-rabbit", {
    artPath:
      "./app/assets/manual/user-photo-candidates/circus-series/silk-hat-rabbit-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-72-06-rabbit", {
    artPath:
      "./app/assets/manual/user-photo-candidates/nylon-15th-anniversary/nylon-rabbit-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-72-07-monkey", {
    artPath:
      "./app/assets/manual/user-photo-candidates/nylon-15th-anniversary/nylon-monkey-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-23-05-cloudy", {
    artPath:
      "./app/assets/manual/user-photo-candidates/sky-color-series/cloudy-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-23-06-rainbow", {
    artPath:
      "./app/assets/manual/user-photo-candidates/sky-color-series/rainbow-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-23-07-rainy", {
    artPath:
      "./app/assets/manual/user-photo-candidates/sky-color-series/rainy-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-23-13-sunny", {
    artPath:
      "./app/assets/manual/user-photo-candidates/sky-color-series/sunny-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-23-12-snowy", {
    artPath:
      "./app/assets/manual/user-photo-candidates/sky-color-series/snowy-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-23-08-thunder", {
    artPath:
      "./app/assets/manual/user-photo-candidates/sky-color-series/thunder-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-34-09-santa-claus", {
    artPath:
      "./app/assets/manual/user-photo-candidates/christmas-2006/santa-claus-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-34-10-reindeer", {
    artPath:
      "./app/assets/manual/user-photo-candidates/christmas-2006/reindeer-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-34-05-santa-claus", {
    artPath:
      "./app/assets/manual/user-photo-candidates/christmas-2007/francfranc-xmas-pink-santa-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-34-06-reindeer", {
    artPath:
      "./app/assets/manual/user-photo-candidates/christmas-2007/francfranc-xmas-brown-reindeer-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-34-07-santa-claus", {
    artPath:
      "./app/assets/manual/user-photo-candidates/christmas-2007/francfranc-xmas-gray-santa-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-34-08-reindeer", {
    artPath:
      "./app/assets/manual/user-photo-candidates/christmas-2007/francfranc-xmas-gray-reindeer-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-83-04-normal-2006", {
    artPath:
      "./app/assets/manual/user-photo-candidates/new-year-card-figures/normal-2006-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-83-03-uribou-2007", {
    artPath:
      "./app/assets/manual/user-photo-candidates/new-year-card-figures/uribou-2007-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-83-02-mouse-2008", {
    artPath:
      "./app/assets/manual/user-photo-candidates/new-year-card-figures/mouse-2008-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-83-01-cow-2009", {
    artPath:
      "./app/assets/manual/user-photo-candidates/new-year-card-figures/cow-2009-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-82-09-tiger-2010-usa", {
    artPath:
      "./app/assets/manual/user-photo-candidates/new-year-card-figures/tiger-2010-usa-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-82-11-tiger-2010", {
    artPath:
      "./app/assets/manual/user-photo-candidates/new-year-card-figures/tiger-2010-japan-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-82-10-rabbit-2011", {
    artPath:
      "./app/assets/manual/user-photo-candidates/new-year-card-figures/rabbit-2011-candidate.png",
    artSource: "manual-upload",
  });

  assign("page-82-08-dragon-2012", {
    artPath:
      "./app/assets/manual/user-photo-candidates/new-year-card-figures/dragon-2012-candidate.png",
    artSource: "manual-upload",
  });

  // User-supplied Easter photos, extracted locally without generating figure pixels.
  Object.entries({
    "page-40-24-easter-bunny-2017": "2017-easter-bunny",
    "page-40-25-egg-bonnet-2017": "2017-egg-bonnet",
    "page-40-26-easter-lamb-2017": "2017-easter-lamb",
    "page-40-27-clover-field-2017": "2017-clover-field",
    "page-40-29-egg-bonnet-secret-2017": "2017-egg-bonnet-secret",
    "page-40-30-bunny-robby-angel-2017": "2017-bunny-robby-angel",
    "page-39-11-easter-lamb": "2018-easter-lamb",
    "page-39-22-hatched-egg": "2018-hatched-egg",
    "page-40-15-koala-bunny": "2018-easter-cow",
    "page-39-08-easter-bunny": "2018-easter-bunny",
    "page-40-18-robhy-hot-angel": "2018-paint-robby-angel",
    "page-39-09-hoiched-eada": "2018-hatched-egg-secret",
  }).forEach(([id, filename]) => {
    assign(id, {
      artPath: `./app/assets/manual/easter-user-sources/${filename}.png`,
      artSource: "manual-upload",
    });
  });

  // User-supplied Valentine's Day 2015 photos, processed with local masks.
  Object.entries({
    "page-38-22-strawberry-chocolate": "strawberry-chocolate",
    "page-38-23-white-chocolate": "white-chocolate",
    "page-38-24-bitter-chocolate": "bitter-chocolate",
    "page-38-25-milk-chocolate": "milk-chocolate",
    "page-38-26-mint-chocolate": "mint-chocolate-secret",
    "page-38-27-mint-chocolate": "mint-chocolate-secret",
    "page-38-28-mint-chocolate-robby-angel": "mint-chocolate-robby-angel",
  }).forEach(([id, filename]) => {
    assign(id, {
      artPath: `./app/assets/manual/valentine-2015-user-sources/${filename}.png`,
      artSource: "manual-upload",
    });
  });

  // User-supplied Christmas 2015 regular and secret photos, extracted locally.
  Object.entries({
    "page-33-08-santa-claus": "santa-claus",
    "page-33-09-reindeer": "reindeer",
    "page-33-10-christmas-tree": "christmas-tree",
    "page-33-11-christmas-candle": "christmas-candle",
    "page-33-12-santa-claus": "santa-claus-secret",
    "page-33-13-reindeer": "reindeer-secret",
    "page-33-14-white-snow-robby-angel": "white-snow-robby-angel",
  }).forEach(([id, filename]) => {
    assign(id, {
      artPath: `./app/assets/manual/christmas-2015-user-sources/${filename}.png`,
      artSource: "manual-upload",
    });
  });

  // User-supplied Christmas 2014 regular and blue secret photo cutouts.
  Object.entries({
    "page-33-15-santa-claus": "santa-claus",
    "page-33-16-reindeer": "reindeer",
    "page-33-17-chocolate-cake": "chocolate-cake",
    "page-33-18-poinsettia": "poinsettia",
    "page-33-19-santa-claus": "santa-claus-secret",
    "page-33-20-reindeer": "reindeer-secret",
    "page-33-21-blue-snow-robby-angel": "blue-snow-robby-angel",
  }).forEach(([id, filename]) => {
    assign(id, {
      artPath: `./app/assets/manual/christmas-2014-user-sources/${filename}.png`,
      artSource: "manual-upload",
    });
  });

  // User-supplied Christmas 2013 front views and pink secret variants.
  Object.entries({
    "page-33-22-santa-claus": "santa-claus",
    "page-33-23-snowman": "snowman",
    "page-33-24-reindeer": "reindeer",
    "page-33-25-gingerbread-man": "gingerbread-man",
    "page-33-26-santa-claus": "santa-claus-secret",
    "page-33-27-reindeer": "reindeer-secret",
  }).forEach(([id, filename]) => {
    assign(id, {
      artPath: `./app/assets/manual/christmas-2013-user-sources/${filename}.png`,
      artSource: "manual-upload",
    });
  });

  // MODI Beauty Flowers: user-supplied B E A U T Y lineup, extracted locally.
  Object.entries({
    "page-72-08-cheery-blossom": "cherry-blossom-b",
    "page-72-09-cactus": "cactus-e",
    "page-72-10-rose": "rose-a",
    "page-72-11-carnation": "carnation-u",
    "page-72-12-morning-glory": "morning-glory-t",
    "page-72-13-lily-bell": "lily-bell-y",
  }).forEach(([id, filename]) => {
    assign(id, {
      artPath: `./app/assets/manual/modi-beauty-flowers-user-sources/${filename}.png`,
      artSource: "manual-upload",
    });
  });

  // User-supplied Halloween 2015 lineup and green secret variants.
  Object.entries({
    "page-42-15-vampire": "vampire",
    "page-42-16-werewolf": "werewolf",
    "page-42-17-pumpkin-cat": "pumpkin-cat",
    "page-42-18-skeleton": "skeleton",
    "page-42-19-vampire": "vampire-secret",
    "page-42-20-skeleton": "skeleton-secret",
  }).forEach(([id, filename]) => {
    assign(id, {
      artPath: `./app/assets/manual/halloween-2015-user-sources/${filename}.png`,
      artSource: "manual-upload",
      isSecret: id === "page-42-19-vampire" || id === "page-42-20-skeleton",
    });
  });

  // User-supplied Halloween 2007 regular and gold secret photo cutouts.
  Object.entries({
    "page-43-05-pumpkin": "pumpkin",
    "page-43-06-ghost": "ghost",
    "page-43-07-pumpkin": "pumpkin-gold-secret",
    "page-43-08-ghost": "ghost-gold-secret",
  }).forEach(([id, filename]) => {
    assign(id, {
      artPath: `./app/assets/manual/halloween-2007-user-sources/${filename}.png`,
      artSource: "manual-upload",
    });
  });

  // User-supplied Animal Series Ver. 3 Special Color lineup, extracted locally.
  Object.entries({
    "page-64-14-french-bulldog": "french-bulldog",
    "page-64-15-duckbill": "duckbill",
    "page-64-16-lop-ear-rabbit": "lop-ear-rabbit",
    "page-64-17-owl": "owl",
    "page-64-18-hippopotamus": "hippopotamus",
    "page-64-19-zebra": "zebra",
    "page-64-20-alpaca": "alpaca",
    "page-64-21-buffalo": "buffalo",
    "page-64-22-american-shorthair": "american-shorthair",
    "page-64-23-gorilla": "gorilla",
    "page-64-24-chameleon": "chameleon",
    "page-64-25-parrot": "parrot",
  }).forEach(([id, filename]) => {
    assign(id, {
      artPath: `./app/assets/manual/special-color-v3-user-sources/${filename}.png`,
      artSource: "manual-upload",
    });
  });

  // User-supplied partial Animal Series Ver. 2 Special Color lineup.
  Object.entries({
    "page-64-01-fawn": "fawn",
    "page-64-02-pig": "pig",
    "page-64-03-lesser-panda": "lesser-panda",
    "page-64-07-uribou": "uribou",
    "page-64-08-giraffe": "giraffe",
    "page-64-09-sheep": "sheep",
  }).forEach(([id, filename]) => {
    assign(id, {
      artPath: `./app/assets/manual/special-color-v2-user-sources/${filename}.png`,
      artSource: "manual-upload",
    });
  });

  // Supplied Chinoiserie lineup and lantern secrets, extracted locally.
  Object.entries({
    "page-62-01-porcelain-monkey": "porcelain-monkey",
    "page-62-02-kite-cockerel": "kite-cockerel",
    "page-62-03-tiger-like-cap": "tiger-like-cap",
    "page-62-04-peking-opera-peacock": "peking-opera-peacock",
    "page-62-05-chinese-panda": "chinese-panda",
    "page-62-06-paper-cutting-rabbit": "paper-cutting-rabbit",
    "page-62-07-lantern-dragon": "lantern-dragon-secret",
    "page-62-08-lantern-robby-angel": "lantern-robby-angel",
  }).forEach(([id, filename]) => {
    assign(id, {
      artPath: `./app/assets/manual/chinoiserie-user-sources/${filename}.png`,
      artSource: "manual-upload",
    });
  });

  // Supplied Summer 2018 regular lineup, extracted locally.
  Object.entries({
    "page-48-01-blue-pants": "blue-pants",
    "page-48-02-green-pants": "green-pants",
    "page-48-03-light-blue-pants": "light-blue-pants",
    "page-48-04-pink-pants": "pink-pants",
    "page-48-05-green-t-shirt": "green-t-shirt",
    "page-48-06-pink-t-shirt": "pink-t-shirt",
    "page-48-07-light-blue-t-shirt": "light-blue-t-shirt",
    "page-48-08-orange-t-shirt": "orange-t-shirt",
    "page-48-09-gray-pants": "gray-pants",
    "page-48-10-purple-pants": "purple-pants",
    "page-48-11-sailor": "sailor-secret",
    "page-48-12-ocean-robby-angel": "ocean-robby-angel",
    "page-48-13-yellow-t-shirt": "yellow-t-shirt",
    "page-48-14-blue-t-shirt": "blue-t-shirt",
  }).forEach(([id, filename]) => {
    assign(id, {
      artPath: `./app/assets/manual/summer-2018-user-sources/${filename}.png`,
      artSource: "manual-upload",
    });
  });

  // Supplied Animal Ver. 1 Special Color lineup and pink Chipmunk secret.
  Object.entries({
    "page-63-09-cheetah": "cheetah",
    "page-63-10-cockerel": "cockerel",
    "page-63-11-elephant": "elephant",
    "page-63-12-panda": "panda",
    "page-63-13-monkey": "monkey",
    "page-63-14-tiger": "tiger",
    "page-63-15-crocodile": "crocodile",
    "page-63-16-koala": "koala",
    "page-63-17-dalmatian": "dalmatian",
    "page-63-18-frog": "frog",
    "page-63-19-rabbit": "rabbit",
    "page-63-20-lion": "lion",
    "page-63-21-chipmunk": "chipmunk-secret",
  }).forEach(([id, filename]) => {
    assign(id, {
      artPath: `./app/assets/manual/special-color-v1-user-sources/${filename}.png`,
      artSource: "manual-upload",
    });
  });
  assign("page-63-21-chipmunk", { isSecret: true });

  // Supplied ISETAN Display Special Color lineup, extracted locally.
  Object.entries({
    "page-65-16-rose-purple": "rose-purple",
    "page-65-17-morning-glory-pink": "morning-glory-pink",
    "page-65-18-morning-glory-purple": "morning-glory-purple",
    "page-65-19-starfish-light-blue": "starfish-light-blue",
    "page-65-20-starfish-blue": "starfish-blue",
    "page-65-21-starfish-dark-blue": "starfish-dark-blue",
    "page-65-22-elephant-light-green": "elephant-light-green",
    "page-65-23-elephant-green": "elephant-green",
    "page-65-24-owl-orange": "owl-orange",
    "page-65-25-owl-orange-wink": "owl-orange-wink",
    "page-65-26-acorn-yellow": "acorn-yellow",
    "page-65-27-acorn-orange": "acorn-orange",
    "page-65-28-acorn-red": "acorn-red",
    "page-65-29-reindeer-green": "reindeer-green",
    "page-65-30-reindeer-white": "reindeer-white",
  }).forEach(([id, filename]) => {
    assign(id, {
      artPath: `./app/assets/manual/isetan-user-sources/${filename}.png`,
      artSource: "manual-upload",
    });
  });

  // Supplied SAPPINESS Love Yourself 2023 and Key Chain 2021 photos.
  Object.entries({
    "page-59-01-dazzling-color": "dazzling-color",
    "page-59-02-red": "red",
    "page-59-03-sappiness-red-rabbit": "red-rabbit",
    "page-59-04-sappiness-white-rabbit": "white-rabbit",
    "page-59-05-sappiness-gift-cat": "gift-cat",
  }).forEach(([id, filename]) => {
    assign(id, {
      artPath: `./app/assets/manual/sappiness-user-sources/${filename}.png`,
      artSource: "manual-upload",
    });
  });

  // Supplied Live-Eye Doll costumes, matched by release year and outfit.
  Object.entries({
    "page-88-01-rabbit-style": "rabbit-2006",
    "page-88-02-frog-style": "frog-2006",
    "page-88-03-panda-style": "panda-2007",
    "page-88-04-mouse-style": "mouse-2007",
    "page-88-05-pig-style": "pig-2008",
    "page-88-06-tiger-style": "tiger-2008",
    "page-88-07-cow-style": "cow-2008",
    "page-88-08-bee-style": "bee-2009",
    "page-88-09-panda-style": "panda-2009",
    "page-88-10-ladybug-style": "ladybug-2009",
    "page-88-11-kangaroo-style": "kangaroo-2009",
    "page-88-12-tiger-style": "tiger-2009",
    "page-88-13-rabbit-style": "rabbit-white-2010",
    "page-88-14-rabbit-style-pink": "rabbit-pink-2010",
    "page-88-15-butterfly-style": "butterfly-2013",
  }).forEach(([id, filename]) => {
    assign(id, {
      artPath: `./app/assets/manual/live-eye-doll-user-sources/${filename}.png`,
      artSource: "manual-upload",
    });
  });

  // Supplied NYLON 10th Anniversary lineup, extracted locally.
  Object.entries({
    "page-72-01-rabbit": "rabbit",
    "page-72-02-cheetah": "cheetah",
    "page-72-03-frog": "frog",
    "page-72-04-dalmatian": "dalmatian",
    "page-72-05-elephant": "elephant",
  }).forEach(([id, filename]) => {
    assign(id, {
      artPath: `./app/assets/manual/nylon-user-sources/${filename}.png`,
      artSource: "manual-upload",
    });
  });

  // Supplied Collector's Trophy photos, including original pedestals.
  Object.entries({
    "page-87-01-collector-s-trophy-rabbit-white": "rabbit-white",
    "page-87-02-collector-s-trophy-rabbit-pink": "rabbit-pink",
    "page-87-03-authorized-dealer-s-trophy-rabbit-gold": "dealer-rabbit-gold",
    "page-87-04-authorized-dealer-s-trophy-rabbit-pink": "dealer-rabbit-pink",
    "page-87-05-collector-s-trophy-robby-angel-blue": "robby-blue",
    "page-87-06-collector-s-trophy-robby-angel-pink": "robby-pink",
    "page-87-07-collector-s-trophy-robby-angel-violet": "robby-violet",
    "page-87-08-collector-s-trophy-robby-angel-gold": "robby-gold",
    "page-87-09-collector-s-trophy-rabbit-blue": "rabbit-blue",
    "page-87-10-collector-s-trophy-elephant-blue": "elephant-blue",
    "page-87-11-collector-s-trophy-18th-anniversary": "18th-anniversary",
    "page-87-12-collector-s-trophy-lucky-cat-l-size": "lucky-cat-large",
    "page-87-13-collector-s-trophy-lucky-cat-s-size": "lucky-cat-small",
  }).forEach(([id, filename]) => {
    assign(id, {
      artPath: `./app/assets/manual/collectors-trophy-user-sources/${filename}.png`,
      artSource: "manual-upload",
    });
  });

  // Canonical Easter 2018 grouping: four regulars and three distinct secrets.
  [
    "page-39-08-easter-bunny",
    "page-39-22-hatched-egg",
    "page-40-15-koala-bunny",
    "page-39-11-easter-lamb",
    "page-39-21-easter-bunny",
    "page-39-09-hoiched-eada",
    "page-40-18-robhy-hot-angel",
  ].forEach((id) => assign(id, {
    series: "Easter Series 2018",
    displaySeries: "Easter Series 2018",
  }));
  assign("page-39-21-easter-bunny", {
    artPath: "./app/assets/manual/easter-2018-secrets-user-sources/easter-bunny-secret.png",
    artSource: "manual-upload",
    isSecret: true,
  });
  assign("page-40-18-robhy-hot-angel", { isSecret: true });

  // OCR text fragments and duplicate page-40 crops, not additional 2018 figures.
  // Keep source IDs/data intact so existing backups remain recoverable.
  [
    "page-40-01-robby-angel-eog",
    "page-40-12-easter-agg",
    "page-40-09-by-decorated-easter",
    "page-40-19-rabbit",
    "page-40-17-easter-bunny",
    "page-40-16-easter",
  ].forEach((id) => assign(id, { excludeFromCatalog: true }));

  // Correct a mislabeled cow asset and use the supplied Golden Cheetah secret.
  assign("page-39-10-easter-cow", {
    artPath: "./app/assets/manual/valentine-2013-user-sources/bitter-chocolate-cow.png",
    artSource: "manual-upload",
  });
  assign("page-39-13-cats", {
    artPath: "./app/assets/manual/valentine-2013-user-sources/golden-cheetah-secret.png",
    artSource: "manual-upload",
    isSecret: true,
  });

  // Verified Easter 2016 lineup: four regulars and three secrets.
  Object.entries({
    "page-40-31-easter-bunny-2016": "easter-bunny",
    "page-40-32-easter-chick-2016": "easter-chick",
    "page-40-33-easter-egg-2016": "easter-egg",
    "page-40-34-easter-lily-2016": "easter-lily",
    "page-40-35-easter-bunny-secret-2016": "easter-bunny-secret",
    "page-40-36-easter-egg-secret-2016": "easter-egg-secret",
    "page-40-38-robby-angel-2016": "egg-hat-robby-angel",
  }).forEach(([id, filename]) => {
    assign(id, {
      artPath: `./app/assets/manual/easter-2016-user-sources/${filename}.png`,
      artSource: "manual-upload",
      displaySeries: "Easter Series 2016",
    });
  });
  assign("page-40-38-robby-angel-2016", {
    name: "Egg Hat Robby Angel",
    isSecret: true,
    isRobby: true,
  });
  // Egg Hat and Robby Angel were split from one figure's multiline caption.
  assign("page-40-37-egg-hat-2016", { excludeFromCatalog: true });

  // Supplied Halloween 2018 regulars and pastel secrets.
  Object.entries({
    "page-42-01-pumpkin": "pumpkin",
    "page-42-02-witch": "witch",
    "page-42-03-ghost": "ghost",
    "page-42-04-owl": "owl",
    "page-42-05-witch": "witch-secret",
    "page-42-06-ghost": "ghost-secret",
    "page-42-07-dreamy-robby-angel": "dreamy-robby-angel",
  }).forEach(([id, filename]) => {
    assign(id, {
      artPath: `./app/assets/manual/halloween-2018-user-sources/${filename}.png`,
      artSource: "manual-upload",
      displaySeries: "Halloween Series 2018",
    });
  });
  assign("page-42-07-dreamy-robby-angel", { isSecret: true, isRobby: true });

  // Halloween 2021 additional secret colors, verified against supplied lineup.
  Object.entries({
    "page-41-08-rabbit-pumpkin-purple": "rabbit-pumpkin-purple",
    "page-41-09-rabbit-pumpkin-green": "rabbit-pumpkin-green",
    "page-41-14-rabbit-pumpkin-pink": "rabbit-pumpkin-pink",
    "page-41-11-pumpkin-pants-robby-angel-purple": "robby-purple",
    "page-41-12-pumpkin-pants-robby-angel-green": "robby-green",
    "page-41-13-pumpkin-pants-robby-angel-pink": "robby-pink",
  }).forEach(([id, filename]) => {
    assign(id, {
      artPath: `./app/assets/manual/halloween-2021-variants-user-sources/${filename}.png`,
      artSource: "manual-upload",
      displaySeries: "Halloween Series 2021 Additional Secret",
      isSecret: true,
    });
  });

  // Supplied Halloween 2014 regular and pale secret variants.
  Object.entries({
    "page-42-22-ghost": "ghost",
    "page-42-23-witch": "witch",
    "page-42-24-pumpkin": "pumpkin",
    "page-42-25-cat": "cat",
    "page-42-26-ghost": "ghost-secret",
    "page-42-27-witch": "witch-secret",
    "page-42-28-pumpkin-robby-angel": "pumpkin-robby-angel",
  }).forEach(([id, filename]) => {
    assign(id, {
      artPath: `./app/assets/manual/halloween-2014-user-sources/${filename}.png`,
      artSource: "manual-upload",
      displaySeries: "Halloween Series 2014",
    });
  });
  assign("page-42-28-pumpkin-robby-angel", { isSecret: true, isRobby: true });

  // Supplied Cherry Blossom Spring, Night, and original lineups.
  Object.entries({
    "page-45-01-calico-cat": "spring-calico-cat",
    "page-45-02-rabbit": "spring-rabbit",
    "page-45-03-goat": "spring-goat",
    "page-45-04-peacock": "spring-peacock",
    "page-45-05-cherry": "spring-cherry-secret",
    "page-45-06-cherry-robby-angel": "spring-cherry-robby-angel",
    "page-45-07-calico-cat": "night-calico-cat",
    "page-45-08-rabbit": "night-rabbit",
    "page-45-09-goat": "night-goat",
    "page-45-10-peacock": "night-peacock",
    "page-45-11-cherry": "night-cherry-secret",
    "page-45-12-cherry-robby-angel": "night-cherry-robby-angel",
    "page-45-13-calico-cat": "original-calico-cat",
    "page-45-14-rabbit": "original-rabbit",
    "page-45-15-goat": "original-goat",
    "page-45-16-peacock": "original-peacock",
    "page-45-17-cherry": "original-cherry-secret",
    "page-45-18-cherry-robby-angel": "original-cherry-robby-angel",
  }).forEach(([id, filename]) => {
    assign(id, {
      artPath: `./app/assets/manual/cherry-blossom-user-sources/${filename}.png`,
      artSource: "manual-upload",
    });
  });
  assign("page-45-05-cherry", { isSecret: true });
  assign("page-45-06-cherry-robby-angel", { isSecret: true });
  assign("page-45-11-cherry", { isSecret: true });
  assign("page-45-12-cherry-robby-angel", { isSecret: true });
  assign("page-45-17-cherry", { isSecret: true });
  assign("page-45-18-cherry-robby-angel", { isSecret: true });

  // Supplied Halloween 2021 orange Rabbit, 2016 secrets, and 2015 Skeleton Robby.
  Object.entries({
    "page-41-07-rabbit-pumpkin-orange": "rabbit-pumpkin-orange-2021",
    "page-42-12-witch": "witch-secret-2016",
    "page-42-13-pumpkin": "pumpkin-secret-2016",
    "page-42-14-zombie-robby-angel": "zombie-robby-2016",
    "page-42-21-skeleton-robby-angel": "skeleton-robby-2015",
  }).forEach(([id, filename]) => {
    assign(id, {
      artPath: `./app/assets/manual/halloween-secret-fixes-user-sources/${filename}.png`,
      artSource: "manual-upload",
      isSecret: true,
    });
  });

  // Verified supplied Valentine, Shenzhen, and Chocolate variants.
  Object.entries({
    "page-37-13-chocolate-toy-poodle": "toy-poodle-secret",
    "page-37-14-chocolate-robby-angel": "chocolate-robby",
    "page-76-16-gold-love-robby-angel": "gold-love",
    "page-76-17-red-rose-robby-angel": "red-rose",
    "page-76-18-pink-love-robby-angel": "pink-love",
    "page-76-19-white-rose-robby-angel": "white-rose",
    "page-76-20-purple-love-robby-angel": "purple-love",
    "page-38-27-mint-chocolate": "mint-chocolate-milk-secret",
    "page-38-14-plushie-angel-robby-angel": "plushie-angel-robby",
    "page-38-15-orange-chocolate": "orange-chocolate",
    "page-38-16-strawberry-chocolate": "strawberry-chocolate",
    "page-38-17-kiwi-chocolate": "kiwi-chocolate",
    "page-38-18-berrys-chocolate": "berrys-chocolate",
    "page-38-19-orange-chocolate": "orange-chocolate-secret",
    "page-38-20-kiwi-chocolate": "kiwi-chocolate-secret",
    "page-38-21-cherry-chocolate-robby-angel": "cherry-chocolate-robby"
}).forEach(([id, filename]) => {
    assign(id, {
      artPath: `./app/assets/manual/valentine-mixed-user-sources/${filename}.png`,
      artSource: "manual-upload",
    });
  });
  assign("page-37-13-chocolate-toy-poodle", { isSecret: true });
  assign("page-37-14-chocolate-robby-angel", { isSecret: true });
  assign("page-38-27-mint-chocolate", { isSecret: true });
  assign("page-38-14-plushie-angel-robby-angel", { isSecret: true });
  assign("page-38-19-orange-chocolate", { isSecret: true });
  assign("page-38-20-kiwi-chocolate", { isSecret: true });
  assign("page-38-21-cherry-chocolate-robby-angel", { isSecret: true });

  // Supplied Valentine 2018 secrets and complete Easter 2012 lineup.
  Object.entries({
    "page-38-05-single-rose": "single-rose-secret",
    "page-38-06-rose-bouquet": "rose-bouquet-secret",
    "page-38-07-rose-robby-angel": "rose-robby-angel",
    "page-40-45-rabbit-bitter-chocolate-2012": "rabbit-bitter-chocolate",
    "page-40-46-rabbit-extra-bitter-chocolate-2012": "rabbit-extra-bitter-chocolate",
    "page-40-47-rabbit-white-chocolate-2012": "rabbit-white-chocolate",
    "page-40-48-elephant-milk-chocolate-2012": "elephant-milk-chocolate",
    "page-40-49-koala-strawberry-chocolate-2012": "koala-strawberry-chocolate",
    "page-40-50-cockerel-white-chocolate-2012": "cockerel-white-chocolate",
  }).forEach(([id, filename]) => {
    assign(id, {
      artPath: `./app/assets/manual/valentine2018-easter2012-user-sources/${filename}.png`,
      artSource: "manual-upload",
    });
  });
  assign("page-38-07-rose-robby-angel", { isSecret: true, isRobby: true });

  // Supplied Christmas secrets across seven years; Rocking Horse is regular.
  Object.entries({
    "page-30-18-santa-s-helper-mouse": "2021-helper-mouse",
    "page-30-19-santa-s-helper-robby-angel": "2021-helper-robby",
    "page-31-07-angel": "2020-angel",
    "page-31-08-angel-robby-angel": "2020-angel-robby",
    "page-31-20-wool-snowman": "2019-wool-snowman",
    "page-31-21-wool-robby-angel": "2019-wool-robby",
    "page-31-13-classic-santa": "2018-classic-santa",
    "page-31-14-classic-reindeer": "2018-classic-reindeer",
    "page-31-15-classic-robby-angel": "2018-classic-robby",
    "page-31-25-rocking-horse": "2017-rocking-horse",
    "page-31-26-wood-doll-santa": "2017-wood-doll-santa",
    "page-31-27-reindeer-plushie": "2017-reindeer-plushie",
    "page-31-28-pierrot-angel": "2017-pierrot-robby",
    "page-32-05-santa-claus": "2012-santa",
    "page-32-06-reindeer": "2012-reindeer",
    "page-32-10-star-pendant": "2011-star-pendant",
    "page-32-11-cross-pendant": "2011-cross-pendant",
    "page-32-12-snowflake-pendant": "2011-snowflake-pendant"
}).forEach(([id, filename]) => {
    assign(id, {
      artPath: `./app/assets/manual/christmas-secrets-user-sources/${filename}.png`,
      artSource: "manual-upload",
      isSecret: id !== "page-31-25-rocking-horse",
    });
  });

  // Supplied Christmas/ornament variants, sample figures, and Mini Marie.
  Object.entries({
    "page-33-06-reindeer": "reindeer-secret",
    "page-33-07-gingerbread-robby-angel": "gingerbread-robby",
    "page-35-07-pink-bear": "pink-bear",
    "page-35-08-blue-bear": "blue-bear",
    "page-35-09-rabbit": "rabbit-secret",
    "page-35-10-ornament-robby-angel": "ornament-robby",
    "page-35-11-pink-santa-claus": "pink-santa",
    "page-35-12-pink-reindeer": "pink-reindeer",
    "page-35-13-pink-snowman": "pink-snowman",
    "page-35-14-silver-santa-claus": "silver-santa",
    "page-35-15-silver-reindeer": "silver-reindeer",
    "page-35-16-silver-snowman": "silver-snowman",
    "page-34-01-santa-claus": "sample-santa",
    "page-34-02-snowman": "sample-snowman",
    "page-34-03-christmas-cone": "sample-cone",
    "page-34-04-bell": "sample-bell",
    "page-71-13-mini-marie-antoinette": "mini-marie-secret",
    "page-73-09-santa-claus": "francfranc-santa",
    "page-73-10-reindeer": "francfranc-reindeer",
    "page-73-11-santa-claus": "francfranc-santa-secret",
    "page-73-12-reindeer": "francfranc-reindeer-secret"
}).forEach(([id, filename]) => {
    assign(id, {
      artPath: `./app/assets/manual/christmas-ornament-mixed-user-sources/${filename}.png`,
      artSource: "manual-upload",
    });
  });
  assign("page-33-06-reindeer", { isSecret: true });
  assign("page-33-07-gingerbread-robby-angel", { isSecret: true });
  assign("page-35-07-pink-bear", { isSecret: true });
  assign("page-35-08-blue-bear", { isSecret: true });
  assign("page-35-09-rabbit", { isSecret: true });
  assign("page-35-10-ornament-robby-angel", { isSecret: true });
  assign("page-34-01-santa-claus", { series: "Christmas Series 2008 Sample", displaySeries: "Christmas Series 2008 Sample" });
  assign("page-34-02-snowman", { series: "Christmas Series 2008 Sample", displaySeries: "Christmas Series 2008 Sample" });
  assign("page-34-03-christmas-cone", { series: "Christmas Series 2008 Sample", displaySeries: "Christmas Series 2008 Sample" });
  assign("page-34-04-bell", { series: "Christmas Series 2008 Sample", displaySeries: "Christmas Series 2008 Sample" });
  assign("page-71-13-mini-marie-antoinette", { isSecret: true });
  assign("page-73-11-santa-claus", { isSecret: true });
  assign("page-73-12-reindeer", { isSecret: true });

  // Supplied Cactus secrets, summer lineups, Strong Current, and Qixi sets.
  Object.entries({
    "page-46-14-pink-rabbit": "page-46-14-pink-rabbit",
    "page-46-15-pink-monkey": "page-46-15-pink-monkey",
    "page-46-16-pink-mouse": "page-46-16-pink-mouse",
    "page-46-17-pink-parrot": "page-46-17-pink-parrot",
    "page-46-18-cactus-robby-angel": "page-46-18-cactus-robby-angel",
    "page-49-01-red-swimwear": "page-49-01-red-swimwear",
    "page-49-02-yellow-swimwear": "page-49-02-yellow-swimwear",
    "page-49-03-light-green-swimwear": "page-49-03-light-green-swimwear",
    "page-49-04-blue-swimwear": "page-49-04-blue-swimwear",
    "page-49-05-blue-t-shirt": "page-49-05-blue-t-shirt",
    "page-49-06-rainbow-t-shirt": "page-49-06-rainbow-t-shirt",
    "page-49-07-orange-t-shirt": "page-49-07-orange-t-shirt",
    "page-49-08-pink-t-shirt": "page-49-08-pink-t-shirt",
    "page-49-09-violet-swimwear": "page-49-09-violet-swimwear",
    "page-49-10-pink-swimwear": "page-49-10-pink-swimwear",
    "page-49-11-white-swimwear": "page-49-11-white-swimwear",
    "page-49-12-blue-green-t-shirt": "page-49-12-blue-green-t-shirt",
    "page-49-13-light-yellow-t-shirt": "page-49-13-light-yellow-t-shirt",
    "page-49-14-beach-robby-angel": "page-49-14-beach-robby-angel",
    "page-50-01-pink-hb": "page-50-01-pink-hb",
    "page-50-02-blue-hb": "page-50-02-blue-hb",
    "page-50-03-blue-cal": "page-50-03-blue-cal",
    "page-50-04-pink-cal": "page-50-04-pink-cal",
    "page-50-05-purple-surfboard": "page-50-05-purple-surfboard",
    "page-50-06-orange-surfboard": "page-50-06-orange-surfboard",
    "page-50-07-blue-seagulls": "page-50-07-blue-seagulls",
    "page-50-08-white-seagulls": "page-50-08-white-seagulls",
    "page-50-09-brown-sun": "page-50-09-brown-sun",
    "page-50-10-green-sun": "page-50-10-green-sun",
    "page-50-11-yellow-palm-trees": "page-50-11-yellow-palm-trees",
    "page-50-12-gray-palm-trees": "page-50-12-gray-palm-trees",
    "page-50-13-lifeguard": "page-50-13-lifeguard",
    "page-50-14-orange": "page-50-14-orange",
    "page-50-15-red": "page-50-15-red",
    "page-50-16-pink": "page-50-16-pink",
    "page-50-17-purple": "page-50-17-purple",
    "page-50-18-yellow": "page-50-18-yellow",
    "page-50-19-dark-blue": "page-50-19-dark-blue",
    "page-50-20-blue": "page-50-20-blue",
    "page-50-21-brown": "page-50-21-brown",
    "page-50-22-gray": "page-50-22-gray",
    "page-50-23-light-blue": "page-50-23-light-blue",
    "page-50-24-green": "page-50-24-green",
    "page-50-25-white": "page-50-25-white",
    "page-51-01-lop-ear-rabbit": "page-51-01-lop-ear-rabbit",
    "page-51-02-qixi-robby-angel": "page-51-02-qixi-robby-angel",
    "page-51-03-rose-bouquet": "page-51-03-rose-bouquet",
    "page-51-04-qixi-robby-angel": "page-51-04-qixi-robby-angel"
}).forEach(([id, filename]) => {
    assign(id, {
      artPath: `./app/assets/manual/summer-cactus-qixi-user-sources/${filename}.png`,
      artSource: "manual-upload",
    });
  });
  assign("page-46-14-pink-rabbit", { isSecret: true });
  assign("page-46-15-pink-monkey", { isSecret: true });
  assign("page-46-16-pink-mouse", { isSecret: true });
  assign("page-46-17-pink-parrot", { isSecret: true });
  assign("page-46-18-cactus-robby-angel", { isSecret: true });
  assign("page-49-11-white-swimwear", { isSecret: true });
  assign("page-49-14-beach-robby-angel", { isSecret: true });
  assign("page-50-13-lifeguard", { isSecret: true });

  // Supplied Circus secrets and verified collaboration lineups.
  Object.entries({
    "page-53-08-long-legged-clown-robby-angel": "page-53-08-long-legged-clown-robby-angel",
    "page-53-15-silk-hat-rabbit": "page-53-15-silk-hat-rabbit",
    "page-53-16-clown-robby-angel": "page-53-16-clown-robby-angel",
    "page-70-01-pink": "page-70-01-pink",
    "page-70-02-green": "page-70-02-green",
    "page-70-03-brown": "page-70-03-brown",
    "page-70-04-navy": "page-70-04-navy",
    "page-70-05-white": "page-70-05-white",
    "page-70-06-green": "page-70-06-green",
    "page-70-07-red": "page-70-07-red",
    "page-70-08-black": "page-70-08-black",
    "page-70-15-akari": "page-70-15-akari",
    "page-70-16-little-h": "page-70-16-little-h",
    "page-70-17-little-o": "page-70-17-little-o",
    "page-70-18-little-child": "page-70-18-little-child",
    "page-70-19-saun-nomini": "page-70-19-saun-nomini",
    "page-70-20-scarecrow": "page-70-20-scarecrow",
    "page-70-10-bed": "page-70-10-bed",
    "page-70-11-flamingo": "page-70-11-flamingo",
    "page-70-12-my-kitty": "page-70-12-my-kitty",
    "page-70-13-fruit-dish": "page-70-13-fruit-dish",
    "page-70-14-potted-plant": "page-70-14-potted-plant",
    "page-72-14-rabbit": "page-72-14-rabbit",
    "page-72-15-fawn": "page-72-15-fawn",
    "page-72-16-giraffe": "page-72-16-giraffe",
    "page-72-17-french-bulldog": "page-72-17-french-bulldog",
    "page-72-18-rabbit": "page-72-18-rabbit"
}).forEach(([id, filename]) => {
    assign(id, {
      artPath: `./app/assets/manual/circus-collaboration-user-sources/${filename}.png`,
      artSource: "manual-upload",
    });
  });
  assign("page-53-08-long-legged-clown-robby-angel", { isSecret: true });
  assign("page-53-15-silk-hat-rabbit", { isSecret: true });
  assign("page-53-16-clown-robby-angel", { isSecret: true });
  assign("page-70-19-saun-nomini", { isSecret: true });
  assign("page-70-20-scarecrow", { isSecret: true });
  assign("page-70-14-potted-plant", { isSecret: true });
  assign("page-72-18-rabbit", { isSecret: true });

  // Supplied refined regular-series Robbys and secret figures.
  [
    "page-10-14-robby-angel",
    "page-11-14-robby-angel",
    "page-12-14-robby-angel",
    "page-13-14-robby-angel",
    "page-14-14-robby-angel",
    "page-15-14-robby-angel",
    "page-12-13-unicorn",
    "page-14-13-turtle",
    "page-15-13-bee",
    "page-16-13-shiitake",
    "page-16-14-robby-angel",
    "page-17-13-patissier",
    "page-17-14-robby-angel"
].forEach((id) => {
    assign(id, {
      artPath: `./app/assets/manual/refined-secrets-user-sources/${id}.png`,
      artSource: "manual-upload",
      isSecret: true,
    });
  });

  // Supplied unrefined regular-series secrets.
  [
    "page-18-13-chipmunk",
    "page-18-14-robby-angel",
    "page-18-28-robby-angel",
    "page-19-13-unicorn",
    "page-19-14-robby-angel",
    "page-19-27-dragon",
    "page-19-28-robby-angel",
    "page-20-13-turtle",
    "page-20-14-robby-angel",
    "page-20-27-seed-leaf",
    "page-20-28-robby-angel",
    "page-21-13-bee",
    "page-21-14-robby-angel",
    "page-21-27-shiitake",
    "page-21-28-robby-angel"
].forEach((id) => {
    assign(id, {
      artPath: `./app/assets/manual/unrefined-secrets-user-sources/${id}.png`,
      artSource: "manual-upload",
      isSecret: true,
    });
  });

  // Supplied Flower Gift, birthday, and seasonal secret figures.
  [
    "page-22-11b-sunflower-lion-rainbow",
    "page-22-12-rainbow-sunflower-lion-robby-angel",
    "page-22-14-aurora-balloon-bear",
    "page-22-15-aurora-robby-angel",
    "page-23-14-aurora",
    "page-23-11-special-cake",
    "page-46-13-mexican-cactus",
    "page-47-10-ice",
    "page-51-09-happiness"
].forEach((id) => {
    assign(id, {
      artPath: `./app/assets/manual/gift-mixed-secrets-user-sources/${id}.png`,
      artSource: "manual-upload",
      isSecret: true,
    });
  });
  assign("page-22-12-rainbow-sunflower-lion-robby-angel", { name: "Rainbow Sunflower Robby Angel" });
  assign("page-22-11b-sunflower-lion-rainbow", { catalogSortSlot: 11.01 });

  return {
    items,
  };
})();
