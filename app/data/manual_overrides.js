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

  assign("page-31-26-wood-doll-santa", {
    isSecret: true,
  });

  assign("page-31-27-reindeer-plushie", {
    isSecret: true,
  });

  assign("page-31-28-pierrot-angel", {
    name: "Pierrot Robby Angel",
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

  return {
    items,
  };
})();
