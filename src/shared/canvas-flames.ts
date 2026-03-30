type CanvasConfig = {
  id: string;
  flameColor: string;
  columnCount: number;
  baseSpeed: number;
  heightsInPercent: number[];
  delayDuration: number;
  riseDuration: number;
};

type AnimationState = {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  columnWidth: number;
  targetHeights: number[];
  startTime: number;
};

function easeOutQuad(t: number) {
  return t * (2 - t);
}

function initSecondAnimation(config: CanvasConfig, animState: AnimationState) {
  const fps = 60;
  const interval = 1000 / fps;
  let lastFrameTime = Date.now();
  const originalHeights = [...animState.targetHeights];
  const currentHeights = [...animState.targetHeights];
  const maxDelta = originalHeights.map((height) => height * 0.03);
  const direction = new Array(config.columnCount)
    .fill(0)
    .map(() => (Math.random() < 0.5 ? -1 : 1));

  function frame() {
    const now = Date.now();
    const elapsed = now - lastFrameTime;

    if (elapsed > interval) {
      lastFrameTime = now - (elapsed % interval);
      animState.ctx.clearRect(0, 0, animState.width, animState.height);

      for (let i = 0; i < config.columnCount; i += 1) {
        const speedPerFrame = maxDelta[i] * config.baseSpeed * (interval / 1000);

        currentHeights[i] += speedPerFrame * direction[i];

        if (
          currentHeights[i] >= originalHeights[i] + maxDelta[i] ||
          currentHeights[i] <= originalHeights[i] - maxDelta[i]
        ) {
          direction[i] *= -1;
        }

        animState.ctx.fillStyle = config.flameColor;
        animState.ctx.fillRect(
          i * animState.columnWidth,
          animState.height - currentHeights[i],
          animState.columnWidth,
          currentHeights[i],
        );
      }
    }

    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

function animateCanvas(config: CanvasConfig) {
  const canvas = document.getElementById(config.id) as HTMLCanvasElement | null;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const targetCtx = ctx;

  canvas.width = window.innerWidth / 2;
  canvas.height = 400;

  const animState: AnimationState = {
    ctx: targetCtx,
    width: canvas.width,
    height: canvas.height,
    columnWidth: canvas.width / config.columnCount,
    targetHeights: config.heightsInPercent.map(
      (percent) => (percent * canvas.height) / 100,
    ),
    startTime: 0,
  };

  window.setTimeout(() => {
    animState.startTime = Date.now();

    function frame() {
      const now = Date.now();
      const timeElapsed = now - animState.startTime;
      const progress = Math.min(timeElapsed / config.riseDuration, 1);
      const easedProgress = easeOutQuad(progress);

      targetCtx.clearRect(0, 0, animState.width, animState.height);
      for (let i = 0; i < config.columnCount; i += 1) {
        const currentHeight = easedProgress * animState.targetHeights[i];
        targetCtx.fillStyle = config.flameColor;
        targetCtx.fillRect(
          i * animState.columnWidth,
          animState.height - currentHeight,
          animState.columnWidth,
          currentHeight,
        );
      }

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        initSecondAnimation(config, animState);
      }
    }

    requestAnimationFrame(frame);
  }, config.delayDuration);
}

export function initCanvasFlames() {
  const canvasConfigs: CanvasConfig[] = [
    {
      id: "flameCanvas1",
      flameColor: "#c21b01",
      columnCount: 20,
      baseSpeed: 0.5,
      heightsInPercent: [
        74, 72, 76, 78, 78, 76, 72, 70, 68, 64, 62, 60, 62, 62, 60, 58, 60, 64,
        62, 60,
      ],
      delayDuration: 3100,
      riseDuration: 5000,
    },
    {
      id: "flameCanvas2",
      flameColor: "#c21b01",
      columnCount: 20,
      baseSpeed: 0.5,
      heightsInPercent: [
        49, 47, 51, 53, 53, 51, 47, 45, 43, 39, 37, 35, 37, 37, 35, 33, 37, 39,
        37, 35,
      ],
      delayDuration: 2900,
      riseDuration: 5000,
    },
  ];

  canvasConfigs.forEach(animateCanvas);
}
