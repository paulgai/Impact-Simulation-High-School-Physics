const root = document.documentElement;
const appShell = document.querySelector(".app-shell");
const themeButtons = document.querySelectorAll("[data-theme]");
const geometrySelect = document.querySelector("#collision-geometry");
const characterSelect = document.querySelector("#collision-character");
const parameterSection = document.querySelector("#central-elastic-settings");
const settingsPlaceholder = document.querySelector("#settings-placeholder");
const simulationViewport = document.querySelector("#simulation-viewport");
const simulationWorld = document.querySelector("#simulation-world");
const massiveWall = document.querySelector("#massive-wall");
const simulationPlaceholder = document.querySelector("#simulation-placeholder");
const resetViewButton = document.querySelector("#reset-view");
const fullscreenButton = document.querySelector("#toggle-fullscreen");
const zoomInButton = document.querySelector("#zoom-in");
const zoomOutButton = document.querySelector("#zoom-out");
const restartButton = document.querySelector("#restart-simulation");
const playButton = document.querySelector("#play-simulation");
const pauseButton = document.querySelector("#pause-simulation");
const stepBackwardButton = document.querySelector("#step-backward");
const stepForwardButton = document.querySelector("#step-forward");
const exactlyBeforeButton = document.querySelector("#exactly-before-collision");
const exactlyAfterButton = document.querySelector("#exactly-after-collision");
const settingsPanelToggle = document.querySelector("#settings-panel-toggle");
const resultsPanelToggle = document.querySelector("#results-panel-toggle");
const resultsPanel = document.querySelector("#results-panel");
appShell.append(resultsPanelToggle, resultsPanel);
const stackedMobileLayoutQuery = window.matchMedia(
  "(max-width: 820px) and (orientation: portrait)",
);
const positionResultsHeading = document.querySelector(
  "#position-results-heading",
);
const positionResultsGrid = document.querySelector("#position-results-grid");
const standardVelocityResults = document.querySelector(
  "#standard-velocity-results",
);
const massiveWallVelocityResults = document.querySelector(
  "#massive-wall-velocity-results",
);
const standardEnergyResults = document.querySelector(
  "#standard-energy-results",
);
const massiveWallEnergyResults = document.querySelector(
  "#massive-wall-energy-results",
);
const collisionMessage = document.querySelector("#collision-message");
const collisionEffect = document.querySelector("#collision-effect");
const collisionPoint = document.querySelector("#collision-point");
const compoundBody = document.querySelector("#compound-body");
const weldClipM1 = document.querySelector("#weld-clip-m1");
const weldIntersection = document.querySelector("#weld-intersection");
const weldOutlineM1 = document.querySelector("#weld-outline-m1");
const weldOutlineM2 = document.querySelector("#weld-outline-m2");
const weldOutlineMorphology = document.querySelector(
  "#weld-outline-morphology",
);
const sphereFill1 = document.querySelector("#sphere-fill-m1");
const sphereFill2 = document.querySelector("#sphere-fill-m2");
const sphereOutline1 = document.querySelector("#sphere-outline-m1");
const sphereOutline2 = document.querySelector("#sphere-outline-m2");
const sphereCenter1 = document.querySelector("#sphere-center-m1");
const sphereCenter2 = document.querySelector("#sphere-center-m2");
const combinedMassLabel = document.querySelector("#label-combined-mass");
const collisionSound = document.querySelector("#collision-sound");
const axisX = document.querySelector("#axis-x");
const axisY = document.querySelector("#axis-y");
const energyLossSettings = document.querySelector("#energy-loss-settings");
const energyLossRange = document.querySelector("#energy-loss-range");
const energyLossLabel = document.querySelector(
  'label[for="energy-loss-range"]',
);
const positionsSettings = document.querySelector("#positions-settings");
const obliqueAngleSettings = document.querySelector("#oblique-angle-settings");
const eccentricOnlyControls = document.querySelectorAll(".eccentric-only");
const radiusControls = document.querySelectorAll(".radius-control");
const m1Label = document.querySelector('label[for="m1-range"]');
const m2Control = document.querySelector("#m2-range").closest(".parameter-control");
const u1Label = document.querySelector('label[for="u1-range"]');
const u2Control = document.querySelector("#u2-range").closest(".parameter-control");
const mPointMassIndicator = document.querySelector("#m-point-mass");
const bodyParametersTitle = document.querySelector(
  "#body-parameters-settings .accordion-button",
);
const geometricFeaturesControl = document.querySelector(
  "#geometric-features-control",
);
const geometricFeaturesCheckbox = document.querySelector(
  "#geometric-features",
);
const geometryLayer = document.querySelector("#geometry-layer");
const trajectoryCarriers = document.querySelector("#trajectory-carriers");
const outgoingGeometry = document.querySelector("#outgoing-geometry");
const obliqueGeometry = document.querySelector("#oblique-geometry");
const collisionCoordinateSystem = document.querySelector(
  "#collision-coordinate-system",
);
const geometryLabels = {
  d: document.querySelector("#geometry-label-d"),
  theta1: document.querySelector("#geometry-label-theta1"),
  theta2: document.querySelector("#geometry-label-theta2"),
  obliqueTheta: document.querySelector("#geometry-label-oblique-angle"),
  obliquePhi: document.querySelector("#geometry-label-oblique-phi"),
  axisX: document.querySelector("#geometry-label-x-axis"),
  axisY: document.querySelector("#geometry-label-y-axis"),
  u1x: document.querySelector("#geometry-label-u1-x"),
  u1y: document.querySelector("#geometry-label-u1-y"),
  u2x: document.querySelector("#geometry-label-u2-x"),
  u2y: document.querySelector("#geometry-label-u2-y"),
};

const WORLD_WIDTH = 1200;
const WORLD_HEIGHT = 600;
const ORIGIN_X = 600;
const ORIGIN_Y = 300;
const PIXELS_PER_METER = 55;
// Ποσοστό της μικρότερης διαμέτρου που επικαλύπτεται στη συγκόλληση.
const PLASTIC_OVERLAP_RATIO = 0.3;
const FRAME_STEP = 1 / 30;
const POST_COLLISION_DURATION = 2;
// Ρύθμισε εδώ πόσα milliseconds πριν από την επαφή θα ξεκινά ο ήχος.
const COLLISION_SOUND_LEAD_MS = 0;
const COLLISION_SOUND_URL = "assets/billiard-hit.wav";
const MIN_ZOOM = 0.35;
const MAX_ZOOM = 8.5;
const SPHERE_OUTLINE_WIDTH_PX = 2;
const VECTOR_STROKE_WIDTH_PX = 2;
const VECTOR_LENGTH_PER_SPEED_PX = 44;
const VECTOR_HEAD_LENGTH_PX = 9;
const VECTOR_HEAD_HALF_HEIGHT_PX = 3.5;
const GEOMETRY_COMPONENT_STROKE_PX = 1.5;
const POINT_MASS_RADIUS_PX = 7;
const OBLIQUE_COLLISION_TIME = 0.9;
const WALL_START_DISTANCE_M = 4;
const LABEL_DRAG_RADIUS_PX = 55;
const APP_ZOOM_LEVELS = [0.5, 0.67, 0.75, 0.8, 0.9, 1, 1.1, 1.25, 1.5, 1.75, 2];

const DEFAULT_CASE_PARAMETERS = {
  "central:elastic": {
    x1: -4,
    x2: 4,
    m1: 1,
    m2: 1.5,
    r1: 0.4,
    r2: 0.4,
    u1: 4,
    u2: -2,
  },
  "central:plastic": {
    x1: -4,
    x2: 4,
    m1: 1,
    m2: 1.5,
    r1: 0.4,
    r2: 0.4,
    u1: 4,
    u2: -2,
  },
  "central:inelastic": {
    x1: -4,
    x2: 4,
    m1: 1,
    m2: 1.5,
    r1: 0.4,
    r2: 0.4,
    u1: 4,
    u2: -2,
    "energy-loss": 20,
  },
  "eccentric:elastic": {
    x1: -4,
    x2: 4,
    y1: -0.3,
    y2: 0.3,
    m1: 1,
    m2: 1.5,
    r1: 0.5,
    r2: 0.5,
    u1: 4,
    u2: -2,
  },
  "eccentric:plastic": {
    x1: -4,
    x2: 4,
    y1: -0.3,
    y2: 0.3,
    m1: 1,
    m2: 1.5,
    r1: 0.5,
    r2: 0.5,
    u1: 4,
    u2: -2,
  },
  "oblique:elastic": {
    theta: 60,
    m1: 1,
    m2: 1.5,
    u1: 4,
    u2: 2,
  },
  "oblique:plastic": {
    theta: 60,
    m1: 1,
    m2: 1.5,
    u1: 4,
    u2: 2,
  },
  "massive-stationary:elastic": {
    theta: 40,
    m1: 1,
    u1: 4,
  },
  "massive-stationary:inelastic": {
    theta: 40,
    m1: 1,
    u1: 4,
    "energy-loss": 20,
  },
};

const view = { x: 0, y: 0, scale: 1 };
let applicationZoom = 1;
const pointer = { active: false, id: null, x: 0, y: 0 };
const viewportPointers = new Map();
const pinchGesture = {
  active: false,
  distance: 0,
  centerX: 0,
  centerY: 0,
};
const labelDrag = {
  active: false,
  element: null,
  pointerId: null,
  startClientX: 0,
  startClientY: 0,
  startOffsetX: 0,
  startOffsetY: 0,
};
const playback = {
  time: 0,
  playing: false,
  lastTimestamp: null,
  animationId: null,
  model: null,
  soundPlayed: false,
  collisionSnapshot: null,
};
let collisionEffectTimer = null;
let collisionAudioContext = null;
let collisionAudioBuffer = null;
let collisionAudioLoadPromise = null;
let activeCollisionSource = null;

function setTheme(theme, persist = true) {
  root.setAttribute("data-bs-theme", theme);
  themeButtons.forEach((button) => {
    const isActive = button.dataset.theme === theme;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  if (persist) localStorage.setItem("collision-lab-theme", theme);
}

function decimal(value, digits = 1) {
  const safeValue = Math.abs(value) < 0.000001 ? 0 : value;
  return Number(safeValue).toFixed(digits).replace(".", ",");
}

function latexNumber(value, digits = 1) {
  return decimal(value, digits).replace(",", "{,}");
}

function renderLatex(element, expression, fallback = expression) {
  if (!element) return;
  if (window.katex) {
    window.katex.render(expression, element, {
      throwOnError: false,
      strict: false,
    });
  } else {
    element.textContent = fallback;
  }
}

function renderMeasurement(
  selector,
  value,
  isAvailable,
  digits,
  unitLatex,
  unitText,
) {
  const element = document.querySelector(selector);
  if (!isAvailable) {
    renderLatex(element, "\\text{--}", "–");
    return;
  }

  renderLatex(
    element,
    `${latexNumber(value, digits)}\\,${unitLatex}`,
    `${decimal(value, digits)} ${unitText}`,
  );
}

function renderPointMeasurement(
  selector,
  x,
  y,
  isAvailable,
  digits = 1,
) {
  const element = document.querySelector(selector);
  if (!isAvailable) {
    renderLatex(element, "\\text{--}", "–");
    return;
  }
  renderLatex(
    element,
    `\\left(${latexNumber(x, digits)},\\,${latexNumber(y, digits)}\\right)\\,\\mathrm{m}`,
    `(${decimal(x, digits)}, ${decimal(y, digits)}) m`,
  );
}

function resultSymbol(valueSelector) {
  const valueElement = document.querySelector(valueSelector);
  return valueElement?.previousElementSibling?.previousElementSibling;
}

function renderAngle(selector, value, isAvailable, digits = 1) {
  const element = document.querySelector(selector);
  if (!isAvailable) {
    renderLatex(element, "\\text{--}", "–");
    return;
  }

  renderLatex(
    element,
    `${latexNumber(value, digits)}^\\circ`,
    `${decimal(value, digits)}°`,
  );
}

function renderStaticLatex() {
  const staticExpressions = new Map([
    ['label[for="x1-range"]', "x_1"],
    ['label[for="x2-range"]', "x_2"],
    ['label[for="y1-range"]', "y_1"],
    ['label[for="y2-range"]', "y_2"],
    ['label[for="theta-range"]', "\\varphi"],
    ['label[for="m1-range"]', "m_1"],
    ['label[for="m2-range"]', "m_2"],
    ['label[for="r1-range"]', "R_1"],
    ['label[for="r2-range"]', "R_2"],
    ['label[for="u1-range"]', "u_1"],
    ['label[for="u2-range"]', "u_2"],
    ['label[for="energy-loss-range"]', "\\frac{\\lvert\\Delta K\\rvert}{K_{\\text{ολ}}}"],
    ["#label-m1", "m_1"],
    ["#label-m2", "m_2"],
    ["#label-combined-mass", "m_1+m_2"],
    [".collision-point-label", "K"],
    [".axis-x span", "x"],
    [".axis-y span", "y"],
  ]);

  staticExpressions.forEach((expression, selector) => {
    renderLatex(document.querySelector(selector), expression);
  });

  const resultSymbols = new Map([
    ["#result-x1", "x_1"],
    ["#result-x2", "x_2"],
    ["#result-y1", "y_1"],
    ["#result-y2", "y_2"],
    ["#result-collision-x", "x_{\\kappa}"],
    ["#result-point-1", "(x_1,y_1)"],
    ["#result-point-2", "(x_2,y_2)"],
    ["#result-collision-point", "(x_{\\kappa},y_{\\kappa})"],
    ["#result-initial-u1", "u_1"],
    ["#result-initial-u2", "u_2"],
    ["#result-u1", "u'_1"],
    ["#result-u2", "u'_2"],
    ["#result-angle-u1", "\\theta'_1"],
    ["#result-angle-u2", "\\theta'_2"],
    ["#result-common-velocity", "v'"],
    ["#result-common-angle", "\\theta"],
    ["#result-angular-velocity", "\\omega"],
    ["#result-wall-u", "u"],
    ["#result-wall-u-prime", "u'"],
    ["#result-wall-incidence-angle", "\\varphi"],
    ["#result-wall-reflection-angle", "\\theta"],
    ["#result-wall-k", "K"],
    ["#result-wall-k-prime", "K'"],
    ["#result-wall-delta-k", "\\Delta K"],
    ["#result-k1", "K_1"],
    ["#result-k2", "K_2"],
    ["#result-final-k1", "K'_1"],
    ["#result-final-k2", "K'_2"],
    ["#result-total-k", "K_{\\text{ολ}}"],
    ["#result-final-total-k", "K'_{\\text{ολ}}"],
    ["#result-system-k", "K'_{\\text{συσ}}"],
    ["#result-q", "\\lvert\\Delta K\\rvert"],
  ]);

  resultSymbols.forEach((expression, valueSelector) => {
    renderLatex(resultSymbol(valueSelector), expression);
  });

  const unitExpressions = {
    m: "\\mathrm{m}",
    kg: "\\mathrm{kg}",
    "m/s": "\\mathrm{m}/\\mathrm{s}",
    "%": "\\%",
  };
  document.querySelectorAll(".number-field span").forEach((unit) => {
    const unitText = unit.textContent.trim();
    renderLatex(unit, unitExpressions[unitText] || unitText, unitText);
  });

  document.querySelectorAll(".range-limits span").forEach((limit) => {
    const value = limit.textContent.trim().replace("−", "-");
    renderLatex(limit, value.replace(",", "{,}"), limit.textContent.trim());
  });
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function advanceTime(currentTime, delta, model) {
  const nextTime = clamp(currentTime + delta, 0, model.finalTime);
  const collisionTime = model.collisionTime;
  const soundTime = Math.max(0, collisionTime - COLLISION_SOUND_LEAD_MS / 1000);
  const isContactFrame = Math.abs(currentTime - collisionTime) < 1e-9;

  // Στην πλαστική κρούση το αμέσως επόμενο καρέ είναι το καρέ συγκόλλησης.
  if (model.isPlastic && delta > 0 && isContactFrame) return model.mergeTime;

  const crossesSoundCueForward =
    delta > 0 && currentTime < soundTime && nextTime >= soundTime;
  const crossesCollisionForward =
    delta > 0 && currentTime < collisionTime && nextTime >= collisionTime;
  const crossesCollisionBackward =
    delta < 0 && currentTime > collisionTime && nextTime <= collisionTime;
  const crossesMergeForward =
    model.isPlastic &&
    delta > 0 &&
    currentTime < model.mergeTime &&
    nextTime >= model.mergeTime;
  const crossesMergeBackward =
    model.isPlastic &&
    delta < 0 &&
    currentTime > model.mergeTime &&
    nextTime <= model.mergeTime;

  if (crossesSoundCueForward) return soundTime;
  if (crossesCollisionForward || crossesCollisionBackward) return collisionTime;
  if (crossesMergeForward || crossesMergeBackward) return model.mergeTime;
  return nextTime;
}

function preloadCollisionSound() {
  if (collisionAudioLoadPromise) return collisionAudioLoadPromise;

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return Promise.resolve(null);

  collisionAudioContext = new AudioContextClass({ latencyHint: "interactive" });
  collisionAudioLoadPromise = fetch(COLLISION_SOUND_URL, {
    cache: "force-cache",
  })
    .then((response) => {
      if (!response.ok) throw new Error(`Audio HTTP ${response.status}`);
      return response.arrayBuffer();
    })
    .then((audioData) => collisionAudioContext.decodeAudioData(audioData))
    .then((decodedBuffer) => {
      collisionAudioBuffer = decodedBuffer;
      return decodedBuffer;
    })
    .catch((error) => {
      console.warn("Δεν ήταν δυνατή η προφόρτωση του ήχου κρούσης.", error);
      return null;
    });

  return collisionAudioLoadPromise;
}

function unlockCollisionAudio() {
  preloadCollisionSound();
  if (collisionAudioContext?.state === "suspended") {
    collisionAudioContext.resume().catch(() => {});
  }
}

function stopCollisionSound() {
  if (activeCollisionSource) {
    try {
      activeCollisionSource.stop();
    } catch {
      // Η πηγή μπορεί να έχει ήδη ολοκληρωθεί.
    }
    activeCollisionSource = null;
  }
  collisionSound.pause();
  collisionSound.currentTime = 0;
}

function playCollisionSound() {
  if (collisionAudioBuffer && collisionAudioContext?.state === "running") {
    if (activeCollisionSource) {
      try {
        activeCollisionSource.stop();
      } catch {
        // Η προηγούμενη πηγή μπορεί να έχει ήδη ολοκληρωθεί.
      }
    }

    const source = collisionAudioContext.createBufferSource();
    source.buffer = collisionAudioBuffer;
    source.connect(collisionAudioContext.destination);
    source.addEventListener("ended", () => {
      if (activeCollisionSource === source) activeCollisionSource = null;
    });
    activeCollisionSource = source;
    source.start(0);
    return;
  }

  // Fallback μόνο αν το Web Audio δεν υποστηρίζεται ή δεν έχει ετοιμαστεί.
  collisionSound.currentTime = 0;
  collisionSound.play().catch(() => {});
}

function triggerCollisionEffect(model) {
  collisionEffect.style.left = `${model.collisionPointX}px`;
  collisionEffect.style.top = `${model.collisionPointY}px`;
  collisionEffect.classList.remove("active");
  void collisionEffect.offsetWidth;
  collisionEffect.classList.add("active");
  if (collisionEffectTimer !== null) clearTimeout(collisionEffectTimer);
  collisionEffectTimer = setTimeout(() => {
    collisionEffect.classList.remove("active");
  }, 500);
}

function processCollisionEvents(previousTime, nextTime, model, direction) {
  const soundTime = Math.max(
    0,
    model.collisionTime - COLLISION_SOUND_LEAD_MS / 1000,
  );

  if (
    direction > 0 &&
    !playback.soundPlayed &&
    previousTime <= soundTime &&
    nextTime >= soundTime &&
    nextTime > previousTime
  ) {
    playCollisionSound();
    playback.soundPlayed = true;
  }

  if (
    direction > 0 &&
    previousTime < model.collisionTime &&
    nextTime >= model.collisionTime
  ) {
    triggerCollisionEffect(model);
  }

  if (direction < 0 && nextTime <= soundTime) {
    playback.soundPlayed = false;
  }
}

function normalizedValue(input) {
  const min = Number(input.min);
  const max = Number(input.max);
  const step = Number(input.step) || 0.1;
  const rawValue = Number(String(input.value).replace(",", "."));
  const safeValue = Number.isFinite(rawValue) ? rawValue : min;
  const clampedValue = clamp(safeValue, min, max);
  const snappedValue = min + Math.round((clampedValue - min) / step) * step;
  return Math.round(clamp(snappedValue, min, max) * 1000) / 1000;
}

function numericInputValue(input) {
  const rawValue = String(input.value).trim().replace(",", ".");
  return rawValue === "" ? Number.NaN : Number(rawValue);
}

function controlValueDomain(range) {
  if (range.id === "energy-loss-range") return "percentage";
  if (["m1-range", "m2-range"].includes(range.id)) return "positive";
  if (["theta-range", "r1-range", "r2-range"].includes(range.id)) {
    return "nonnegative";
  }
  if (["u1-range", "u2-range"].includes(range.id) && Number(range.min) >= 0) {
    return "nonnegative";
  }
  return "unbounded";
}

function configureNumberInput(range, numberInput) {
  const domain = controlValueDomain(range);
  if (domain === "percentage") {
    numberInput.min = range.min;
    numberInput.max = range.max;
    numberInput.step = range.step;
    return;
  }

  numberInput.removeAttribute("max");
  numberInput.step = "any";
  if (domain === "positive" || domain === "nonnegative") {
    numberInput.min = "0";
  } else {
    numberInput.removeAttribute("min");
  }
}

function isAllowedControlValue(range, value) {
  if (!Number.isFinite(value)) return false;
  const domain = controlValueDomain(range);
  if (domain === "positive") return value > 0;
  if (domain === "nonnegative") return value >= 0;
  if (domain === "percentage") {
    return value >= Number(range.min) && value <= Number(range.max);
  }
  return true;
}

function controlValidationMessage(range, value) {
  if (!Number.isFinite(value)) return "Εισαγάγετε μια έγκυρη αριθμητική τιμή.";
  const domain = controlValueDomain(range);
  if (domain === "positive") return "Η τιμή πρέπει να είναι μεγαλύτερη από το μηδέν.";
  if (domain === "nonnegative") return "Η τιμή δεν μπορεί να είναι αρνητική.";
  if (domain === "percentage") {
    return `Το ποσοστό πρέπει να είναι από ${range.min} έως ${range.max}.`;
  }
  return "";
}

function clearSliderOverflowState(range) {
  range.classList.remove("is-below-range", "is-above-range");
  range.removeAttribute("aria-valuetext");
}

function syncSliderToNumberValue(range, value) {
  const minimum = Number(range.min);
  const maximum = Number(range.max);
  const isBelowRange = value < minimum;
  const isAboveRange = value > maximum;

  range.value = String(clamp(value, minimum, maximum));
  range.classList.toggle("is-below-range", isBelowRange);
  range.classList.toggle("is-above-range", isAboveRange);

  if (isBelowRange || isAboveRange) {
    const edge = isBelowRange ? "κάτω" : "πάνω";
    range.setAttribute(
      "aria-valuetext",
      `${value} — ${edge} από το οπτικό όριο του slider`,
    );
  } else {
    range.removeAttribute("aria-valuetext");
  }
}

function parameterControlValue(key) {
  const range = document.querySelector(`#${key}-range`);
  const numberInput = document.querySelector(`#${key}-number`);
  const enteredValue = numericInputValue(numberInput);
  if (isAllowedControlValue(range, enteredValue)) return enteredValue;

  const lastValidValue = Number(numberInput.dataset.lastValidValue);
  return isAllowedControlValue(range, lastValidValue)
    ? lastValidValue
    : Number(range.value);
}

function readParameters() {
  return {
    x1: parameterControlValue("x1"),
    x2: parameterControlValue("x2"),
    y1: parameterControlValue("y1"),
    y2: parameterControlValue("y2"),
    theta: parameterControlValue("theta"),
    m1: parameterControlValue("m1"),
    m2: parameterControlValue("m2"),
    r1: parameterControlValue("r1"),
    r2: parameterControlValue("r2"),
    u1: parameterControlValue("u1"),
    u2: parameterControlValue("u2"),
    energyLossPercent: parameterControlValue("energy-loss"),
  };
}

function maximumCentralEnergyLossPercent(m1, m2, u1, u2) {
  const totalMass = m1 + m2;
  const twiceInitialKineticEnergy = m1 * u1 ** 2 + m2 * u2 ** 2;

  if (totalMass <= 0 || twiceInitialKineticEnergy <= 1e-12) return 0;

  const reducedMass = m1 * m2 / totalMass;
  return clamp(
    100 * reducedMass * (u1 - u2) ** 2 / twiceInitialKineticEnergy,
    0,
    100,
  );
}

function displayedEnergyLossMaximum(theoreticalMaximum) {
  return Math.floor((theoreticalMaximum + 1e-9) * 10) / 10;
}

function createObliqueModel(parameters) {
  const { theta, m1, m2, u1, u2 } = parameters;
  const isPlastic = characterSelect.value === "plastic";
  const angle = theta * Math.PI / 180;
  const collisionTime =
    u1 < 1e-10 && u2 < 1e-10 ? 0 : OBLIQUE_COLLISION_TIME;
  const u1x = u1;
  const u1y = 0;
  const u2x = u2 * Math.cos(angle);
  const u2y = u2 * Math.sin(angle);
  const startPosition1X = -u1 * collisionTime;
  const startPosition1Y = 0;
  const startPosition2X = -u2 * collisionTime * Math.cos(angle);
  const startPosition2Y = -u2 * collisionTime * Math.sin(angle);
  const relativeVelocityX = u1x - u2x;
  const relativeVelocityY = u1y - u2y;
  const relativeSpeed = Math.hypot(relativeVelocityX, relativeVelocityY);
  const impulseFactor1 = 2 * m2 / (m1 + m2);
  const impulseFactor2 = 2 * m1 / (m1 + m2);
  const elasticV1X = u1x - impulseFactor1 * relativeVelocityX;
  const elasticV1Y = u1y - impulseFactor1 * relativeVelocityY;
  const elasticV2X = u2x + impulseFactor2 * relativeVelocityX;
  const elasticV2Y = u2y + impulseFactor2 * relativeVelocityY;
  const commonVelocityX = (m1 * u1x + m2 * u2x) / (m1 + m2);
  const commonVelocityY = (m1 * u1y + m2 * u2y) / (m1 + m2);
  const commonVelocity = Math.hypot(commonVelocityX, commonVelocityY);
  const commonAngle = Math.atan2(commonVelocityY, commonVelocityX) * 180 / Math.PI;
  const v1x = isPlastic ? commonVelocityX : elasticV1X;
  const v1y = isPlastic ? commonVelocityY : elasticV1Y;
  const v2x = isPlastic ? commonVelocityX : elasticV2X;
  const v2y = isPlastic ? commonVelocityY : elasticV2Y;
  const finalSpeed1 = Math.hypot(v1x, v1y);
  const finalSpeed2 = Math.hypot(v2x, v2y);
  const systemFinalKineticEnergy =
    0.5 * (m1 + m2) * commonVelocity ** 2;
  const pointDiameter = 2 * POINT_MASS_RADIUS_PX;

  return {
    x1: startPosition1X,
    x2: startPosition2X,
    y1: startPosition1Y,
    y2: startPosition2Y,
    theta,
    r1: 0,
    r2: 0,
    m1,
    m2,
    u1,
    u2,
    u1x,
    u1y,
    u2x,
    u2y,
    v1: v1x,
    v2: v2x,
    v1x,
    v1y,
    v2x,
    v2y,
    finalSpeed1,
    finalSpeed2,
    finalAngle1: Math.atan2(v1y, v1x) * 180 / Math.PI,
    finalAngle2: Math.atan2(v2y, v2x) * 180 / Math.PI,
    diameter1: pointDiameter,
    diameter2: pointDiameter,
    startX1: ORIGIN_X + startPosition1X * PIXELS_PER_METER,
    startX2: ORIGIN_X + startPosition2X * PIXELS_PER_METER,
    startY1: ORIGIN_Y - startPosition1Y * PIXELS_PER_METER,
    startY2: ORIGIN_Y - startPosition2Y * PIXELS_PER_METER,
    orientation: 1,
    isEccentric: false,
    isOblique: true,
    pointMass1: true,
    pointMass2: true,
    contactNormalX:
      relativeSpeed > 1e-10 ? relativeVelocityX / relativeSpeed : 1,
    contactNormalY:
      relativeSpeed > 1e-10 ? relativeVelocityY / relativeSpeed : 0,
    isPlastic,
    isInelastic: false,
    energyLossPercent: 0,
    commonVelocity,
    commonVelocityX,
    commonVelocityY,
    commonAngle,
    angularVelocity: 0,
    systemFinalKineticEnergy,
    overlapDepth: 0,
    penetrationShare1: 0.5,
    penetrationShare2: 0.5,
    collisionPointX: ORIGIN_X,
    collisionPointY: ORIGIN_Y,
    collisionPosition: 0,
    collisionPositionY: 0,
    hasCollision: true,
    collisionTime,
    mergeTime: isPlastic ? collisionTime + FRAME_STEP : collisionTime,
    finalTime: collisionTime + POST_COLLISION_DURATION,
  };
}

function createMassiveStationaryModel(parameters) {
  const { theta, m1, u1 } = parameters;
  const isInelastic = characterSelect.value === "inelastic";
  const angle = theta * Math.PI / 180;
  const cosine = Math.cos(angle);
  const sine = Math.sin(angle);
  const maximumEnergyLossPercent = 100 * cosine ** 2;
  const energyLossPercent = isInelastic
    ? clamp(parameters.energyLossPercent, 0, maximumEnergyLossPercent)
    : 0;
  const energyLossRatio = energyLossPercent / 100;
  const u1x = u1 * cosine;
  const u1y = u1 * sine;
  const v1x = -u1 * Math.sqrt(Math.max(0, cosine ** 2 - energyLossRatio));
  const v1y = u1y;
  const finalSpeed = Math.hypot(v1x, v1y);
  const reflectionAngle =
    finalSpeed > 1e-10
      ? Math.atan2(Math.abs(v1y), Math.abs(v1x)) * 180 / Math.PI
      : Number.NaN;
  const startPosition1X = -WALL_START_DISTANCE_M * Math.cos(angle);
  const startPosition1Y = -WALL_START_DISTANCE_M * Math.sin(angle);
  const hasCollision = u1 > 1e-10;
  const collisionTime = hasCollision
    ? WALL_START_DISTANCE_M / u1
    : Number.POSITIVE_INFINITY;
  const kineticEnergy = 0.5 * m1 * u1 ** 2;
  const finalKineticEnergy = 0.5 * m1 * finalSpeed ** 2;
  const pointDiameter = 2 * POINT_MASS_RADIUS_PX;

  return {
    x1: startPosition1X,
    x2: 1,
    y1: startPosition1Y,
    y2: 0,
    theta,
    reflectionAngle,
    maximumEnergyLossPercent,
    r1: 0,
    r2: 0,
    m1,
    m2: 1,
    u1,
    u2: 0,
    u1x,
    u1y,
    u2x: 0,
    u2y: 0,
    v1: v1x,
    v2: 0,
    v1x,
    v1y,
    v2x: 0,
    v2y: 0,
    finalSpeed1: finalSpeed,
    finalSpeed2: 0,
    finalAngle1: Number.isFinite(reflectionAngle)
      ? 180 - reflectionAngle
      : Number.NaN,
    finalAngle2: 0,
    diameter1: pointDiameter,
    diameter2: pointDiameter,
    startX1: ORIGIN_X + startPosition1X * PIXELS_PER_METER,
    startX2: ORIGIN_X + PIXELS_PER_METER,
    startY1: ORIGIN_Y - startPosition1Y * PIXELS_PER_METER,
    startY2: ORIGIN_Y,
    orientation: 1,
    isEccentric: false,
    isOblique: false,
    isMassiveWall: true,
    pointMass1: true,
    pointMass2: false,
    contactNormalX: 1,
    contactNormalY: 0,
    isPlastic: false,
    isInelastic,
    energyLossPercent,
    commonVelocity: 0,
    commonVelocityX: 0,
    commonVelocityY: 0,
    commonAngle: 0,
    angularVelocity: 0,
    systemFinalKineticEnergy: finalKineticEnergy,
    overlapDepth: 0,
    penetrationShare1: 0.5,
    penetrationShare2: 0.5,
    collisionPointX: ORIGIN_X,
    collisionPointY: ORIGIN_Y,
    collisionPosition: 0,
    collisionPositionY: 0,
    hasCollision,
    collisionTime,
    mergeTime: collisionTime,
    finalTime: hasCollision ? collisionTime + POST_COLLISION_DURATION : 0,
  };
}

function circleCollisionTime(
  startX1,
  startY1,
  startX2,
  startY2,
  u1,
  u2,
  radiusSum,
) {
  const relativeX = startX2 - startX1;
  const relativeY = startY2 - startY1;
  const relativeVelocityX = (u2 - u1) * PIXELS_PER_METER;
  const a = relativeVelocityX ** 2;
  const b = 2 * relativeX * relativeVelocityX;
  const c = relativeX ** 2 + relativeY ** 2 - radiusSum ** 2;

  if (c < -1e-9 || a < 1e-12 || b >= 0) return Number.POSITIVE_INFINITY;
  const discriminant = b ** 2 - 4 * a * c;
  if (discriminant < 0) return Number.POSITIVE_INFINITY;

  const firstContact = (-b - Math.sqrt(Math.max(0, discriminant))) / (2 * a);
  return firstContact >= -1e-9
    ? Math.max(0, firstContact)
    : Number.POSITIVE_INFINITY;
}

function createModel() {
  const parameters = readParameters();
  if (geometrySelect.value === "massive-stationary") {
    return createMassiveStationaryModel(parameters);
  }
  if (geometrySelect.value === "oblique") {
    return createObliqueModel(parameters);
  }
  const { x1, x2, y1, y2, m1, m2, r1, r2, u1, u2 } = parameters;
  const isEccentric = geometrySelect.value === "eccentric";
  const isPlastic = characterSelect.value === "plastic";
  const isInelastic = characterSelect.value === "inelastic";
  const pointMass1 = r1 === 0;
  const pointMass2 = r2 === 0;
  const diameter1 = 2 * r1 * PIXELS_PER_METER;
  const diameter2 = 2 * r2 * PIXELS_PER_METER;
  const startX1 = ORIGIN_X + x1 * PIXELS_PER_METER;
  const startX2 = ORIGIN_X + x2 * PIXELS_PER_METER;
  const startY1 = ORIGIN_Y - (isEccentric ? y1 : 0) * PIXELS_PER_METER;
  const startY2 = ORIGIN_Y - (isEccentric ? y2 : 0) * PIXELS_PER_METER;
  const separation = startX2 - startX1;
  const orientation = Math.sign(separation) || 1;
  const radius1 = diameter1 / 2;
  const radius2 = diameter2 / 2;
  const collisionTime = circleCollisionTime(
    startX1,
    startY1,
    startX2,
    startY2,
    u1,
    u2,
    radius1 + radius2,
  );
  const hasCollision = Number.isFinite(collisionTime);
  const mergeTime =
    hasCollision && isPlastic ? collisionTime + FRAME_STEP : collisionTime;
  const finalTime = hasCollision ? collisionTime + POST_COLLISION_DURATION : 0;

  const elasticV1 = ((m1 - m2) * u1 + 2 * m2 * u2) / (m1 + m2);
  const elasticV2 = (2 * m1 * u1 + (m2 - m1) * u2) / (m1 + m2);
  const commonVelocity = (m1 * u1 + m2 * u2) / (m1 + m2);
  const maximumEnergyLossPercent = maximumCentralEnergyLossPercent(
    m1,
    m2,
    u1,
    u2,
  );
  const displayedMaximumEnergyLossPercent = displayedEnergyLossMaximum(
    maximumEnergyLossPercent,
  );
  const isDisplayedMaximumSelected =
    Math.abs(
      parameters.energyLossPercent - displayedMaximumEnergyLossPercent,
    ) <= 1e-9;
  const energyLossPercent = isInelastic
    ? isDisplayedMaximumSelected
      ? maximumEnergyLossPercent
      : clamp(parameters.energyLossPercent, 0, maximumEnergyLossPercent)
    : 0;
  const restitution = maximumEnergyLossPercent > 1e-12
    ? Math.sqrt(
        Math.max(0, 1 - energyLossPercent / maximumEnergyLossPercent),
      )
    : 0;
  const finalRelativeVelocity = -(u1 - u2) * restitution;
  const inelasticV1 =
    commonVelocity + (m2 / (m1 + m2)) * finalRelativeVelocity;
  const inelasticV2 =
    commonVelocity - (m1 / (m1 + m2)) * finalRelativeVelocity;
  const v1 = isPlastic ? commonVelocity : isInelastic ? inelasticV1 : elasticV1;
  const v2 = isPlastic ? commonVelocity : isInelastic ? inelasticV2 : elasticV2;
  const overlapDepth = Math.min(diameter1, diameter2) * PLASTIC_OVERLAP_RATIO;
  const approach1 = Math.max(0, orientation * u1);
  const approach2 = Math.max(0, -orientation * u2);
  const totalApproach = approach1 + approach2;
  const penetrationShare1 = totalApproach > 0 ? approach1 / totalApproach : 0.5;
  const penetrationShare2 = 1 - penetrationShare1;
  const contactCenterX1 = startX1 + u1 * PIXELS_PER_METER * collisionTime;
  const contactCenterX2 = startX2 + u2 * PIXELS_PER_METER * collisionTime;
  const contactDeltaX = contactCenterX2 - contactCenterX1;
  const contactDeltaY = startY2 - startY1;
  const contactDistance = Math.hypot(contactDeltaX, contactDeltaY);
  const contactNormalX = hasCollision
    ? contactDistance > 1e-10
      ? contactDeltaX / contactDistance
      : orientation
    : 0;
  const contactNormalY =
    hasCollision && contactDistance > 1e-10
      ? contactDeltaY / contactDistance
      : 0;
  const physicalNormalY = -contactNormalY;
  const normalRelativeSpeed = (u1 - u2) * contactNormalX;
  const eccentricV1X =
    u1 - (2 * m2 / (m1 + m2)) * normalRelativeSpeed * contactNormalX;
  const eccentricV1Y =
    -(2 * m2 / (m1 + m2)) * normalRelativeSpeed * physicalNormalY;
  const eccentricV2X =
    u2 + (2 * m1 / (m1 + m2)) * normalRelativeSpeed * contactNormalX;
  const eccentricV2Y =
    (2 * m1 / (m1 + m2)) * normalRelativeSpeed * physicalNormalY;
  const v1x = isPlastic ? commonVelocity : isEccentric ? eccentricV1X : v1;
  const v1y = isPlastic ? 0 : isEccentric ? eccentricV1Y : 0;
  const v2x = isPlastic ? commonVelocity : isEccentric ? eccentricV2X : v2;
  const v2y = isPlastic ? 0 : isEccentric ? eccentricV2Y : 0;
  const finalSpeed1 = Math.hypot(v1x, v1y);
  const finalSpeed2 = Math.hypot(v2x, v2y);
  const finalAngle1 = Math.atan2(v1y, v1x) * 180 / Math.PI;
  const finalAngle2 = Math.atan2(v2y, v2x) * 180 / Math.PI;
  const totalMass = m1 + m2;
  const reducedMass = m1 * m2 / totalMass;
  const contactAngle = Math.atan2(physicalNormalY, contactNormalX);
  const requestedCompoundSeparation = Math.max(
    0,
    (radius1 + radius2 - overlapDepth) / PIXELS_PER_METER,
  );
  const angularMomentum =
    isEccentric && isPlastic && hasCollision
      ? reducedMass * (y2 - y1) * (u1 - u2)
      : 0;
  const intrinsicInertia =
    (2 / 5) * m1 * r1 ** 2 + (2 / 5) * m2 * r2 ** 2;
  const initialKineticEnergy = 0.5 * m1 * u1 ** 2 + 0.5 * m2 * u2 ** 2;
  const translationalKineticEnergy = 0.5 * totalMass * commonVelocity ** 2;
  const availableRotationalEnergy = Math.max(
    0,
    initialKineticEnergy - translationalKineticEnergy,
  );
  const minimumInertiaForEnergy =
    Math.abs(angularMomentum) > 1e-10 && availableRotationalEnergy > 1e-10
      ? angularMomentum ** 2 / (2 * availableRotationalEnergy)
      : 0;
  const minimumSeparationForEnergy =
    reducedMass > 1e-10
      ? Math.sqrt(
          Math.max(0, minimumInertiaForEnergy - intrinsicInertia) /
            reducedMass,
        )
      : 0;
  const compoundSeparation = clamp(
    Math.max(requestedCompoundSeparation, minimumSeparationForEnergy),
    0,
    r1 + r2,
  );
  const compoundInertia =
    intrinsicInertia + reducedMass * compoundSeparation ** 2;
  const angularVelocity =
    compoundInertia > 1e-10 ? angularMomentum / compoundInertia : 0;
  const rotationalKineticEnergy =
    0.5 * compoundInertia * angularVelocity ** 2;
  const systemFinalKineticEnergy = isEccentric && isPlastic
    ? translationalKineticEnergy + rotationalKineticEnergy
    : translationalKineticEnergy;
  const contactCenterOfMassX =
    (m1 * contactCenterX1 + m2 * contactCenterX2) / totalMass;
  const contactCenterOfMassY =
    (m1 * startY1 + m2 * startY2) / totalMass;
  const collisionPointX = hasCollision
    ? contactCenterX1 + contactNormalX * radius1
    : Number.NaN;
  const collisionPointY = hasCollision
    ? startY1 + contactNormalY * radius1
    : Number.NaN;
  const collisionPosition = hasCollision
    ? (collisionPointX - ORIGIN_X) / PIXELS_PER_METER
    : Number.NaN;
  const collisionPositionY = hasCollision
    ? (ORIGIN_Y - collisionPointY) / PIXELS_PER_METER
    : Number.NaN;

  return {
    x1,
    x2,
    y1: isEccentric ? y1 : 0,
    y2: isEccentric ? y2 : 0,
    r1,
    r2,
    m1,
    m2,
    u1,
    u2,
    u1x: u1,
    u1y: 0,
    u2x: u2,
    u2y: 0,
    v1,
    v2,
    v1x,
    v1y,
    v2x,
    v2y,
    finalSpeed1,
    finalSpeed2,
    finalAngle1,
    finalAngle2,
    diameter1,
    diameter2,
    startX1,
    startX2,
    startY1,
    startY2,
    orientation,
    isEccentric,
    isOblique: false,
    pointMass1,
    pointMass2,
    contactNormalX,
    contactNormalY: physicalNormalY,
    isPlastic,
    isInelastic,
    energyLossPercent,
    maximumEnergyLossPercent,
    commonVelocity,
    contactAngle,
    contactCenterOfMassX,
    contactCenterOfMassY,
    compoundSeparation,
    compoundInertia,
    angularMomentum,
    angularVelocity,
    rotationalKineticEnergy,
    systemFinalKineticEnergy,
    overlapDepth,
    penetrationShare1,
    penetrationShare2,
    collisionPointX,
    collisionPointY,
    collisionPosition,
    collisionPositionY,
    hasCollision,
    collisionTime,
    mergeTime,
    finalTime,
  };
}

function positionsAtTime(model, time) {
  if (!model.hasCollision || time <= model.collisionTime) {
    return {
      x1: model.startX1 + model.u1x * PIXELS_PER_METER * time,
      x2: model.startX2 + model.u2x * PIXELS_PER_METER * time,
      y1: model.startY1 - model.u1y * PIXELS_PER_METER * time,
      y2: model.startY2 - model.u2y * PIXELS_PER_METER * time,
    };
  }

  const contactX1 =
    model.startX1 + model.u1x * PIXELS_PER_METER * model.collisionTime;
  const contactX2 =
    model.startX2 + model.u2x * PIXELS_PER_METER * model.collisionTime;
  const contactY1 =
    model.startY1 - model.u1y * PIXELS_PER_METER * model.collisionTime;
  const contactY2 =
    model.startY2 - model.u2y * PIXELS_PER_METER * model.collisionTime;

  if (!model.isPlastic) {
    const elapsedAfterCollision = time - model.collisionTime;
    return {
      x1: contactX1 + model.v1x * PIXELS_PER_METER * elapsedAfterCollision,
      x2: contactX2 + model.v2x * PIXELS_PER_METER * elapsedAfterCollision,
      y1: contactY1 - model.v1y * PIXELS_PER_METER * elapsedAfterCollision,
      y2: contactY2 - model.v2y * PIXELS_PER_METER * elapsedAfterCollision,
    };
  }

  if (model.isOblique) {
    const elapsedAfterCollision = time - model.collisionTime;
    const x =
      ORIGIN_X + model.commonVelocityX * PIXELS_PER_METER * elapsedAfterCollision;
    const y =
      ORIGIN_Y - model.commonVelocityY * PIXELS_PER_METER * elapsedAfterCollision;
    return { x1: x, x2: x, y1: y, y2: y };
  }

  if (model.isEccentric) {
    const elapsedAfterCollision = time - model.collisionTime;
    const mergeProgress = clamp(elapsedAfterCollision / FRAME_STEP, 0, 1);
    const contactSeparation = model.r1 + model.r2;
    const currentSeparation =
      contactSeparation +
      (model.compoundSeparation - contactSeparation) * mergeProgress;
    const angle =
      model.contactAngle + model.angularVelocity * elapsedAfterCollision;
    const normalX = Math.cos(angle);
    const normalY = Math.sin(angle);
    const centerOfMassX =
      model.contactCenterOfMassX +
      model.commonVelocity * PIXELS_PER_METER * elapsedAfterCollision;
    const centerOfMassY = model.contactCenterOfMassY;
    const distance1 =
      (model.m2 / (model.m1 + model.m2)) *
      currentSeparation *
      PIXELS_PER_METER;
    const distance2 =
      (model.m1 / (model.m1 + model.m2)) *
      currentSeparation *
      PIXELS_PER_METER;

    return {
      x1: centerOfMassX - distance1 * normalX,
      x2: centerOfMassX + distance2 * normalX,
      y1: centerOfMassY + distance1 * normalY,
      y2: centerOfMassY - distance2 * normalY,
    };
  }

  const mergeProgress = clamp((time - model.collisionTime) / FRAME_STEP, 0, 1);
  const sharedDisplacement =
    model.commonVelocity * PIXELS_PER_METER * (time - model.collisionTime);
  const penetration1 =
    model.overlapDepth * model.penetrationShare1 * mergeProgress;
  const penetration2 =
    model.overlapDepth * model.penetrationShare2 * mergeProgress;

  return {
    x1: contactX1 + sharedDisplacement + model.orientation * penetration1,
    x2: contactX2 + sharedDisplacement - model.orientation * penetration2,
    y1: model.startY1,
    y2: model.startY2,
  };
}

function positionVelocityVector(
  id,
  originX,
  velocityX,
  originY = ORIGIN_Y,
  velocityY = 0,
) {
  const vector = document.querySelector(`#vector-${id}`);
  const head = document.querySelector(`#vector-${id}-head`);
  const label = document.querySelector(`#vector-${id}-label`);
  const inverseScale = 1 / view.scale;
  const vectorY = originY;
  const endX =
    originX + velocityX * VECTOR_LENGTH_PER_SPEED_PX * inverseScale;
  const endY =
    vectorY - velocityY * VECTOR_LENGTH_PER_SPEED_PX * inverseScale;
  const speed = Math.hypot(velocityX, velocityY);
  const screenDirectionX = speed > 0 ? velocityX / speed : 1;
  const screenDirectionY = speed > 0 ? -velocityY / speed : 0;
  const headLength = VECTOR_HEAD_LENGTH_PX * inverseScale;
  const headBaseX = endX - screenDirectionX * headLength;
  const headBaseY = endY - screenDirectionY * headLength;
  const headHalfHeight = VECTOR_HEAD_HALF_HEIGHT_PX * inverseScale;
  const perpendicularX = -screenDirectionY * headHalfHeight;
  const perpendicularY = screenDirectionX * headHalfHeight;

  vector.setAttribute("x1", originX);
  vector.setAttribute("y1", vectorY);
  vector.setAttribute("x2", endX);
  vector.setAttribute("y2", endY);
  vector.style.strokeWidth = `${VECTOR_STROKE_WIDTH_PX * inverseScale}px`;
  vector.dataset.originX = originX;
  vector.dataset.originY = originY;
  vector.dataset.velocityX = velocityX;
  vector.dataset.velocityY = velocityY;
  vector.style.opacity = speed === 0 ? "0" : "1";
  head.setAttribute(
    "points",
    `${endX},${endY} ${headBaseX + perpendicularX},${headBaseY + perpendicularY} ${headBaseX - perpendicularX},${headBaseY - perpendicularY}`,
  );
  head.style.opacity = speed === 0 ? "0" : "1";
  label.style.left = `${endX}px`;
  label.style.top = `${endY - 17 * inverseScale}px`;
  label.style.fontSize = "17px";
  applyLabelTransform(
    label,
    `translate(-50%, -100%) scale(${inverseScale})`,
  );
}

function updateVector(
  id,
  originX,
  velocity,
  isAfterCollision,
  originY = ORIGIN_Y,
  velocityY = 0,
) {
  const label = document.querySelector(`#vector-${id}-label`);
  positionVelocityVector(id, originX, velocity, originY, velocityY);
  const symbol = id === "u1" ? "u_1" : "u_2";
  const expression = isAfterCollision ? `${symbol}'` : symbol;
  const fallbackSymbol = id === "u1" ? "u₁" : "u₂";
  renderLatex(
    label,
    expression,
    `${fallbackSymbol}${isAfterCollision ? "′" : ""}`,
  );
}

function updateCommonVector(
  originX,
  velocityX,
  originY = ORIGIN_Y,
  velocityY = 0,
) {
  const label = document.querySelector("#vector-common-label");
  positionVelocityVector("common", originX, velocityX, originY, velocityY);
  renderLatex(label, "v'", "v′");
}

function setElementVisible(element, isVisible) {
  element.toggleAttribute("hidden", !isVisible);
  element.style.display = isVisible ? "" : "none";
}

function setSvgLine(line, x1, y1, x2, y2) {
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
}

function setArrowHead(head, tipX, tipY, directionX, directionY, scale = 1) {
  const length = VECTOR_HEAD_LENGTH_PX * scale;
  const halfHeight = VECTOR_HEAD_HALF_HEIGHT_PX * scale;
  const baseX = tipX - directionX * length;
  const baseY = tipY - directionY * length;
  const perpendicularX = -directionY * halfHeight;
  const perpendicularY = directionX * halfHeight;
  head.setAttribute(
    "points",
    `${tipX},${tipY} ${baseX + perpendicularX},${baseY + perpendicularY} ${baseX - perpendicularX},${baseY - perpendicularY}`,
  );
}

function labelOffset(element) {
  return {
    x: Number(element.dataset.labelOffsetX) || 0,
    y: Number(element.dataset.labelOffsetY) || 0,
  };
}

function applyLabelTransform(element, baseTransform = "") {
  const offset = labelOffset(element);
  element.dataset.labelBaseTransform = baseTransform;
  const offsetTransform = `translate(${offset.x}px, ${offset.y}px)`;
  element.style.transform = baseTransform
    ? `${baseTransform} ${offsetTransform}`
    : offsetTransform;
}

function positionGeometryLabel(label, x, y, expression) {
  const inverseScale = 1 / view.scale;
  label.style.left = `${x}px`;
  label.style.top = `${y}px`;
  applyLabelTransform(
    label,
    `translate(-50%, -50%) scale(${inverseScale})`,
  );
  setElementVisible(label, true);
  renderLatex(label, expression);
}

function drawComponentVector(key, originX, originY, axisX, axisY, value, expression) {
  const inverseScale = 1 / view.scale;
  const line = document.querySelector(`#component-${key}`);
  const head = document.querySelector(`#component-${key}-head`);
  const label = geometryLabels[key.replace("-", "")];
  const isVisible = Math.abs(value) > 1e-8;
  setElementVisible(line, isVisible);
  setElementVisible(head, isVisible);
  setElementVisible(label, isVisible);
  if (!isVisible) return { x: originX, y: originY, isVisible: false };

  const endX =
    originX + axisX * value * VECTOR_LENGTH_PER_SPEED_PX * inverseScale;
  const endY =
    originY + axisY * value * VECTOR_LENGTH_PER_SPEED_PX * inverseScale;
  const sign = Math.sign(value) || 1;
  const directionX = axisX * sign;
  const directionY = axisY * sign;
  setSvgLine(line, originX, originY, endX, endY);
  line.style.strokeWidth = `${GEOMETRY_COMPONENT_STROKE_PX * inverseScale}px`;
  line.style.strokeDasharray = "none";
  setArrowHead(head, endX, endY, directionX, directionY, inverseScale);

  const labelOffsetX = -axisY * 13 * inverseScale;
  const labelOffsetY = axisX * 13 * inverseScale;
  positionGeometryLabel(
    label,
    (originX + endX) / 2 + labelOffsetX,
    (originY + endY) / 2 + labelOffsetY,
    expression,
  );
  return { x: endX, y: endY, isVisible: true };
}

function drawComponentProjections(
  bodyId,
  originX,
  originY,
  axisX,
  axisY,
  tangentX,
  tangentY,
  componentX,
  componentY,
) {
  const inverseScale = 1 / view.scale;
  const fromX = document.querySelector(`#projection-${bodyId}-from-x`);
  const fromY = document.querySelector(`#projection-${bodyId}-from-y`);
  const showProjection =
    Math.abs(componentX) > 1e-8 && Math.abs(componentY) > 1e-8;
  setElementVisible(fromX, showProjection);
  setElementVisible(fromY, showProjection);
  if (!showProjection) return;

  const xEndX =
    originX + axisX * componentX * VECTOR_LENGTH_PER_SPEED_PX * inverseScale;
  const xEndY =
    originY + axisY * componentX * VECTOR_LENGTH_PER_SPEED_PX * inverseScale;
  const yEndX =
    originX + tangentX * componentY * VECTOR_LENGTH_PER_SPEED_PX * inverseScale;
  const yEndY =
    originY + tangentY * componentY * VECTOR_LENGTH_PER_SPEED_PX * inverseScale;
  const totalEndX = xEndX + (yEndX - originX);
  const totalEndY = xEndY + (yEndY - originY);
  setSvgLine(fromX, xEndX, xEndY, totalEndX, totalEndY);
  setSvgLine(fromY, yEndX, yEndY, totalEndX, totalEndY);
  [fromX, fromY].forEach((projection) => {
    projection.style.strokeWidth = `${inverseScale}px`;
    projection.style.strokeDasharray = `${5 * inverseScale} ${4 * inverseScale}`;
  });
}

function visibleLineSegment(originX, originY, directionX, directionY) {
  const left = -view.x / view.scale;
  const right = (simulationViewport.clientWidth - view.x) / view.scale;
  const top = -view.y / view.scale;
  const bottom = (simulationViewport.clientHeight - view.y) / view.scale;
  let minimum = Number.NEGATIVE_INFINITY;
  let maximum = Number.POSITIVE_INFINITY;

  function includeRange(origin, direction, lower, upper) {
    if (Math.abs(direction) < 1e-10) {
      return origin >= lower && origin <= upper;
    }
    const first = (lower - origin) / direction;
    const second = (upper - origin) / direction;
    minimum = Math.max(minimum, Math.min(first, second));
    maximum = Math.min(maximum, Math.max(first, second));
    return minimum <= maximum;
  }

  if (
    !includeRange(originX, directionX, left, right) ||
    !includeRange(originY, directionY, top, bottom)
  ) {
    return null;
  }

  return {
    startX: originX + directionX * minimum,
    startY: originY + directionY * minimum,
    endX: originX + directionX * maximum,
    endY: originY + directionY * maximum,
  };
}

function visibleRaySegment(originX, originY, directionX, directionY) {
  const left = -view.x / view.scale;
  const right = (simulationViewport.clientWidth - view.x) / view.scale;
  const top = -view.y / view.scale;
  const bottom = (simulationViewport.clientHeight - view.y) / view.scale;
  let minimum = 0;
  let maximum = Number.POSITIVE_INFINITY;

  function includeRange(origin, direction, lower, upper) {
    if (Math.abs(direction) < 1e-10) {
      return origin >= lower && origin <= upper;
    }
    const first = (lower - origin) / direction;
    const second = (upper - origin) / direction;
    minimum = Math.max(minimum, Math.min(first, second));
    maximum = Math.min(maximum, Math.max(first, second));
    return minimum <= maximum;
  }

  if (
    !includeRange(originX, directionX, left, right) ||
    !includeRange(originY, directionY, top, bottom)
  ) {
    return null;
  }

  return {
    startX: originX + directionX * minimum,
    startY: originY + directionY * minimum,
    endX: originX + directionX * maximum,
    endY: originY + directionY * maximum,
  };
}

function angleArcPath(centerX, centerY, radius, physicalAngle) {
  const segmentCount = Math.max(
    8,
    Math.ceil(Math.abs(physicalAngle) / (Math.PI / 30)),
  );
  const points = [];
  for (let index = 0; index <= segmentCount; index += 1) {
    const angle = physicalAngle * (index / segmentCount);
    points.push({
      x: centerX + radius * Math.cos(angle),
      y: centerY - radius * Math.sin(angle),
    });
  }
  return points
    .map(
      (point, index) =>
        `${index === 0 ? "M" : "L"}${point.x},${point.y}`,
    )
    .join(" ");
}

function angleArcBetweenPath(centerX, centerY, radius, startAngle, sweepAngle) {
  const segmentCount = Math.max(
    8,
    Math.ceil(Math.abs(sweepAngle) / (Math.PI / 30)),
  );
  const points = [];
  for (let index = 0; index <= segmentCount; index += 1) {
    const angle = startAngle + sweepAngle * (index / segmentCount);
    points.push({
      x: centerX + radius * Math.cos(angle),
      y: centerY - radius * Math.sin(angle),
    });
  }
  return points
    .map(
      (point, index) =>
        `${index === 0 ? "M" : "L"}${point.x},${point.y}`,
    )
    .join(" ");
}

function normalizedSignedAngle(angle) {
  return Math.atan2(Math.sin(angle), Math.cos(angle));
}

function hideObliqueVelocityComponents() {
  setElementVisible(collisionCoordinateSystem, false);
  [
    geometryLabels.axisX,
    geometryLabels.axisY,
    geometryLabels.u1x,
    geometryLabels.u1y,
    geometryLabels.u2x,
    geometryLabels.u2y,
  ].forEach((label) => setElementVisible(label, false));
}

function hideComponentBody(bodyId) {
  [
    `#projection-${bodyId}-from-x`,
    `#projection-${bodyId}-from-y`,
    `#component-${bodyId}-x`,
    `#component-${bodyId}-x-head`,
    `#component-${bodyId}-y`,
    `#component-${bodyId}-y-head`,
  ].forEach((selector) =>
    setElementVisible(document.querySelector(selector), false),
  );
  setElementVisible(geometryLabels[`${bodyId}x`], false);
  setElementVisible(geometryLabels[`${bodyId}y`], false);
}

function setComponentBodyPalette(bodyId, palette) {
  [
    `#projection-${bodyId}-from-x`,
    `#projection-${bodyId}-from-y`,
    `#component-${bodyId}-x`,
    `#component-${bodyId}-y`,
  ].forEach((selector) => {
    const element = document.querySelector(selector);
    element.classList.remove("component-m1", "component-m2", "component-common");
    element.classList.add(`component-${palette}`);
  });
  [`#component-${bodyId}-x-head`, `#component-${bodyId}-y-head`].forEach(
    (selector) => {
      const element = document.querySelector(selector);
      element.classList.remove(
        "component-m1-head",
        "component-m2-head",
        "component-common-head",
      );
      element.classList.add(`component-${palette}-head`);
    },
  );
  [geometryLabels[`${bodyId}x`], geometryLabels[`${bodyId}y`]].forEach(
    (label) => {
      label.classList.remove(
        "geometry-label-m1",
        "geometry-label-m2",
        "geometry-label-common",
      );
      label.classList.add(`geometry-label-${palette}`);
    },
  );
}

function renderObliqueVelocityComponents(model) {
  const phase = playback.collisionSnapshot;
  const isBefore = phase === "before";
  const isAfter = phase === "after";
  if (!isBefore && !isAfter) {
    hideObliqueVelocityComponents();
    return;
  }

  setElementVisible(collisionCoordinateSystem, true);
  [
    "#collision-axis-x",
    "#collision-axis-x-head",
    "#collision-axis-y",
    "#collision-axis-y-head",
  ].forEach((selector) =>
    setElementVisible(document.querySelector(selector), false),
  );
  setElementVisible(geometryLabels.axisX, false);
  setElementVisible(geometryLabels.axisY, false);

  const drawBody = (
    bodyId,
    velocityX,
    velocityY,
    prime,
    expressions = null,
  ) => {
    drawComponentProjections(
      bodyId,
      ORIGIN_X,
      ORIGIN_Y,
      1,
      0,
      0,
      -1,
      velocityX,
      velocityY,
    );
    drawComponentVector(
      `${bodyId}-x`,
      ORIGIN_X,
      ORIGIN_Y,
      1,
      0,
      velocityX,
      expressions?.x ?? `u${prime}_{x${bodyId.slice(-1)}}`,
    );
    drawComponentVector(
      `${bodyId}-y`,
      ORIGIN_X,
      ORIGIN_Y,
      0,
      -1,
      velocityY,
      expressions?.y ?? `u${prime}_{y${bodyId.slice(-1)}}`,
    );
  };

  if (isBefore) {
    setComponentBodyPalette("u2", "m2");
    hideComponentBody("u1");
    drawBody("u2", model.u2x, model.u2y, "");
  } else if (model.isPlastic) {
    setComponentBodyPalette("u1", "common");
    hideComponentBody("u2");
    drawBody(
      "u1",
      model.commonVelocityX,
      model.commonVelocityY,
      "",
      { x: "v'_x", y: "v'_y" },
    );
  } else {
    setComponentBodyPalette("u1", "m1");
    setComponentBodyPalette("u2", "m2");
    drawBody("u1", model.v1x, model.v1y, "'");
    drawBody("u2", model.v2x, model.v2y, "'");
  }
}

function renderWallVelocityComponents(model) {
  const phase = playback.collisionSnapshot;
  const isBefore = phase === "before";
  const isAfter = phase === "after";
  const velocityX = isAfter ? model.v1x : model.u1x;
  const velocityY = isAfter ? model.v1y : model.u1y;
  const hasTwoComponents =
    model.theta > 0 &&
    Math.abs(velocityX) > 1e-8 &&
    Math.abs(velocityY) > 1e-8;

  if ((!isBefore && !isAfter) || !hasTwoComponents) {
    hideObliqueVelocityComponents();
    return;
  }

  setElementVisible(collisionCoordinateSystem, true);
  [
    "#collision-axis-x",
    "#collision-axis-x-head",
    "#collision-axis-y",
    "#collision-axis-y-head",
  ].forEach((selector) =>
    setElementVisible(document.querySelector(selector), false),
  );
  setElementVisible(geometryLabels.axisX, false);
  setElementVisible(geometryLabels.axisY, false);
  hideComponentBody("u2");
  setComponentBodyPalette("u1", "m1");

  drawComponentProjections(
    "u1",
    ORIGIN_X,
    ORIGIN_Y,
    1,
    0,
    0,
    -1,
    velocityX,
    velocityY,
  );
  drawComponentVector(
    "u1-x",
    ORIGIN_X,
    ORIGIN_Y,
    1,
    0,
    velocityX,
    isAfter ? "u'_x" : "u_x",
  );
  drawComponentVector(
    "u1-y",
    ORIGIN_X,
    ORIGIN_Y,
    0,
    -1,
    velocityY,
    isAfter ? "u'_y" : "u_y",
  );
}

function renderMassiveWallGeometricFeatures(model, isAfterCollision) {
  const inverseScale = 1 / view.scale;
  const incomingTrajectory = document.querySelector("#oblique-trajectory-1");
  const unusedIncomingTrajectory = document.querySelector(
    "#oblique-trajectory-2",
  );
  const outgoingTrajectory = document.querySelector(
    "#oblique-outgoing-trajectory-1",
  );
  const unusedOutgoingTrajectory = document.querySelector(
    "#oblique-outgoing-trajectory-2",
  );
  const incidenceArc = document.querySelector("#oblique-angle-arc");
  const reflectionArc = document.querySelector("#oblique-phi-angle-arc");
  const commonAngleHead = document.querySelector(
    "#oblique-common-angle-head",
  );
  const angle = model.theta * Math.PI / 180;
  const reflectionAngle = model.reflectionAngle * Math.PI / 180;

  setElementVisible(trajectoryCarriers, false);
  setElementVisible(outgoingGeometry, false);
  setElementVisible(unusedIncomingTrajectory, false);
  setElementVisible(unusedOutgoingTrajectory, false);
  setElementVisible(commonAngleHead, false);
  [
    geometryLabels.d,
    geometryLabels.theta1,
    geometryLabels.theta2,
    geometryLabels.axisX,
    geometryLabels.axisY,
    geometryLabels.u1x,
    geometryLabels.u1y,
    geometryLabels.u2x,
    geometryLabels.u2y,
  ].forEach((label) => setElementVisible(label, false));

  setSvgLine(
    incomingTrajectory,
    model.startX1,
    model.startY1,
    ORIGIN_X,
    ORIGIN_Y,
  );
  setElementVisible(incomingTrajectory, true);
  incomingTrajectory.style.strokeWidth = `${inverseScale}px`;
  incomingTrajectory.style.strokeDasharray = `${7 * inverseScale} ${6 * inverseScale}`;

  const showIncidenceAngle = angle > 1e-5;
  setElementVisible(incidenceArc, showIncidenceAngle);
  setElementVisible(geometryLabels.obliqueTheta, showIncidenceAngle);
  if (showIncidenceAngle) {
    const radius = 42 * inverseScale;
    incidenceArc.setAttribute(
      "d",
      angleArcBetweenPath(
        ORIGIN_X,
        ORIGIN_Y,
        radius,
        Math.PI,
        angle,
      ),
    );
    incidenceArc.style.strokeWidth = `${1.5 * inverseScale}px`;
    positionGeometryLabel(
      geometryLabels.obliqueTheta,
      ORIGIN_X +
        (radius + 17 * inverseScale) * Math.cos(Math.PI + angle / 2),
      ORIGIN_Y -
        (radius + 17 * inverseScale) * Math.sin(Math.PI + angle / 2),
      "\\varphi",
    );
  }

  if (isAfterCollision) {
    const speed = Math.hypot(model.v1x, model.v1y);
    const segment =
      speed > 1e-10
        ? visibleRaySegment(
            ORIGIN_X,
            ORIGIN_Y,
            model.v1x / speed,
            -model.v1y / speed,
          )
        : null;
    setElementVisible(outgoingTrajectory, Boolean(segment));
    if (segment) {
      setSvgLine(
        outgoingTrajectory,
        segment.startX,
        segment.startY,
        segment.endX,
        segment.endY,
      );
    }
    outgoingTrajectory.classList.remove("outgoing-carrier-common");
    outgoingTrajectory.classList.add("wall-outgoing-carrier");
    outgoingTrajectory.style.strokeWidth = `${inverseScale}px`;
    outgoingTrajectory.style.strokeDasharray = `${7 * inverseScale} ${6 * inverseScale}`;

    const showReflectionAngle =
      showIncidenceAngle &&
      speed > 1e-10 &&
      Number.isFinite(reflectionAngle) &&
      playback.collisionSnapshot !== "after" &&
      playback.time >= model.collisionTime + FRAME_STEP - 1e-9;
    setElementVisible(reflectionArc, showReflectionAngle);
    setElementVisible(geometryLabels.obliquePhi, showReflectionAngle);
    reflectionArc.classList.remove("outgoing-angle-common");
    reflectionArc.classList.add("wall-reflection-angle");
    geometryLabels.obliquePhi.classList.remove("geometry-label-common");
    geometryLabels.obliquePhi.classList.add("geometry-label-m1");
    if (showReflectionAngle) {
      const radius = 52 * inverseScale;
      reflectionArc.setAttribute(
        "d",
        angleArcBetweenPath(
          ORIGIN_X,
          ORIGIN_Y,
          radius,
          Math.PI,
          -reflectionAngle,
        ),
      );
      reflectionArc.style.strokeWidth = `${1.5 * inverseScale}px`;
      positionGeometryLabel(
        geometryLabels.obliquePhi,
        ORIGIN_X +
          (radius + 17 * inverseScale) *
            Math.cos(Math.PI - reflectionAngle / 2),
        ORIGIN_Y -
          (radius + 17 * inverseScale) *
            Math.sin(Math.PI - reflectionAngle / 2),
        "\\theta",
      );
    }
  } else {
    setElementVisible(outgoingTrajectory, false);
    setElementVisible(reflectionArc, false);
    setElementVisible(geometryLabels.obliquePhi, false);
  }

  renderWallVelocityComponents(model);
  setElementVisible(obliqueGeometry, true);
}

function renderObliqueGeometricFeatures(model, isAfterCollision) {
  const inverseScale = 1 / view.scale;
  const trajectory1 = document.querySelector("#oblique-trajectory-1");
  const trajectory2 = document.querySelector("#oblique-trajectory-2");
  const outgoingTrajectory1 = document.querySelector(
    "#oblique-outgoing-trajectory-1",
  );
  const outgoingTrajectory2 = document.querySelector(
    "#oblique-outgoing-trajectory-2",
  );
  const thetaArc = document.querySelector("#oblique-angle-arc");
  const phiArc = document.querySelector("#oblique-phi-angle-arc");
  const commonAngleHead = document.querySelector(
    "#oblique-common-angle-head",
  );
  const originX = ORIGIN_X;
  const originY = ORIGIN_Y;

  setElementVisible(trajectoryCarriers, false);
  setElementVisible(outgoingGeometry, false);
  hideObliqueVelocityComponents();
  [
    geometryLabels.d,
    geometryLabels.theta1,
    geometryLabels.theta2,
    geometryLabels.axisX,
    geometryLabels.axisY,
    geometryLabels.u1x,
    geometryLabels.u1y,
    geometryLabels.u2x,
    geometryLabels.u2y,
  ].forEach((label) => setElementVisible(label, false));

  setSvgLine(
    trajectory1,
    model.startX1,
    model.startY1,
    originX,
    originY,
  );
  setSvgLine(
    trajectory2,
    model.startX2,
    model.startY2,
    originX,
    originY,
  );
  setElementVisible(trajectory1, true);
  setElementVisible(trajectory2, true);

  const thetaStart = Math.PI;
  const thetaSweep = model.theta * Math.PI / 180;
  const showTheta = Math.abs(thetaSweep) > 1e-5;
  setElementVisible(thetaArc, showTheta);
  setElementVisible(geometryLabels.obliqueTheta, showTheta);
  if (showTheta) {
    const thetaRadius = 42 * inverseScale;
    thetaArc.setAttribute(
      "d",
      angleArcBetweenPath(
        originX,
        originY,
        thetaRadius,
        thetaStart,
        thetaSweep,
      ),
    );
    thetaArc.style.strokeWidth = `${1.5 * inverseScale}px`;
    const thetaMiddle = thetaStart + thetaSweep / 2;
    positionGeometryLabel(
      geometryLabels.obliqueTheta,
      originX + (thetaRadius + 17 * inverseScale) * Math.cos(thetaMiddle),
      originY - (thetaRadius + 17 * inverseScale) * Math.sin(thetaMiddle),
      "\\varphi",
    );
  }

  if (!isAfterCollision) {
    setElementVisible(outgoingTrajectory1, false);
    setElementVisible(outgoingTrajectory2, false);
    setElementVisible(phiArc, false);
    setElementVisible(commonAngleHead, false);
    setElementVisible(geometryLabels.obliquePhi, false);
    setElementVisible(outgoingGeometry, false);
  } else {
    const showFinalAngles =
      playback.collisionSnapshot !== "after" &&
      playback.time >= model.collisionTime + FRAME_STEP - 1e-9;
    if (model.isPlastic) {
      setElementVisible(outgoingGeometry, false);
      setElementVisible(outgoingTrajectory2, false);
      const speed = Math.hypot(
        model.commonVelocityX,
        model.commonVelocityY,
      );
      const segment =
        speed > 1e-10
          ? visibleRaySegment(
              originX,
              originY,
              model.commonVelocityX / speed,
              -model.commonVelocityY / speed,
            )
          : null;
      setElementVisible(outgoingTrajectory1, Boolean(segment));
      if (segment) {
        setSvgLine(
          outgoingTrajectory1,
          segment.startX,
          segment.startY,
          segment.endX,
          segment.endY,
        );
      }
      outgoingTrajectory1.classList.remove("wall-outgoing-carrier");
      outgoingTrajectory1.classList.add("outgoing-carrier-common");
      phiArc.classList.remove("wall-reflection-angle");
      phiArc.classList.add("outgoing-angle-common");
      geometryLabels.obliquePhi.classList.remove("geometry-label-m1");
      geometryLabels.obliquePhi.classList.add("geometry-label-common");

      const showAngleLabel = showFinalAngles && speed > 1e-10;
      if (showAngleLabel) {
        renderOutgoingAngle(
          originX,
          originY,
          model.commonVelocityX,
          model.commonVelocityY,
          phiArc,
          commonAngleHead,
          geometryLabels.obliquePhi,
          "\\theta",
        );
      } else {
        setElementVisible(phiArc, false);
        setElementVisible(commonAngleHead, false);
        setElementVisible(geometryLabels.obliquePhi, false);
      }
    } else {
      setElementVisible(outgoingTrajectory1, false);
      setElementVisible(outgoingTrajectory2, false);
      setElementVisible(phiArc, false);
      setElementVisible(commonAngleHead, false);
      setElementVisible(geometryLabels.obliquePhi, false);
      renderOutgoingGeometry(
        originX,
        originY,
        originX,
        originY,
        model,
        showFinalAngles,
      );
    }
  }

  [
    trajectory1,
    trajectory2,
    outgoingTrajectory1,
    outgoingTrajectory2,
  ].forEach((trajectory) => {
    trajectory.style.strokeWidth = `${inverseScale}px`;
    trajectory.style.strokeDasharray = `${7 * inverseScale} ${6 * inverseScale}`;
  });

  renderObliqueVelocityComponents(model);
  setElementVisible(obliqueGeometry, true);
}

function renderOutgoingAngle(
  centerX,
  centerY,
  velocityX,
  velocityY,
  arc,
  head,
  label,
  expression,
) {
  const inverseScale = 1 / view.scale;
  const angle = Math.atan2(velocityY, velocityX);
  const hasArc = Math.abs(angle) > 1e-5;
  const radius = 38 * inverseScale;

  setElementVisible(arc, hasArc);
  setElementVisible(head, hasArc);
  if (hasArc) {
    arc.setAttribute("d", angleArcPath(centerX, centerY, radius, angle));
    arc.style.strokeWidth = `${1.5 * inverseScale}px`;

    const tipX = centerX + radius * Math.cos(angle);
    const tipY = centerY - radius * Math.sin(angle);
    const directionSign = Math.sign(angle);
    setArrowHead(
      head,
      tipX,
      tipY,
      -Math.sin(angle) * directionSign,
      -Math.cos(angle) * directionSign,
      0.72 * inverseScale,
    );
  }

  const labelRadius = radius + 17 * inverseScale;
  const labelAngle = angle / 2;
  const zeroAngleOffset = hasArc ? 0 : -13 * inverseScale;
  positionGeometryLabel(
    label,
    centerX + labelRadius * Math.cos(labelAngle),
    centerY - labelRadius * Math.sin(labelAngle) + zeroAngleOffset,
    expression,
  );
}

function renderOutgoingGeometry(x1, y1, x2, y2, model, showAngles) {
  const inverseScale = 1 / view.scale;
  const carrier1 = document.querySelector("#outgoing-carrier-u1");
  const carrier2 = document.querySelector("#outgoing-carrier-u2");
  const rays = [
    {
      carrier: carrier1,
      arc: document.querySelector("#outgoing-angle-arc-u1"),
      head: document.querySelector("#outgoing-angle-head-u1"),
      label: geometryLabels.theta1,
      expression: "\\theta_1",
      x: x1,
      y: y1,
      vx: model.v1x,
      vy: model.v1y,
    },
    {
      carrier: carrier2,
      arc: document.querySelector("#outgoing-angle-arc-u2"),
      head: document.querySelector("#outgoing-angle-head-u2"),
      label: geometryLabels.theta2,
      expression: "\\theta_2",
      x: x2,
      y: y2,
      vx: model.v2x,
      vy: model.v2y,
    },
  ];
  let visibleRayCount = 0;

  rays.forEach(({ carrier, arc, head, label, expression, x, y, vx, vy }) => {
    const speed = Math.hypot(vx, vy);
    if (speed < 1e-10) {
      setElementVisible(carrier, false);
      setElementVisible(arc, false);
      setElementVisible(head, false);
      setElementVisible(label, false);
      return;
    }

    const segment = visibleRaySegment(x, y, vx / speed, -vy / speed);
    setElementVisible(carrier, Boolean(segment));
    if (!segment) {
      setElementVisible(arc, false);
      setElementVisible(head, false);
      setElementVisible(label, false);
      return;
    }

    visibleRayCount += 1;
    setSvgLine(
      carrier,
      segment.startX,
      segment.startY,
      segment.endX,
      segment.endY,
    );
    carrier.style.strokeWidth = `${inverseScale}px`;
    carrier.style.strokeDasharray = `${7 * inverseScale} ${6 * inverseScale}`;
    if (showAngles) {
      renderOutgoingAngle(
        x,
        y,
        vx,
        vy,
        arc,
        head,
        label,
        expression,
      );
    } else {
      setElementVisible(arc, false);
      setElementVisible(head, false);
      setElementVisible(label, false);
    }
  });

  setElementVisible(outgoingGeometry, visibleRayCount > 0);
}

function renderGeometricFeatures() {
  const model = playback.model;
  const isEnabled = Boolean(
    ((model?.isEccentric && !model.isPlastic) ||
      model?.isOblique ||
      model?.isMassiveWall) &&
      geometricFeaturesCheckbox.checked,
  );
  setElementVisible(geometryLayer, isEnabled);
  if (!isEnabled) {
    setElementVisible(obliqueGeometry, false);
    Object.values(geometryLabels).forEach((label) =>
      setElementVisible(label, false),
    );
    return;
  }

  const phase = playback.collisionSnapshot;
  const isAfterCollision =
    model.hasCollision &&
    (phase === "after" ||
      (phase !== "before" && playback.time >= model.collisionTime));
  if (model.isMassiveWall) {
    renderMassiveWallGeometricFeatures(model, isAfterCollision);
    return;
  }
  if (model.isOblique) {
    renderObliqueGeometricFeatures(model, isAfterCollision);
    return;
  }

  setElementVisible(obliqueGeometry, false);

  const inverseScale = 1 / view.scale;
  const carrier1 = document.querySelector("#carrier-u1");
  const carrier2 = document.querySelector("#carrier-u2");
  const dimension = document.querySelector("#distance-d");
  const dimensionCap1 = document.querySelector("#distance-d-cap-1");
  const dimensionCap2 = document.querySelector("#distance-d-cap-2");
  const carrierStartX = -10000;
  const carrierEndX = 10000;
  const visibleLeft = -view.x / view.scale;
  const dimensionX = visibleLeft + 43 * inverseScale;
  const capHalfWidth = 7 * inverseScale;
  setElementVisible(trajectoryCarriers, true);
  setSvgLine(
    carrier1,
    carrierStartX,
    model.startY1,
    carrierEndX,
    model.startY1,
  );
  setSvgLine(
    carrier2,
    carrierStartX,
    model.startY2,
    carrierEndX,
    model.startY2,
  );
  [carrier1, carrier2].forEach((carrier) => {
    carrier.style.strokeWidth = `${inverseScale}px`;
    carrier.style.strokeDasharray = `${7 * inverseScale} ${6 * inverseScale}`;
  });
  setSvgLine(
    dimension,
    dimensionX,
    model.startY1,
    dimensionX,
    model.startY2,
  );
  setSvgLine(
    dimensionCap1,
    dimensionX - capHalfWidth,
    model.startY1,
    dimensionX + capHalfWidth,
    model.startY1,
  );
  setSvgLine(
    dimensionCap2,
    dimensionX - capHalfWidth,
    model.startY2,
    dimensionX + capHalfWidth,
    model.startY2,
  );
  [dimension, dimensionCap1, dimensionCap2].forEach((line) => {
    line.style.strokeWidth = `${inverseScale}px`;
  });
  positionGeometryLabel(
    geometryLabels.d,
    visibleLeft + 20 * inverseScale,
    (model.startY1 + model.startY2) / 2,
    "d",
  );

  if (isAfterCollision) {
    const positions = positionsAtTime(model, model.collisionTime);
    const showOutgoingAngles =
      playback.time >= model.collisionTime + 2 * FRAME_STEP - 1e-9;
    renderOutgoingGeometry(
      positions.x1,
      positions.y1,
      positions.x2,
      positions.y2,
      model,
      showOutgoingAngles,
    );
  } else {
    setElementVisible(outgoingGeometry, false);
    setElementVisible(geometryLabels.theta1, false);
    setElementVisible(geometryLabels.theta2, false);
  }

  const showDecomposition =
    model.hasCollision && (phase === "before" || phase === "after");
  setElementVisible(collisionCoordinateSystem, showDecomposition);
  [
    geometryLabels.axisX,
    geometryLabels.axisY,
    geometryLabels.u1x,
    geometryLabels.u1y,
    geometryLabels.u2x,
    geometryLabels.u2y,
  ].forEach((label) => setElementVisible(label, showDecomposition));
  if (!showDecomposition) return;

  const { x1, x2, y1, y2 } = positionsAtTime(model, playback.time);
  const normalX = model.contactNormalX;
  const normalY = model.contactNormalY;
  const normalScreenX = normalX;
  const normalScreenY = -normalY;
  const tangentX = -normalY;
  const tangentY = normalX;
  const tangentScreenX = tangentX;
  const tangentScreenY = -tangentY;
  const axisXLine = document.querySelector("#collision-axis-x");
  const axisYLine = document.querySelector("#collision-axis-y");
  const axisXHead = document.querySelector("#collision-axis-x-head");
  const axisYHead = document.querySelector("#collision-axis-y-head");
  const xSegment = visibleLineSegment(
    x1,
    y1,
    normalScreenX,
    normalScreenY,
  );
  const ySegment = visibleLineSegment(
    x1,
    y1,
    tangentScreenX,
    tangentScreenY,
  );
  if (!xSegment || !ySegment) {
    setElementVisible(collisionCoordinateSystem, false);
    [geometryLabels.axisX, geometryLabels.axisY].forEach((label) =>
      setElementVisible(label, false),
    );
    return;
  }

  setSvgLine(
    axisXLine,
    xSegment.startX,
    xSegment.startY,
    xSegment.endX,
    xSegment.endY,
  );
  setSvgLine(
    axisYLine,
    ySegment.startX,
    ySegment.startY,
    ySegment.endX,
    ySegment.endY,
  );
  [axisXLine, axisYLine].forEach((axis) => {
    axis.style.strokeWidth = `${inverseScale}px`;
  });
  const axisXTipX = xSegment.endX - normalScreenX * 7 * inverseScale;
  const axisXTipY = xSegment.endY - normalScreenY * 7 * inverseScale;
  const axisYTipX = ySegment.endX - tangentScreenX * 7 * inverseScale;
  const axisYTipY = ySegment.endY - tangentScreenY * 7 * inverseScale;
  setArrowHead(
    axisXHead,
    axisXTipX,
    axisXTipY,
    normalScreenX,
    normalScreenY,
    inverseScale,
  );
  setArrowHead(
    axisYHead,
    axisYTipX,
    axisYTipY,
    tangentScreenX,
    tangentScreenY,
    inverseScale,
  );
  positionGeometryLabel(
    geometryLabels.axisX,
    xSegment.endX - normalScreenX * 27 * inverseScale + tangentScreenX * 10 * inverseScale,
    xSegment.endY - normalScreenY * 27 * inverseScale + tangentScreenY * 10 * inverseScale,
    "x'",
  );
  positionGeometryLabel(
    geometryLabels.axisY,
    ySegment.endX - tangentScreenX * 27 * inverseScale - normalScreenX * 10 * inverseScale,
    ySegment.endY - tangentScreenY * 27 * inverseScale - normalScreenY * 10 * inverseScale,
    "y'",
  );

  const isAfter = phase === "after";
  const velocity1X = isAfter ? model.v1x : model.u1;
  const velocity1Y = isAfter ? model.v1y : 0;
  const velocity2X = isAfter ? model.v2x : model.u2;
  const velocity2Y = isAfter ? model.v2y : 0;
  const component1X = velocity1X * normalX + velocity1Y * normalY;
  const component1Y = velocity1X * tangentX + velocity1Y * tangentY;
  const component2X = velocity2X * normalX + velocity2Y * normalY;
  const component2Y = velocity2X * tangentX + velocity2Y * tangentY;
  const prime = isAfter ? "'" : "";

  drawComponentProjections(
    "u1",
    x1,
    y1,
    normalScreenX,
    normalScreenY,
    tangentScreenX,
    tangentScreenY,
    component1X,
    component1Y,
  );
  drawComponentProjections(
    "u2",
    x2,
    y2,
    normalScreenX,
    normalScreenY,
    tangentScreenX,
    tangentScreenY,
    component2X,
    component2Y,
  );
  drawComponentVector(
    "u1-x",
    x1,
    y1,
    normalScreenX,
    normalScreenY,
    component1X,
    `u${prime}_{x1}`,
  );
  drawComponentVector(
    "u1-y",
    x1,
    y1,
    tangentScreenX,
    tangentScreenY,
    component1Y,
    `u${prime}_{y1}`,
  );
  drawComponentVector(
    "u2-x",
    x2,
    y2,
    normalScreenX,
    normalScreenY,
    component2X,
    `u${prime}_{x2}`,
  );
  drawComponentVector(
    "u2-y",
    x2,
    y2,
    tangentScreenX,
    tangentScreenY,
    component2Y,
    `u${prime}_{y2}`,
  );
}

function positionMassLabel(label, centerX, centerY, radius) {
  label.style.left = `${centerX}px`;
  label.style.top = `${centerY + radius + 16 / view.scale}px`;
  label.dataset.centerX = centerX;
  label.dataset.centerY = centerY;
  label.dataset.radius = radius;
  applyLabelTransform(
    label,
    `translateX(-50%) scale(${1 / view.scale})`,
  );
}

function updateResults(model, isAfterCollision) {
  const k1 = 0.5 * model.m1 * model.u1 ** 2;
  const k2 = 0.5 * model.m2 * model.u2 ** 2;
  const finalK1 = 0.5 * model.m1 * model.finalSpeed1 ** 2;
  const finalK2 = 0.5 * model.m2 * model.finalSpeed2 ** 2;
  const systemFinalK = model.isPlastic
    ? model.systemFinalKineticEnergy
    : finalK1 + finalK2;
  const energyLoss = Math.abs(k1 + k2 - systemFinalK);
  resultsPanel.hidden = false;
  const isMassiveWall = Boolean(model.isMassiveWall);
  positionResultsHeading.hidden = isMassiveWall;
  positionResultsGrid.hidden = isMassiveWall;
  standardVelocityResults.hidden = isMassiveWall;
  massiveWallVelocityResults.hidden = !isMassiveWall;
  standardEnergyResults.hidden = isMassiveWall;
  massiveWallEnergyResults.hidden = !isMassiveWall;

  if (isMassiveWall) {
    const kineticEnergy = 0.5 * model.m1 * model.u1 ** 2;
    renderMeasurement(
      "#result-wall-u",
      model.u1,
      true,
      2,
      "\\mathrm{m}/\\mathrm{s}",
      "m/s",
    );
    renderMeasurement(
      "#result-wall-u-prime",
      model.finalSpeed1,
      isAfterCollision,
      2,
      "\\mathrm{m}/\\mathrm{s}",
      "m/s",
    );
    renderAngle("#result-wall-incidence-angle", model.theta, true, 1);
    renderAngle(
      "#result-wall-reflection-angle",
      model.reflectionAngle,
      isAfterCollision && model.finalSpeed1 > 1e-10,
      1,
    );
    renderMeasurement(
      "#result-wall-k",
      kineticEnergy,
      true,
      2,
      "\\mathrm{J}",
      "J",
    );
    renderMeasurement(
      "#result-wall-k-prime",
      model.systemFinalKineticEnergy,
      isAfterCollision,
      2,
      "\\mathrm{J}",
      "J",
    );
    renderMeasurement(
      "#result-wall-delta-k",
      Math.abs(kineticEnergy - model.systemFinalKineticEnergy),
      isAfterCollision,
      2,
      "\\mathrm{J}",
      "J",
    );
    collisionMessage.hidden = model.hasCollision;
    collisionMessage.textContent = model.hasCollision
      ? ""
      : "Για u = 0 το σώμα δεν φτάνει στον τοίχο.";
    return;
  }

  document.querySelectorAll(".individual-final-velocity").forEach((cell) => {
    cell.hidden = model.isPlastic;
  });
  document.querySelectorAll(".common-final-velocity").forEach((cell) => {
    cell.hidden = !model.isPlastic;
  });
  document.querySelectorAll(".individual-final-energy").forEach((cell) => {
    cell.hidden = model.isPlastic;
  });
  document.querySelectorAll(".system-final-energy").forEach((cell) => {
    cell.hidden = !model.isPlastic;
  });
  document.querySelectorAll(".eccentric-final-angle").forEach((cell) => {
    cell.hidden = !(
      (model.isEccentric && !model.isPlastic) ||
      (model.isOblique && !model.isPlastic)
    );
  });
  document.querySelectorAll(".oblique-plastic-angle").forEach((cell) => {
    cell.hidden = !(model.isOblique && model.isPlastic);
  });
  document.querySelectorAll(".eccentric-plastic-result").forEach((cell) => {
    cell.hidden = !(model.isEccentric && model.isPlastic);
  });
  document.querySelectorAll(".scalar-position").forEach((cell) => {
    cell.hidden = model.isEccentric || model.isOblique;
  });
  document.querySelectorAll(".eccentric-position").forEach((cell) => {
    cell.hidden = true;
  });
  document.querySelectorAll(".eccentric-point-position").forEach((cell) => {
    cell.hidden = !(model.isEccentric || model.isOblique);
  });
  document
    .querySelector("#position-results-grid")
    .classList.toggle(
      "shows-point-positions",
      model.isEccentric || model.isOblique,
    );
  renderMeasurement("#result-x1", model.x1, true, 1, "\\mathrm{m}", "m");
  renderMeasurement("#result-x2", model.x2, true, 1, "\\mathrm{m}", "m");
  renderMeasurement("#result-y1", model.y1, true, 1, "\\mathrm{m}", "m");
  renderMeasurement("#result-y2", model.y2, true, 1, "\\mathrm{m}", "m");
  renderPointMeasurement("#result-point-1", model.x1, model.y1, true, 1);
  renderPointMeasurement("#result-point-2", model.x2, model.y2, true, 1);
  renderPointMeasurement(
    "#result-collision-point",
    model.collisionPosition,
    model.collisionPositionY,
    isAfterCollision,
    2,
  );
  renderMeasurement(
    "#result-collision-x",
    model.collisionPosition,
    isAfterCollision,
    2,
    "\\mathrm{m}",
    "m",
  );
  renderMeasurement(
    "#result-initial-u1",
    model.u1,
    true,
    1,
    "\\mathrm{m}/\\mathrm{s}",
    "m/s",
  );
  renderMeasurement(
    "#result-initial-u2",
    model.u2,
    true,
    1,
    "\\mathrm{m}/\\mathrm{s}",
    "m/s",
  );
  renderLatex(
    resultSymbol("#result-u1"),
    model.isEccentric ? "\\lvert u'_1\\rvert" : "u'_1",
  );
  renderLatex(
    resultSymbol("#result-u2"),
    model.isEccentric ? "\\lvert u'_2\\rvert" : "u'_2",
  );
  renderLatex(
    resultSymbol("#result-angle-u1"),
    model.isOblique ? "\\theta_1" : "\\theta'_1",
  );
  renderLatex(
    resultSymbol("#result-angle-u2"),
    model.isOblique ? "\\theta_2" : "\\theta'_2",
  );
  renderMeasurement("#result-k1", k1, true, 2, "\\mathrm{J}", "J");
  renderMeasurement("#result-k2", k2, true, 2, "\\mathrm{J}", "J");
  renderMeasurement("#result-total-k", k1 + k2, true, 2, "\\mathrm{J}", "J");
  renderMeasurement(
    "#result-u1",
    model.isEccentric || model.isOblique ? model.finalSpeed1 : model.v1,
    isAfterCollision,
    2,
    "\\mathrm{m}/\\mathrm{s}",
    "m/s",
  );
  renderMeasurement(
    "#result-u2",
    model.isEccentric || model.isOblique ? model.finalSpeed2 : model.v2,
    isAfterCollision,
    2,
    "\\mathrm{m}/\\mathrm{s}",
    "m/s",
  );
  renderAngle(
    "#result-angle-u1",
    model.finalAngle1,
    isAfterCollision &&
      ((model.isEccentric && !model.isPlastic) ||
        (model.isOblique && !model.isPlastic)),
    1,
  );
  renderAngle(
    "#result-angle-u2",
    model.finalAngle2,
    isAfterCollision &&
      ((model.isEccentric && !model.isPlastic) ||
        (model.isOblique && !model.isPlastic)),
    1,
  );
  renderMeasurement(
    "#result-common-velocity",
    model.commonVelocity,
    isAfterCollision && model.isPlastic,
    2,
    "\\mathrm{m}/\\mathrm{s}",
    "m/s",
  );
  renderAngle(
    "#result-common-angle",
    model.commonAngle,
    isAfterCollision && model.isOblique && model.isPlastic,
    1,
  );
  renderMeasurement(
    "#result-angular-velocity",
    model.angularVelocity,
    isAfterCollision && model.isEccentric && model.isPlastic,
    2,
    "\\mathrm{rad}/\\mathrm{s}",
    "rad/s",
  );
  renderMeasurement(
    "#result-final-k1",
    finalK1,
    isAfterCollision,
    2,
    "\\mathrm{J}",
    "J",
  );
  renderMeasurement(
    "#result-final-k2",
    finalK2,
    isAfterCollision,
    2,
    "\\mathrm{J}",
    "J",
  );
  renderMeasurement(
    "#result-final-total-k",
    finalK1 + finalK2,
    isAfterCollision,
    2,
    "\\mathrm{J}",
    "J",
  );
  renderMeasurement(
    "#result-system-k",
    systemFinalK,
    isAfterCollision && model.isPlastic,
    2,
    "\\mathrm{J}",
    "J",
  );
  renderMeasurement(
    "#result-q",
    energyLoss,
    isAfterCollision,
    2,
    "\\mathrm{J}",
    "J",
  );

  collisionMessage.hidden = model.hasCollision;
  collisionMessage.textContent = model.hasCollision
    ? ""
    : "Με αυτές τις αρχικές ταχύτητες τα σώματα δεν συγκρούονται.";
}

function renderSimulation() {
  const model = playback.model;
  if (!model) return;

  const isExactBefore = playback.collisionSnapshot === "before";
  const isExactAfter = playback.collisionSnapshot === "after";
  const isAfterCollision =
    model.hasCollision &&
    (isExactAfter || (!isExactBefore && playback.time >= model.collisionTime));
  const isWelded =
    model.isPlastic && model.hasCollision && playback.time >= model.mergeTime;
  const velocity1X = isAfterCollision ? model.v1x : model.u1x;
  const velocity1Y = isAfterCollision ? model.v1y : model.u1y;
  const velocity2X = isAfterCollision ? model.v2x : model.u2x;
  const velocity2Y = isAfterCollision ? model.v2y : model.u2y;
  const { x1, x2, y1, y2 } = positionsAtTime(model, playback.time);
  const displayedDiameter1 = model.pointMass1
    ? 2 * POINT_MASS_RADIUS_PX / view.scale
    : model.diameter1;
  const displayedDiameter2 = model.pointMass2
    ? 2 * POINT_MASS_RADIUS_PX / view.scale
    : model.diameter2;
  massiveWall.hidden = !model.isMassiveWall;

  if (model.isMassiveWall) {
    compoundBody.classList.remove("is-welded");
    [sphereFill1, sphereOutline1, sphereCenter1].forEach((element) => {
      setElementVisible(element, true);
      element.setAttribute("cx", x1);
      element.setAttribute("cy", y1);
    });
    [sphereFill2, sphereOutline2, sphereCenter2].forEach((element) =>
      setElementVisible(element, false),
    );
    sphereFill1.setAttribute("r", displayedDiameter1 / 2);
    sphereOutline1.dataset.radius = displayedDiameter1 / 2;
    sphereOutline1.setAttribute(
      "r",
      Math.max(
        0,
        displayedDiameter1 / 2 -
          SPHERE_OUTLINE_WIDTH_PX / (2 * view.scale),
      ),
    );

    const massLabel1 = document.querySelector("#label-m1");
    renderLatex(massLabel1, "m");
    massLabel1.hidden = false;
    document.querySelector("#label-m2").hidden = true;
    combinedMassLabel.hidden = true;
    positionMassLabel(massLabel1, x1, y1, displayedDiameter1 / 2);

    collisionPoint.hidden = !isAfterCollision;
    if (isAfterCollision) {
      collisionPoint.style.left = `${model.collisionPointX}px`;
      collisionPoint.style.top = `${model.collisionPointY}px`;
    }

    ["#vector-u1", "#vector-u1-head", "#vector-u1-label"].forEach(
      (selector) => setElementVisible(document.querySelector(selector), true),
    );
    [
      "#vector-u2",
      "#vector-u2-head",
      "#vector-u2-label",
      "#vector-common",
      "#vector-common-head",
      "#vector-common-label",
    ].forEach((selector) =>
      setElementVisible(document.querySelector(selector), false),
    );
    updateVector("u1", x1, velocity1X, isAfterCollision, y1, velocity1Y);
    const wallVelocityLabel = document.querySelector("#vector-u1-label");
    renderLatex(
      wallVelocityLabel,
      isAfterCollision ? "u'" : "u",
    );
    setElementVisible(
      wallVelocityLabel,
      Math.hypot(velocity1X, velocity1Y) > 1e-10,
    );
    renderGeometricFeatures();
    updateResults(model, isAfterCollision);
    updatePlaybackButtons();
    return;
  }

  [
    sphereFill1,
    sphereOutline1,
    sphereCenter1,
    sphereFill2,
    sphereOutline2,
    sphereCenter2,
  ].forEach((element) => setElementVisible(element, true));
  renderLatex(document.querySelector("#label-m1"), "m_1");
  renderLatex(document.querySelector("#label-m2"), "m_2");
  const compoundCenterOfMass =
    (model.m1 * x1 + model.m2 * x2) / (model.m1 + model.m2);
  const compoundCenterOfMassY =
    (model.m1 * y1 + model.m2 * y2) / (model.m1 + model.m2);
  [sphereFill1, sphereOutline1, sphereCenter1].forEach((circle) => {
    circle.setAttribute("cx", x1);
    circle.setAttribute("cy", y1);
  });
  [sphereFill2, sphereOutline2, sphereCenter2].forEach((circle) => {
    circle.setAttribute("cx", x2);
    circle.setAttribute("cy", y2);
  });
  sphereFill1.setAttribute("r", displayedDiameter1 / 2);
  sphereFill2.setAttribute("r", displayedDiameter2 / 2);
  sphereOutline1.dataset.radius = displayedDiameter1 / 2;
  sphereOutline2.dataset.radius = displayedDiameter2 / 2;
  sphereOutline1.setAttribute(
    "r",
    Math.max(
      0,
      displayedDiameter1 / 2 - SPHERE_OUTLINE_WIDTH_PX / (2 * view.scale),
    ),
  );
  sphereOutline2.setAttribute(
    "r",
    Math.max(
      0,
      displayedDiameter2 / 2 - SPHERE_OUTLINE_WIDTH_PX / (2 * view.scale),
    ),
  );
  compoundBody.classList.toggle("is-welded", isWelded);
  weldClipM1.setAttribute("cx", x1);
  weldClipM1.setAttribute("cy", y1);
  weldClipM1.setAttribute("r", displayedDiameter1 / 2);
  weldIntersection.setAttribute("cx", x2);
  weldIntersection.setAttribute("cy", y2);
  weldIntersection.setAttribute("r", displayedDiameter2 / 2);
  weldOutlineM1.setAttribute("cx", x1);
  weldOutlineM1.setAttribute("cy", y1);
  weldOutlineM1.setAttribute("r", displayedDiameter1 / 2);
  weldOutlineM2.setAttribute("cx", x2);
  weldOutlineM2.setAttribute("cy", y2);
  weldOutlineM2.setAttribute("r", displayedDiameter2 / 2);
  const massLabel1 = document.querySelector("#label-m1");
  const massLabel2 = document.querySelector("#label-m2");
  positionMassLabel(massLabel1, x1, y1, displayedDiameter1 / 2);
  positionMassLabel(massLabel2, x2, y2, displayedDiameter2 / 2);
  massLabel1.hidden = isWelded;
  massLabel2.hidden = isWelded;
  combinedMassLabel.hidden = !isWelded;
  const compoundLabelRadius =
    model.isEccentric && model.isPlastic
      ? Math.max(
          y1 + displayedDiameter1 / 2,
          y2 + displayedDiameter2 / 2,
        ) - compoundCenterOfMassY
      : Math.max(displayedDiameter1, displayedDiameter2) / 2;
  positionMassLabel(
    combinedMassLabel,
    compoundCenterOfMass,
    compoundCenterOfMassY,
    compoundLabelRadius,
  );
  collisionPoint.hidden = !isAfterCollision;
  if (isAfterCollision) {
    collisionPoint.style.left = `${model.collisionPointX}px`;
    collisionPoint.style.top = `${model.collisionPointY}px`;
  }

  const showCommonVelocity = model.isPlastic && isAfterCollision;
  [
    "#vector-u1",
    "#vector-u2",
    "#vector-u1-head",
    "#vector-u2-head",
    "#vector-u1-label",
    "#vector-u2-label",
  ].forEach((selector) => {
    setElementVisible(document.querySelector(selector), !showCommonVelocity);
  });
  ["#vector-common", "#vector-common-head", "#vector-common-label"].forEach(
    (selector) => {
      setElementVisible(document.querySelector(selector), showCommonVelocity);
    },
  );

  if (showCommonVelocity) {
    updateCommonVector(
      compoundCenterOfMass,
      model.commonVelocityX ?? model.commonVelocity,
      compoundCenterOfMassY,
      model.commonVelocityY ?? 0,
    );
  } else {
    updateVector("u1", x1, velocity1X, isAfterCollision, y1, velocity1Y);
    updateVector("u2", x2, velocity2X, isAfterCollision, y2, velocity2Y);
  }
  renderGeometricFeatures();
  updateResults(model, isAfterCollision);
  updatePlaybackButtons();
}

function updatePlaybackButtons() {
  const model = playback.model;
  const canAnimate = Boolean(model?.hasCollision);
  playButton.disabled = !canAnimate || playback.playing;
  pauseButton.disabled = !playback.playing;
  stepBackwardButton.disabled = !canAnimate || playback.time <= 0;
  stepForwardButton.disabled = !canAnimate || playback.time >= model.finalTime;
  exactlyBeforeButton.disabled = !canAnimate;
  exactlyAfterButton.disabled = !canAnimate;
  exactlyBeforeButton.classList.toggle(
    "active",
    playback.collisionSnapshot === "before",
  );
  exactlyAfterButton.classList.toggle(
    "active",
    playback.collisionSnapshot === "after",
  );
  exactlyBeforeButton.setAttribute(
    "aria-pressed",
    String(playback.collisionSnapshot === "before"),
  );
  exactlyAfterButton.setAttribute(
    "aria-pressed",
    String(playback.collisionSnapshot === "after"),
  );
}

function pauseSimulation() {
  playback.playing = false;
  playback.lastTimestamp = null;
  if (playback.animationId !== null) cancelAnimationFrame(playback.animationId);
  playback.animationId = null;
  updatePlaybackButtons();
}

function animationFrame(timestamp) {
  if (!playback.playing) return;
  if (playback.lastTimestamp === null) playback.lastTimestamp = timestamp;
  const elapsed = Math.min((timestamp - playback.lastTimestamp) / 1000, 0.1);
  playback.lastTimestamp = timestamp;
  const previousTime = playback.time;
  playback.collisionSnapshot = null;
  playback.time = advanceTime(playback.time, elapsed, playback.model);
  processCollisionEvents(previousTime, playback.time, playback.model, 1);
  renderSimulation();

  if (playback.time >= playback.model.finalTime) {
    pauseSimulation();
    return;
  }

  playback.animationId = requestAnimationFrame(animationFrame);
}

function playSimulation() {
  if (!playback.model?.hasCollision || playback.playing) return;
  unlockCollisionAudio();
  if (playback.time >= playback.model.finalTime) {
    playback.time = 0;
    playback.soundPlayed = false;
  }
  playback.collisionSnapshot = null;
  playback.playing = true;
  playback.lastTimestamp = null;
  updatePlaybackButtons();
  playback.animationId = requestAnimationFrame(animationFrame);
}

function stepSimulation(direction) {
  const model = playback.model;
  if (!model?.hasCollision) return;
  if (direction > 0) unlockCollisionAudio();
  pauseSimulation();

  // Τα δύο στιγμιότυπα της κρούσης αποτελούν υποχρεωτικά διαδοχικά καρέ.
  if (direction > 0 && playback.collisionSnapshot === "before") {
    showCollisionSnapshot("after");
    return;
  }
  if (direction < 0 && playback.collisionSnapshot === "after") {
    showCollisionSnapshot("before");
    return;
  }

  const afterCollisionTime = model.isPlastic
    ? model.mergeTime
    : model.collisionTime;
  const isAtCollisionTime =
    Math.abs(playback.time - model.collisionTime) < 1e-9;
  const isAtAfterCollisionTime =
    Math.abs(playback.time - afterCollisionTime) < 1e-9;

  // Αν ένα κανονικό καρέ βρίσκεται ήδη ακριβώς στην κρούση, το αμέσως
  // προηγούμενο χειροκίνητο καρέ πρέπει να είναι το «ακριβώς πριν».
  if (
    direction < 0 &&
    playback.collisionSnapshot === null &&
    (isAtCollisionTime || isAtAfterCollisionTime)
  ) {
    showCollisionSnapshot("before");
    return;
  }

  const previousTime = playback.time;
  playback.collisionSnapshot = null;
  let nextTime = advanceTime(playback.time, direction * FRAME_STEP, model);

  // Στην πλαστική κρούση το καρέ συγκόλλησης μπορεί να απέχει λιγότερο
  // από ένα χρονικό βήμα. Στην κίνηση προς τα πίσω το κρατάμε υποχρεωτικά.
  if (
    direction < 0 &&
    model.isPlastic &&
    previousTime > model.mergeTime &&
    previousTime - FRAME_STEP <= model.mergeTime
  ) {
    nextTime = model.mergeTime;
  }

  playback.time = nextTime;
  processCollisionEvents(previousTime, playback.time, model, direction);

  if (
    direction > 0 &&
    previousTime < model.collisionTime &&
    Math.abs(playback.time - model.collisionTime) < 1e-9
  ) {
    playback.collisionSnapshot = "before";
  } else if (
    direction < 0 &&
    previousTime > afterCollisionTime &&
    Math.abs(playback.time - afterCollisionTime) < 1e-9
  ) {
    playback.collisionSnapshot = "after";
  } else if (
    direction < 0 &&
    model.isPlastic &&
    previousTime > model.collisionTime &&
    Math.abs(playback.time - model.collisionTime) < 1e-9
  ) {
    playback.collisionSnapshot = "before";
  }

  renderSimulation();
}

function showCollisionSnapshot(phase) {
  const model = playback.model;
  if (!model?.hasCollision) return;

  pauseSimulation();
  collisionEffect.classList.remove("active");
  stopCollisionSound();
  playback.collisionSnapshot = phase;
  playback.time =
    phase === "after" && model.isPlastic
      ? model.mergeTime
      : model.collisionTime;
  playback.soundPlayed = phase === "after";
  renderSimulation();
}

function enablePressAndHold(button, direction) {
  let holdDelay = null;
  let repeatTimer = null;
  let pointerHandled = false;

  function stopRepeating() {
    if (holdDelay !== null) clearTimeout(holdDelay);
    if (repeatTimer !== null) clearInterval(repeatTimer);
    holdDelay = null;
    repeatTimer = null;
  }

  function repeatStep() {
    if (button.disabled) {
      stopRepeating();
      return;
    }
    stepSimulation(direction);
  }

  function finishPointerInteraction() {
    stopRepeating();
    setTimeout(() => {
      pointerHandled = false;
    }, 0);
  }

  button.addEventListener("pointerdown", (event) => {
    if (event.button !== 0 || button.disabled) return;
    event.preventDefault();
    pointerHandled = true;
    button.setPointerCapture(event.pointerId);
    stepSimulation(direction);
    holdDelay = setTimeout(() => {
      repeatStep();
      repeatTimer = setInterval(repeatStep, 34);
    }, 300);
  });

  button.addEventListener("pointerup", finishPointerInteraction);
  button.addEventListener("pointercancel", finishPointerInteraction);
  button.addEventListener("lostpointercapture", finishPointerInteraction);
  button.addEventListener("click", (event) => {
    if (pointerHandled) {
      pointerHandled = false;
      event.preventDefault();
      return;
    }
    stepSimulation(direction);
  });
}

function resetSimulation() {
  pauseSimulation();
  collisionEffect.classList.remove("active");
  stopCollisionSound();
  playback.soundPlayed = false;
  playback.collisionSnapshot = null;
  playback.time = 0;
  playback.model = createModel();
  if (
    playback.model.hasCollision &&
    Math.abs(playback.model.collisionTime) < 1e-9
  ) {
    playback.collisionSnapshot = "before";
  }
  renderSimulation();
}

function restartSimulation() {
  pauseSimulation();
  collisionEffect.classList.remove("active");
  stopCollisionSound();
  playback.soundPlayed = false;
  playback.collisionSnapshot = null;
  playback.time = 0;
  if (
    playback.model?.hasCollision &&
    Math.abs(playback.model.collisionTime) < 1e-9
  ) {
    playback.collisionSnapshot = "before";
  }
  renderSimulation();
}

function updateEnergyLossBounds() {
  const isWallInelastic =
    geometrySelect.value === "massive-stationary" &&
    characterSelect.value === "inelastic";
  const isCentralInelastic =
    geometrySelect.value === "central" &&
    characterSelect.value === "inelastic";
  const angle = parameterControlValue("theta");
  let theoreticalMaximum = 100;
  if (isWallInelastic) {
    theoreticalMaximum = 100 * Math.cos(angle * Math.PI / 180) ** 2;
  } else if (isCentralInelastic) {
    theoreticalMaximum = maximumCentralEnergyLossPercent(
      parameterControlValue("m1"),
      parameterControlValue("m2"),
      parameterControlValue("u1"),
      parameterControlValue("u2"),
    );
  }
  const maximum = displayedEnergyLossMaximum(theoreticalMaximum);
  const energyLossNumber = document.querySelector("#energy-loss-number");
  const currentValue = numericInputValue(energyLossNumber);
  const lastValidValue = Number(energyLossNumber.dataset.lastValidValue);

  energyLossRange.max = String(maximum);
  configureNumberInput(energyLossRange, energyLossNumber);
  const maximumLabel = document.querySelector("#energy-loss-maximum");
  maximumLabel.textContent = Number.isInteger(maximum)
    ? String(maximum)
    : decimal(maximum, 1);
  maximumLabel.title = isCentralInelastic
    ? "Θεωρητικό μέγιστο· η ισότητα αντιστοιχεί στο όριο της πλαστικής κρούσης."
    : "";

  if (
    !Number.isFinite(currentValue) ||
    currentValue < Number(energyLossRange.min) ||
    currentValue > maximum
  ) {
    const fallbackValue = Number.isFinite(currentValue)
      ? currentValue
      : lastValidValue;
    const boundedValue = clamp(
      Number.isFinite(fallbackValue) ? fallbackValue : 0,
      Number(energyLossRange.min),
      maximum,
    );
    energyLossRange.value = String(boundedValue);
    energyLossNumber.value = boundedValue.toFixed(1);
    energyLossNumber.dataset.lastValidValue = energyLossNumber.value;
  } else {
    energyLossRange.value = String(currentValue);
    energyLossNumber.dataset.lastValidValue = energyLossNumber.value;
  }
  clearSliderOverflowState(energyLossRange);
}

function connectControl(range) {
  const numberInput = document.querySelector(`#${range.dataset.pair}`);
  configureNumberInput(range, numberInput);
  numberInput.dataset.lastValidValue = numberInput.value;

  range.addEventListener("input", () => {
    const digits = Number(range.step) >= 1 ? 0 : 1;
    numberInput.value = Number(range.value).toFixed(digits);
    numberInput.dataset.lastValidValue = numberInput.value;
    numberInput.setCustomValidity("");
    clearSliderOverflowState(range);
    updateRadiusIndicators();
    updateEnergyLossBounds();
    resetSimulation();
  });

  numberInput.addEventListener("input", () => {
    const entered = numericInputValue(numberInput);
    if (!isAllowedControlValue(range, entered)) {
      numberInput.setCustomValidity(controlValidationMessage(range, entered));
      return;
    }

    numberInput.setCustomValidity("");
    numberInput.dataset.lastValidValue = numberInput.value;
    syncSliderToNumberValue(range, entered);
    updateRadiusIndicators();
    updateEnergyLossBounds();
    resetSimulation();
  });

  numberInput.addEventListener("change", () => {
    let value = numericInputValue(numberInput);
    if (!isAllowedControlValue(range, value)) {
      numberInput.value = numberInput.dataset.lastValidValue || range.value;
      value = numericInputValue(numberInput);
    }

    if (controlValueDomain(range) === "percentage") {
      value = normalizedValue(numberInput);
      numberInput.value = value.toFixed(1);
    }

    numberInput.setCustomValidity("");
    numberInput.dataset.lastValidValue = numberInput.value;
    syncSliderToNumberValue(range, value);
    updateRadiusIndicators();
    updateEnergyLossBounds();
    resetSimulation();
  });
}

function isSupportedCollision() {
  const isSupportedCentral =
    geometrySelect.value === "central" &&
    ["elastic", "plastic", "inelastic"].includes(characterSelect.value);
  const isSupportedEccentric =
    geometrySelect.value === "eccentric" &&
    ["elastic", "plastic"].includes(characterSelect.value);
  const isSupportedOblique =
    geometrySelect.value === "oblique" &&
    ["elastic", "plastic"].includes(characterSelect.value);
  const isSupportedMassiveWall =
    geometrySelect.value === "massive-stationary" &&
    ["elastic", "inelastic"].includes(characterSelect.value);
  return (
    isSupportedCentral ||
    isSupportedEccentric ||
    isSupportedOblique ||
    isSupportedMassiveWall
  );
}

function setPairedControlValue(key, value) {
  const range = document.querySelector(`#${key}-range`);
  const number = document.querySelector(`#${key}-number`);
  if (!range || !number) return;

  const boundedValue = clamp(value, Number(range.min), Number(range.max));
  const digits = Number(range.step) >= 1 ? 0 : 1;
  configureNumberInput(range, number);
  range.value = String(boundedValue);
  number.value = boundedValue.toFixed(digits);
  number.dataset.lastValidValue = number.value;
  number.setCustomValidity("");
  clearSliderOverflowState(range);
}

function applyDefaultCaseParameters() {
  const key = `${geometrySelect.value}:${characterSelect.value}`;
  const preset = DEFAULT_CASE_PARAMETERS[key];
  if (!preset) return;
  Object.entries(preset).forEach(([control, value]) => {
    setPairedControlValue(control, value);
  });
}

function updateRadiusIndicators() {
  const isCentral = geometrySelect.value === "central";
  ["r1", "r2"].forEach((key) => {
    const indicator = document.querySelector(`#${key}-point-mass`);
    const radius = parameterControlValue(key);
    indicator.hidden = !(isCentral && radius === 0);
  });
}

function updateSelectedCase() {
  const isEccentric = geometrySelect.value === "eccentric";
  const isOblique = geometrySelect.value === "oblique";
  const isMassiveStationary = geometrySelect.value === "massive-stationary";
  Array.from(characterSelect.options).forEach((option) => {
    const shouldHide =
      ((isOblique || isEccentric) && option.value === "inelastic") ||
      (isMassiveStationary && option.value === "plastic");
    option.hidden = shouldHide;
    option.disabled = shouldHide;
  });
  characterSelect.disabled = false;
  if (
    ((isOblique || isEccentric) && characterSelect.value === "inelastic") ||
    (isMassiveStationary && characterSelect.value === "plastic")
  ) {
    characterSelect.value = "elastic";
  }
  const isCentral = geometrySelect.value === "central";
  const isEccentricElastic = isEccentric && characterSelect.value === "elastic";
  const isObliqueElastic = isOblique && characterSelect.value === "elastic";
  const isEccentricSupported =
    isEccentric && ["elastic", "plastic"].includes(characterSelect.value);

  positionsSettings.hidden = isOblique || isMassiveStationary;
  obliqueAngleSettings.hidden = !(isOblique || isMassiveStationary);
  m2Control.hidden = isMassiveStationary;
  u2Control.hidden = isMassiveStationary;
  mPointMassIndicator.hidden = !isMassiveStationary;
  bodyParametersTitle.textContent = isMassiveStationary
    ? "Παράμετροι μάζας"
    : "Παράμετροι σωμάτων";
  renderLatex(m1Label, isMassiveStationary ? "m" : "m_1");
  renderLatex(u1Label, isMassiveStationary ? "u" : "u_1");
  document.querySelector("#m1-number").setAttribute(
    "aria-label",
    isMassiveStationary ? "Μάζα m" : "Μάζα m1",
  );
  document.querySelector("#u1-number").setAttribute(
    "aria-label",
    isMassiveStationary ? "Ταχύτητα u" : "Ταχύτητα u1",
  );
  radiusControls.forEach((control) => {
    control.hidden = !(isCentral || isEccentricSupported);
  });
  const thetaRange = document.querySelector("#theta-range");
  const thetaNumber = document.querySelector("#theta-number");
  const thetaMaximum = isMassiveStationary ? 80 : 180;
  thetaRange.max = String(thetaMaximum);
  configureNumberInput(thetaRange, thetaNumber);
  syncSliderToNumberValue(thetaRange, parameterControlValue("theta"));
  thetaRange.parentElement.querySelector(
    ".range-limits span:last-child",
  ).textContent = String(thetaMaximum);
  ["r1", "r2"].forEach((key) => {
    const range = document.querySelector(`#${key}-range`);
    const number = document.querySelector(`#${key}-number`);
    const minimum = isCentral ? 0 : 0.1;
    const step = 0.1;
    range.min = String(minimum);
    range.step = String(step);
    configureNumberInput(range, number);
    syncSliderToNumberValue(range, parameterControlValue(key));
    document.querySelector(`#${key}-minimum`).textContent = isCentral
      ? "0"
      : "0,1";
  });
  ["u1", "u2"].forEach((key) => {
    const range = document.querySelector(`#${key}-range`);
    const number = document.querySelector(`#${key}-number`);
    const hasNonNegativeSpeed = isOblique || isMassiveStationary;
    const minimum = hasNonNegativeSpeed ? 0 : -5;
    range.min = String(minimum);
    configureNumberInput(range, number);
    const enteredSpeed = numericInputValue(number);
    if (!isAllowedControlValue(range, enteredSpeed)) {
      number.value = "0.0";
      number.dataset.lastValidValue = number.value;
    }
    syncSliderToNumberValue(range, parameterControlValue(key));
    const limits = document.querySelector(`#${key}-range-limits`);
    limits.firstElementChild.textContent = hasNonNegativeSpeed ? "0" : "−5";
  });
  energyLossRange.max = "100";
  configureNumberInput(
    energyLossRange,
    document.querySelector("#energy-loss-number"),
  );
  applyDefaultCaseParameters();
  updateEnergyLossBounds();
  updateRadiusIndicators();

  const isAvailable = isSupportedCollision();
  const showsEnergyLoss =
    characterSelect.value === "inelastic" &&
    (geometrySelect.value === "central" || isMassiveStationary);
  energyLossSettings.hidden = !showsEnergyLoss;
  renderLatex(
    energyLossLabel,
    isMassiveStationary
      ? "\\frac{\\lvert\\Delta K\\rvert}{K}"
      : "\\frac{\\lvert\\Delta K\\rvert}{K_{\\text{ολ}}}",
  );
  eccentricOnlyControls.forEach((control) => {
    control.hidden = !isEccentricSupported;
  });
  geometricFeaturesControl.hidden = !(
    isEccentricElastic ||
    isOblique ||
    (isMassiveStationary &&
      ["elastic", "inelastic"].includes(characterSelect.value))
  );
  parameterSection.hidden = !isAvailable;
  settingsPlaceholder.hidden = isAvailable;
  simulationViewport.hidden = !isAvailable;
  simulationPlaceholder.hidden = isAvailable;
  pauseSimulation();
  if (isAvailable) {
    resetSimulation();
    requestAnimationFrame(resetView);
  }
}

function renderView() {
  simulationWorld.style.transform = `translate(${view.x}px, ${view.y}px) scale(${view.scale})`;
  const originScreenX = view.x + ORIGIN_X * view.scale;
  const originScreenY = view.y + ORIGIN_Y * view.scale;
  simulationViewport.style.setProperty("--grid-x", `${originScreenX}px`);
  simulationViewport.style.setProperty("--grid-y", `${originScreenY}px`);
  simulationViewport.style.setProperty(
    "--grid-minor-size",
    `${PIXELS_PER_METER * view.scale}px`,
  );
  simulationViewport.style.setProperty(
    "--grid-major-size",
    `${PIXELS_PER_METER * 5 * view.scale}px`,
  );
  axisX.style.top = `${originScreenY}px`;
  axisY.style.left = `${originScreenX}px`;
  axisX.classList.toggle("label-below", originScreenY < 30);
  axisY.classList.toggle(
    "label-left",
    originScreenX > simulationViewport.clientWidth - 30,
  );

  const inverseScale = 1 / view.scale;
  massiveWall.style.borderLeftWidth = `${2 * inverseScale}px`;
  [
    {
      isPointMass: playback.model?.pointMass1,
      fill: sphereFill1,
      outline: sphereOutline1,
      label: document.querySelector("#label-m1"),
      weldShape: weldClipM1,
      weldOutline: weldOutlineM1,
    },
    {
      isPointMass: playback.model?.pointMass2,
      fill: sphereFill2,
      outline: sphereOutline2,
      label: document.querySelector("#label-m2"),
      weldShape: weldIntersection,
      weldOutline: weldOutlineM2,
    },
  ].forEach(
    ({ isPointMass, fill, outline, label, weldShape, weldOutline }) => {
      if (!isPointMass) return;
      const pointRadius = POINT_MASS_RADIUS_PX * inverseScale;
      fill.setAttribute("r", pointRadius);
      outline.dataset.radius = pointRadius;
      label.dataset.radius = pointRadius;
      weldShape.setAttribute("r", pointRadius);
      weldOutline.setAttribute("r", pointRadius);
    },
  );
  document.querySelectorAll(".sphere-outline-circle").forEach((outline) => {
    outline.style.strokeWidth = `${SPHERE_OUTLINE_WIDTH_PX * inverseScale}px`;
    const fillRadius = Number(outline.dataset.radius);
    if (Number.isFinite(fillRadius)) {
      outline.setAttribute(
        "r",
        Math.max(
          0,
          fillRadius - (SPHERE_OUTLINE_WIDTH_PX / 2) * inverseScale,
        ),
      );
    }
  });
  document.querySelectorAll(".sphere-center-point").forEach((point) => {
    point.setAttribute("r", 2.5 * inverseScale);
    point.style.strokeWidth = `${inverseScale}px`;
  });
  weldOutlineMorphology.setAttribute(
    "radius",
    SPHERE_OUTLINE_WIDTH_PX * inverseScale,
  );
  document.querySelectorAll(".mass-label").forEach((label) => {
    const centerX = Number(label.dataset.centerX);
    const centerY = Number(label.dataset.centerY);
    const radius = Number(label.dataset.radius);
    if (
      Number.isFinite(centerX) &&
      Number.isFinite(centerY) &&
      Number.isFinite(radius)
    ) {
      positionMassLabel(label, centerX, centerY, radius);
    }
  });
  ["u1", "u2", "common"].forEach((id) => {
    const vector = document.querySelector(`#vector-${id}`);
    const originX = Number(vector.dataset.originX);
    const originY = Number(vector.dataset.originY);
    const velocityX = Number(vector.dataset.velocityX);
    const velocityY = Number(vector.dataset.velocityY);
    if (
      Number.isFinite(originX) &&
      Number.isFinite(originY) &&
      Number.isFinite(velocityX) &&
      Number.isFinite(velocityY)
    ) {
      positionVelocityVector(id, originX, velocityX, originY, velocityY);
    }
  });
  renderGeometricFeatures();
  collisionPoint.style.transform = `scale(${inverseScale})`;
}

function resetView() {
  const fitScale = Math.min(
    1,
    (simulationViewport.clientWidth - 32) / WORLD_WIDTH,
    (simulationViewport.clientHeight - 32) / WORLD_HEIGHT,
  );
  view.scale = clamp(fitScale, MIN_ZOOM, 1);
  view.x = (simulationViewport.clientWidth - WORLD_WIDTH * view.scale) / 2;
  view.y = (simulationViewport.clientHeight - WORLD_HEIGHT * view.scale) / 2;
  renderView();
}

function zoomViewAt(screenX, screenY, factor) {
  const worldX = (screenX - view.x) / view.scale;
  const worldY = (screenY - view.y) / view.scale;
  const nextScale = clamp(view.scale * factor, MIN_ZOOM, MAX_ZOOM);

  view.x = screenX - worldX * nextScale;
  view.y = screenY - worldY * nextScale;
  view.scale = nextScale;
  renderView();
}

function applyApplicationZoom() {
  appShell.style.width = `${100 / applicationZoom}vw`;
  appShell.style.height = `${100 / applicationZoom}vh`;
  appShell.style.transform = `scale(${applicationZoom})`;

  const currentIndex = APP_ZOOM_LEVELS.indexOf(applicationZoom);
  zoomOutButton.disabled = currentIndex === 0;
  zoomInButton.disabled = currentIndex === APP_ZOOM_LEVELS.length - 1;
  zoomOutButton.title = `Σμίκρυνση εφαρμογής (${Math.round(applicationZoom * 100)}%)`;
  zoomInButton.title = `Μεγέθυνση εφαρμογής (${Math.round(applicationZoom * 100)}%)`;

  requestAnimationFrame(renderView);
}

function changeApplicationZoom(direction) {
  const currentIndex = APP_ZOOM_LEVELS.indexOf(applicationZoom);
  const nextIndex = clamp(
    currentIndex + direction,
    0,
    APP_ZOOM_LEVELS.length - 1,
  );
  applicationZoom = APP_ZOOM_LEVELS[nextIndex];
  applyApplicationZoom();
}

async function toggleFullscreen() {
  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await document.documentElement.requestFullscreen();
    }
  } catch (error) {
    console.warn("Η λειτουργία πλήρους οθόνης δεν είναι διαθέσιμη.", error);
  }
}

function updateFullscreenButton() {
  const isFullscreen = Boolean(document.fullscreenElement);
  const label = isFullscreen ? "Έξοδος από πλήρη οθόνη" : "Πλήρης οθόνη";
  const icon = fullscreenButton.querySelector("i");

  icon.className = `bi ${isFullscreen ? "bi-fullscreen-exit" : "bi-fullscreen"}`;
  fullscreenButton.setAttribute("aria-label", label);
  fullscreenButton.setAttribute("aria-pressed", String(isFullscreen));
  fullscreenButton.title = label;
}

simulationViewport.addEventListener(
  "wheel",
  (event) => {
    if (event.ctrlKey) return;
    event.preventDefault();
    const bounds = simulationViewport.getBoundingClientRect();
    const cursorX = (event.clientX - bounds.left) / applicationZoom;
    const cursorY = (event.clientY - bounds.top) / applicationZoom;
    const zoomFactor = Math.exp(-event.deltaY * 0.0015);
    zoomViewAt(cursorX, cursorY, zoomFactor);
  },
  { passive: false },
);

simulationViewport.addEventListener("pointerdown", (event) => {
  if (
    event.button !== 0 ||
    event.target.closest("button, input, label, select, a")
  ) {
    return;
  }
  event.preventDefault();
  viewportPointers.set(event.pointerId, {
    clientX: event.clientX,
    clientY: event.clientY,
  });
  simulationViewport.classList.add("is-panning");
  simulationViewport.setPointerCapture(event.pointerId);

  if (viewportPointers.size >= 2) {
    startPinchGesture();
  } else {
    startPointerPan(event.pointerId, event.clientX, event.clientY);
  }
});

simulationViewport.addEventListener("pointermove", (event) => {
  if (!viewportPointers.has(event.pointerId)) return;
  viewportPointers.set(event.pointerId, {
    clientX: event.clientX,
    clientY: event.clientY,
  });

  if (viewportPointers.size >= 2) {
    event.preventDefault();
    updatePinchGesture();
    return;
  }

  if (!pointer.active || event.pointerId !== pointer.id) return;
  const pointerX = event.clientX / applicationZoom;
  const pointerY = event.clientY / applicationZoom;
  view.x += pointerX - pointer.x;
  view.y += pointerY - pointer.y;
  pointer.x = pointerX;
  pointer.y = pointerY;
  renderView();
});

function startPointerPan(pointerId, clientX, clientY) {
  pointer.active = true;
  pointer.id = pointerId;
  pointer.x = clientX / applicationZoom;
  pointer.y = clientY / applicationZoom;
  pinchGesture.active = false;
}

function viewportLocalPoint(clientX, clientY) {
  const bounds = simulationViewport.getBoundingClientRect();
  return {
    x: (clientX - bounds.left) / applicationZoom,
    y: (clientY - bounds.top) / applicationZoom,
  };
}

function currentPinchGeometry() {
  const [first, second] = Array.from(viewportPointers.values()).slice(0, 2);
  if (!first || !second) return null;
  const center = viewportLocalPoint(
    (first.clientX + second.clientX) / 2,
    (first.clientY + second.clientY) / 2,
  );
  return {
    distance: Math.hypot(
      second.clientX - first.clientX,
      second.clientY - first.clientY,
    ),
    centerX: center.x,
    centerY: center.y,
  };
}

function startPinchGesture() {
  const geometry = currentPinchGeometry();
  if (!geometry || geometry.distance <= 0) return;
  pointer.active = false;
  pointer.id = null;
  pinchGesture.active = true;
  pinchGesture.distance = geometry.distance;
  pinchGesture.centerX = geometry.centerX;
  pinchGesture.centerY = geometry.centerY;
}

function updatePinchGesture() {
  const geometry = currentPinchGeometry();
  if (!geometry || geometry.distance <= 0) return;
  if (!pinchGesture.active || pinchGesture.distance <= 0) {
    startPinchGesture();
    return;
  }

  const worldX = (pinchGesture.centerX - view.x) / view.scale;
  const worldY = (pinchGesture.centerY - view.y) / view.scale;
  const nextScale = clamp(
    view.scale * (geometry.distance / pinchGesture.distance),
    MIN_ZOOM,
    MAX_ZOOM,
  );

  view.x = geometry.centerX - worldX * nextScale;
  view.y = geometry.centerY - worldY * nextScale;
  view.scale = nextScale;
  pinchGesture.distance = geometry.distance;
  pinchGesture.centerX = geometry.centerX;
  pinchGesture.centerY = geometry.centerY;
  renderView();
}

function finishViewportPointer(event) {
  if (!viewportPointers.has(event.pointerId)) return;
  viewportPointers.delete(event.pointerId);

  if (viewportPointers.size >= 2) {
    startPinchGesture();
    return;
  }

  if (viewportPointers.size === 1) {
    const [pointerId, position] = viewportPointers.entries().next().value;
    startPointerPan(pointerId, position.clientX, position.clientY);
    return;
  }

  pointer.active = false;
  pointer.id = null;
  pinchGesture.active = false;
  simulationViewport.classList.remove("is-panning");
}

simulationViewport.addEventListener("pointerup", finishViewportPointer);
simulationViewport.addEventListener("pointercancel", finishViewportPointer);
simulationViewport.addEventListener("lostpointercapture", finishViewportPointer);

function finishLabelDrag(event) {
  if (
    !labelDrag.active ||
    (event && event.pointerId !== labelDrag.pointerId)
  ) {
    return;
  }
  const element = labelDrag.element;
  labelDrag.active = false;
  labelDrag.element = null;
  labelDrag.pointerId = null;
  element?.classList.remove("is-label-dragging");
}

function initializeDraggableSimulationLabels() {
  const selector = [
    ".mass-label",
    ".vector-label",
    ".geometry-label",
    ".collision-point-label",
    ".coordinate-axis > span",
  ].join(", ");

  document.querySelectorAll(selector).forEach((label) => {
    label.classList.add("draggable-sim-label");
    label.dataset.labelOffsetX ||= "0";
    label.dataset.labelOffsetY ||= "0";
    applyLabelTransform(label, label.style.transform || "");

    label.addEventListener("pointerdown", (event) => {
      if (event.button !== 0) return;
      event.preventDefault();
      event.stopPropagation();
      labelDrag.active = true;
      labelDrag.element = label;
      labelDrag.pointerId = event.pointerId;
      labelDrag.startClientX = event.clientX / applicationZoom;
      labelDrag.startClientY = event.clientY / applicationZoom;
      labelDrag.startOffsetX = Number(label.dataset.labelOffsetX) || 0;
      labelDrag.startOffsetY = Number(label.dataset.labelOffsetY) || 0;
      label.classList.add("is-label-dragging");
      label.setPointerCapture(event.pointerId);
    });

    label.addEventListener("pointermove", (event) => {
      if (
        !labelDrag.active ||
        labelDrag.element !== label ||
        labelDrag.pointerId !== event.pointerId
      ) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      let offsetX =
        labelDrag.startOffsetX +
        event.clientX / applicationZoom -
        labelDrag.startClientX;
      let offsetY =
        labelDrag.startOffsetY +
        event.clientY / applicationZoom -
        labelDrag.startClientY;
      const distance = Math.hypot(offsetX, offsetY);
      if (distance > LABEL_DRAG_RADIUS_PX) {
        const scale = LABEL_DRAG_RADIUS_PX / distance;
        offsetX *= scale;
        offsetY *= scale;
      }
      label.dataset.labelOffsetX = String(offsetX);
      label.dataset.labelOffsetY = String(offsetY);
      applyLabelTransform(label, label.dataset.labelBaseTransform || "");
    });

    label.addEventListener("pointerup", finishLabelDrag);
    label.addEventListener("pointercancel", finishLabelDrag);
    label.addEventListener("lostpointercapture", finishLabelDrag);
    label.addEventListener("dblclick", (event) => {
      event.preventDefault();
      event.stopPropagation();
      label.dataset.labelOffsetX = "0";
      label.dataset.labelOffsetY = "0";
      applyLabelTransform(label, label.dataset.labelBaseTransform || "");
    });
  });
}

function updatePanelToggle(button, isExpanded, side) {
  const isSettings = side === "settings";
  const action = isExpanded ? "Απόκρυψη" : "Εμφάνιση";
  const panelName = isSettings ? "ρυθμίσεων" : "αποτελεσμάτων";
  const icon = button.querySelector("i");
  const accessibleLabel = `${action} ${panelName}`;
  button.setAttribute("aria-expanded", String(isExpanded));
  button.title = accessibleLabel;
  button.querySelector(".visually-hidden").textContent = accessibleLabel;
  let direction;
  if (stackedMobileLayoutQuery.matches) {
    direction = isExpanded ? "up" : "down";
  } else if (isSettings) {
    direction = isExpanded ? "left" : "right";
  } else {
    direction = isExpanded ? "right" : "left";
  }
  icon.className = `bi bi-chevron-${direction}`;
}

settingsPanelToggle.addEventListener("click", () => {
  const isCollapsed = document.body.classList.toggle(
    "settings-panel-collapsed",
  );
  updatePanelToggle(settingsPanelToggle, !isCollapsed, "settings");
});

resultsPanelToggle.addEventListener("click", () => {
  const isCollapsed = document.body.classList.toggle(
    "results-panel-collapsed",
  );
  updatePanelToggle(resultsPanelToggle, !isCollapsed, "results");
});

document
  .querySelector(".simulation-area")
  .addEventListener("transitionend", (event) => {
    if (event.propertyName === "width" || event.propertyName === "margin-left") {
      renderView();
    }
  });

resetViewButton.addEventListener("click", resetView);
fullscreenButton.addEventListener("click", toggleFullscreen);
zoomInButton.addEventListener("click", () => changeApplicationZoom(1));
zoomOutButton.addEventListener("click", () => changeApplicationZoom(-1));
document.addEventListener("fullscreenchange", updateFullscreenButton);
restartButton.addEventListener("click", restartSimulation);
exactlyBeforeButton.addEventListener("click", () =>
  showCollisionSnapshot("before"),
);
exactlyAfterButton.addEventListener("click", () =>
  showCollisionSnapshot("after"),
);
playButton.addEventListener("click", playSimulation);
pauseButton.addEventListener("click", pauseSimulation);
enablePressAndHold(stepBackwardButton, -1);
enablePressAndHold(stepForwardButton, 1);
window.addEventListener("resize", () => {
  updatePanelToggle(
    settingsPanelToggle,
    !document.body.classList.contains("settings-panel-collapsed"),
    "settings",
  );
  updatePanelToggle(
    resultsPanelToggle,
    !document.body.classList.contains("results-panel-collapsed"),
    "results",
  );
  if (isSupportedCollision()) resetView();
});
geometrySelect.addEventListener("change", updateSelectedCase);
characterSelect.addEventListener("change", updateSelectedCase);
geometricFeaturesCheckbox.addEventListener("change", renderSimulation);
document.querySelectorAll(".form-range[data-pair]").forEach(connectControl);

const storedTheme = localStorage.getItem("collision-lab-theme");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";
setTheme(storedTheme || systemTheme, false);
themeButtons.forEach((button) =>
  button.addEventListener("click", () => setTheme(button.dataset.theme)),
);
updatePanelToggle(
  settingsPanelToggle,
  !document.body.classList.contains("settings-panel-collapsed"),
  "settings",
);
updatePanelToggle(
  resultsPanelToggle,
  !document.body.classList.contains("results-panel-collapsed"),
  "results",
);
applyApplicationZoom();

preloadCollisionSound();
document.addEventListener("pointerdown", unlockCollisionAudio, {
  capture: true,
  once: true,
});
renderStaticLatex();
initializeDraggableSimulationLabels();
updateSelectedCase();
