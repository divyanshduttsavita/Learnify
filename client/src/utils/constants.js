export const COURSES = [
  {
    id: 1, emoji: '🐍', category: 'programming',
    bg: 'linear-gradient(135deg,#d4ede9,#9FE1CB)',
    title: 'Python for Data Science', level: 'beginner',
    duration: '6h 30m', rating: '4.9', reviews: '2.1k',
    desc: 'Learn Python from scratch and apply it to real data analysis tasks using Pandas, NumPy, and Matplotlib.',
    tag: 'Most Popular',
    modules: [
      {
        title: 'Getting Started with Python',
        lessons: [
          { title: 'Introduction to Python', dur: '8m', content: `<h3>What is Python?</h3><p>Python is a high-level, general-purpose programming language known for its readable syntax and versatility. Created by Guido van Rossum in 1991, it has become the most popular language for data science, machine learning, and scripting.</p><h3>Why Python for Data Science?</h3><p>Python's dominance in data science comes from a rich ecosystem of libraries:</p><ul><li><strong>NumPy</strong> — Fast numerical computing with arrays</li><li><strong>Pandas</strong> — Data manipulation and analysis</li><li><strong>Matplotlib</strong> — Data visualization</li><li><strong>Scikit-learn</strong> — Machine learning</li></ul><h3>Your first program</h3><p>Every programming journey starts with a classic:</p><div class="code-block">print("Hello, World!")\n\n# Variables and types\nname = "Learnify"\nversion = 3.11\nprint(f"Welcome to {name} v{version}")</div>` },
          { title: 'Variables & Data Types', dur: '12m', content: `<h3>Python Data Types</h3><p>Python has several built-in data types. Understanding them is fundamental to writing effective code.</p><h3>Common types</h3><ul><li><strong>int</strong> — Whole numbers: <code>42</code>, <code>-7</code></li><li><strong>float</strong> — Decimal numbers: <code>3.14</code></li><li><strong>str</strong> — Text: <code>"hello"</code></li><li><strong>bool</strong> — True or False</li><li><strong>list</strong> — Ordered collection</li><li><strong>dict</strong> — Key-value pairs</li></ul><div class="code-block">age = 25          # int\nheight = 5.9      # float\nname = "Alex"     # str\nis_student = True # bool\n\n# Type checking\nprint(type(age))  # &lt;class 'int'&gt;</div>` },
          { title: 'Control Flow', dur: '15m', content: `<h3>Making decisions in code</h3><p>Control flow lets your program choose different paths based on conditions.</p><h3>If / Elif / Else</h3><div class="code-block">score = 85\n\nif score >= 90:\n    grade = "A"\nelif score >= 80:\n    grade = "B"\nelif score >= 70:\n    grade = "C"\nelse:\n    grade = "F"\n\nprint(f"Your grade: {grade}")  # B</div><h3>Loops</h3><p>Loops allow repetition without writing the same code multiple times.</p><div class="code-block">fruits = ["apple", "banana", "cherry"]\n\nfor fruit in fruits:\n    print(f"I like {fruit}")\n\n# While loop\ncount = 0\nwhile count &lt; 5:\n    print(count)\n    count += 1</div>` },
        ]
      },
      {
        title: 'Data with Pandas',
        lessons: [
          { title: 'Introduction to Pandas', dur: '18m', content: `<h3>The power of Pandas</h3><p>Pandas is Python's premier data manipulation library. It introduces two core structures: <strong>Series</strong> (1D) and <strong>DataFrame</strong> (2D, like a spreadsheet).</p><div class="code-block">import pandas as pd\n\n# Create a DataFrame\ndata = {\n    "Name": ["Alice", "Bob", "Carol"],\n    "Age": [25, 30, 35],\n    "Score": [88.5, 92.1, 79.8]\n}\n\ndf = pd.DataFrame(data)\nprint(df.head())</div><h3>Loading data</h3><p>Most of the time, you'll load data from files rather than creating it manually:</p><div class="code-block">df = pd.read_csv("data.csv")\ndf = pd.read_excel("report.xlsx")\ndf = pd.read_json("api_data.json")</div>` },
        ]
      }
    ],
    quiz: [
      { q: "What does `type(3.14)` return in Python?", opts: ["int", "float", "str", "number"], ans: 1, expl: "3.14 is a floating-point number, so `type(3.14)` returns `<class 'float'>`." },
      { q: "Which library is primarily used for data manipulation in Python?", opts: ["NumPy", "Matplotlib", "Pandas", "Scikit-learn"], ans: 2, expl: "Pandas is the go-to library for data manipulation, providing DataFrame and Series structures." },
      { q: "What will `print(2 ** 8)` output?", opts: ["16", "64", "256", "512"], ans: 2, expl: "** is the exponentiation operator. 2 to the power of 8 equals 256." },
      { q: "Which keyword starts a for loop in Python?", opts: ["loop", "foreach", "for", "repeat"], ans: 2, expl: "Python uses the `for` keyword to iterate over sequences." },
      { q: "How do you create a list in Python?", opts: ["list(1,2,3)", "[1,2,3]", "{1,2,3}", "(1,2,3)"], ans: 1, expl: "Square brackets [] are used to create lists in Python. () is for tuples, {} for dicts/sets." },
    ]
  },
  {
    id: 2, emoji: '🎨', category: 'design',
    bg: 'linear-gradient(135deg,#fae8d4,#f5c4a0)',
    title: 'UI/UX Design Fundamentals', level: 'beginner',
    duration: '5h 15m', rating: '4.8', reviews: '1.4k',
    desc: 'Understand the principles behind great design — from color theory and typography to wireframing and user research.',
    tag: 'Bestseller',
    modules: [
      {
        title: 'Design Principles', lessons: [
          { title: 'Visual Hierarchy', dur: '10m', content: `<h3>What is Visual Hierarchy?</h3><p>Visual hierarchy is the arrangement of elements in a way that implies importance. It guides the viewer's eye through the design in a deliberate order.</p><h3>Key principles</h3><ul><li><strong>Size</strong> — Larger elements attract more attention</li><li><strong>Color &amp; Contrast</strong> — High contrast draws the eye</li><li><strong>Whitespace</strong> — Breathing room isolates important elements</li><li><strong>Alignment</strong> — Creates order and guides movement</li></ul><p>A great headline, a clear subheading, and a call-to-action button are a classic 3-level hierarchy used on virtually every landing page.</p>` },
          { title: 'Color Theory', dur: '14m', content: `<h3>The Color Wheel</h3><p>Colors are related mathematically. Understanding these relationships lets you create harmonious palettes.</p><ul><li><strong>Complementary</strong> — Opposite on wheel (high contrast)</li><li><strong>Analogous</strong> — Adjacent colors (harmonious)</li><li><strong>Triadic</strong> — Three equidistant colors (vibrant)</li></ul><h3>Color psychology</h3><p>Colors evoke emotions: blue = trust, red = urgency, green = growth, yellow = optimism. Great brands leverage this intentionally.</p>` },
        ]
      },
    ],
    quiz: [
      { q: "What does 'visual hierarchy' refer to?", opts: ["Colour matching", "Element arrangement by importance", "Grid systems", "Font pairing"], ans: 1, expl: "Visual hierarchy organizes elements to guide the viewer's attention in a deliberate order." },
      { q: "Which color pairing creates the highest contrast?", opts: ["Analogous", "Monochromatic", "Complementary", "Triadic"], ans: 2, expl: "Complementary colors sit opposite each other on the color wheel, creating maximum contrast." },
      { q: "What is 'whitespace' in design?", opts: ["Background color", "Empty space between elements", "A design trend", "Text color"], ans: 1, expl: "Whitespace (negative space) is the empty area between design elements that improves readability and focus." },
      { q: "What does UX stand for?", opts: ["User Execution", "Universal Experience", "User Experience", "Unified Exchange"], ans: 2, expl: "UX stands for User Experience — the overall feeling a user has when interacting with a product." },
      { q: "Which format is typically used for wireframes?", opts: ["High-fidelity mockups", "Low-fidelity sketches", "Final designs", "Production code"], ans: 1, expl: "Wireframes are low-fidelity sketches that outline structure and layout without visual details." },
    ]
  },
  {
    id: 3, emoji: '🤖', category: 'data',
    bg: 'linear-gradient(135deg,#e8e0f8,#c8b8f0)',
    title: 'Machine Learning Essentials', level: 'intermediate',
    duration: '8h 45m', rating: '4.9', reviews: '3.2k',
    desc: 'From linear regression to neural networks — learn the algorithms powering the AI revolution with hands-on Python projects.',
    tag: 'New',
    modules: [
      {
        title: 'Supervised Learning', lessons: [
          { title: 'Linear Regression', dur: '20m', content: `<h3>What is Linear Regression?</h3><p>Linear regression is one of the oldest and most widely used machine learning algorithms. It predicts a continuous output based on one or more input features by finding the best-fitting straight line.</p><h3>The equation</h3><p>For simple linear regression: <strong>y = mx + b</strong> where m is the slope and b is the intercept.</p><div class="code-block">from sklearn.linear_model import LinearRegression\nimport numpy as np\n\n# Training data\nX = np.array([[1],[2],[3],[4],[5]])\ny = np.array([2, 4, 5, 4, 5])\n\n# Train\nmodel = LinearRegression()\nmodel.fit(X, y)\n\n# Predict\nprediction = model.predict([[6]])\nprint(f"Prediction for x=6: {prediction[0]:.2f}")</div>` },
        ]
      },
    ],
    quiz: [
      { q: "What type of output does linear regression predict?", opts: ["Categories", "Continuous values", "Binary (0 or 1)", "Text"], ans: 1, expl: "Linear regression predicts continuous numerical values, like price, temperature, or score." },
      { q: "What is overfitting in machine learning?", opts: ["Training too slowly", "Model performs well on training but poorly on new data", "Using too little data", "A type of neural network"], ans: 1, expl: "Overfitting occurs when a model memorizes training data rather than learning generalizable patterns." },
      { q: "Which Scikit-learn method trains a model?", opts: [".train()", "fit()", "learn()", "build()"], ans: 1, expl: "In Scikit-learn, the `.fit(X, y)` method is used to train a model on data." },
      { q: "What does 'supervised learning' mean?", opts: ["AI supervises humans", "Training with labelled examples", "Unsupervised with feedback", "Reinforcement only"], ans: 1, expl: "Supervised learning trains models using labelled input-output pairs where the correct answers are known." },
      { q: "Which metric measures regression model accuracy?", opts: ["Accuracy", "F1 Score", "RMSE", "Confusion Matrix"], ans: 2, expl: "Root Mean Squared Error (RMSE) is a common metric for regression, measuring average prediction error." },
    ]
  },
  {
    id: 4, emoji: '📈', category: 'business',
    bg: 'linear-gradient(135deg,#f5e0e0,#f0c0c0)',
    title: 'Financial Modeling', level: 'advanced',
    duration: '9h 20m', rating: '4.7', reviews: '890',
    desc: 'Build DCF, LBO, and merger models from scratch. Used by investment bankers and finance professionals worldwide.',
    tag: '',
    modules: [
      {
        title: 'Valuation Methods', lessons: [
          { title: 'DCF Fundamentals', dur: '25m', content: `<h3>Discounted Cash Flow (DCF)</h3><p>DCF is the cornerstone of fundamental valuation. The core idea: a dollar today is worth more than a dollar tomorrow. We "discount" future cash flows back to their present value.</p><h3>The formula</h3><p><strong>PV = CF / (1 + r)^t</strong> where r = discount rate and t = time period.</p><h3>Steps to build a DCF</h3><ul><li>Project free cash flows (5-10 years)</li><li>Calculate terminal value</li><li>Discount using WACC</li><li>Sum to get Enterprise Value</li><li>Adjust for debt/cash → Equity Value</li></ul>` },
        ]
      },
    ],
    quiz: [
      { q: "What does DCF stand for?", opts: ["Direct Cash Flow", "Discounted Cash Flow", "Daily Cash Forecast", "Deferred Cash Fund"], ans: 1, expl: "DCF stands for Discounted Cash Flow — a valuation method based on the time value of money." },
      { q: "What is WACC?", opts: ["Weighted Average Cost of Capital", "Weekly Account Cash Count", "Working Asset Cash Conversion", "Weighted Annual Cash Calculation"], ans: 0, expl: "WACC is the Weighted Average Cost of Capital — the blended cost of a company's equity and debt financing." },
      { q: "What is 'terminal value' in a DCF?", opts: ["The final year's revenue", "Value beyond the projection period", "Book value at exit", "Total debt outstanding"], ans: 1, expl: "Terminal value captures the value of all cash flows beyond the explicit projection period (usually 5-10 years)." },
      { q: "What does an LBO model analyze?", opts: ["Land Buy Operations", "Leveraged Buyout", "Long-term Bond Obligations", "Liquidity Breakeven Operations"], ans: 1, expl: "An LBO (Leveraged Buyout) model analyzes acquisitions financed primarily with debt." },
      { q: "Which formula gives Enterprise Value?", opts: ["EV = Equity + Revenue", "EV = Market Cap + Debt - Cash", "EV = Assets × P/E", "EV = EBITDA × Revenue"], ans: 1, expl: "Enterprise Value = Market Capitalization + Total Debt - Cash & Cash Equivalents." },
    ]
  },
  {
    id: 5, emoji: '⚡', category: 'programming',
    bg: 'linear-gradient(135deg,#fef9c4,#fde868)',
    title: 'JavaScript & React', level: 'intermediate',
    duration: '10h 0m', rating: '4.8', reviews: '4.5k',
    desc: 'Go from JavaScript basics to building full React applications. Covers hooks, state management, and REST APIs.',
    tag: 'Top Rated',
    modules: [
      {
        title: 'React Fundamentals', lessons: [
          { title: 'Components & JSX', dur: '16m', content: `<h3>What is React?</h3><p>React is a JavaScript library for building user interfaces using a component-based approach. Components are reusable UI building blocks that manage their own state and render dynamic content.</p><h3>JSX — JavaScript + HTML</h3><p>JSX lets you write HTML-like syntax inside JavaScript files:</p><div class="code-block">function Greeting({ name }) {\n  return (\n    &lt;div className="card"&gt;\n      &lt;h1&gt;Hello, {name}!&lt;/h1&gt;\n      &lt;p&gt;Welcome to React.&lt;/p&gt;\n    &lt;/div&gt;\n  );\n}\n\n// Usage\n&lt;Greeting name="Alex" /&gt;</div><h3>Props</h3><p>Props (properties) pass data from parent to child components, making them reusable with different content.</p>` },
        ]
      },
    ],
    quiz: [
      { q: "What does JSX stand for?", opts: ["JavaScript XML", "Java Syntax Extension", "JSON Extended", "JavaScript Exchange"], ans: 0, expl: "JSX stands for JavaScript XML — it's a syntax extension that lets you write HTML-like code in JavaScript." },
      { q: "Which hook manages state in functional components?", opts: ["useEffect", "useMemo", "useState", "useContext"], ans: 2, expl: "useState is React's hook for adding state to functional components." },
      { q: "What are React 'props'?", opts: ["CSS properties", "Data passed to child components", "State variables", "Event listeners"], ans: 1, expl: "Props (properties) pass data from parent to child components, enabling reusability." },
      { q: "What does useEffect handle?", opts: ["Styling", "Side effects (data fetching, subscriptions)", "State updates", "Component creation"], ans: 1, expl: "useEffect handles side effects like data fetching, subscriptions, and DOM manipulation." },
      { q: "What is the virtual DOM?", opts: ["A browser extension", "A lightweight in-memory representation of the real DOM", "A database", "A CSS framework"], ans: 1, expl: "React's virtual DOM is an in-memory copy of the real DOM that enables efficient updates through diffing." },
    ]
  },
  {
    id: 6, emoji: '📊', category: 'data',
    bg: 'linear-gradient(135deg,#d4edf4,#9fd4e8)',
    title: 'Data Visualization', level: 'beginner',
    duration: '4h 45m', rating: '4.6', reviews: '750',
    desc: 'Turn raw data into compelling charts and dashboards using Python, Matplotlib, Seaborn, and Plotly.',
    tag: '',
    modules: [
      {
        title: 'Visualization Basics', lessons: [
          { title: 'Charts with Matplotlib', dur: '12m', content: `<h3>The Foundation of Python Visualization</h3><p>Matplotlib is the oldest and most foundational Python visualization library. Almost all other libraries (Seaborn, Pandas plotting) are built on top of it.</p><div class="code-block">import matplotlib.pyplot as plt\nimport numpy as np\n\nx = np.linspace(0, 10, 100)\ny = np.sin(x)\n\nplt.figure(figsize=(10, 5))\nplt.plot(x, y, color='teal', linewidth=2)\nplt.title('Sine Wave')\nplt.xlabel('X axis')\nplt.ylabel('Y axis')\nplt.grid(True, alpha=0.3)\nplt.show()</div>` },
        ]
      },
    ],
    quiz: [
      { q: "Which chart is best for showing trends over time?", opts: ["Pie chart", "Bar chart", "Line chart", "Scatter plot"], ans: 2, expl: "Line charts are ideal for showing trends and changes over time because they connect data points sequentially." },
      { q: "What library is Seaborn built on top of?", opts: ["Plotly", "D3.js", "Matplotlib", "Bokeh"], ans: 2, expl: "Seaborn is a high-level visualization library built on top of Matplotlib with better defaults." },
      { q: "What is a 'heatmap' used for?", opts: ["Temperature data only", "Showing correlation between variables", "Geographic mapping", "3D visualization"], ans: 1, expl: "Heatmaps visualize data matrices using color intensity, commonly used for correlation matrices and frequency tables." },
      { q: "Which chart type is wrong for proportions?", opts: ["Pie chart", "Bar chart", "Line chart", "Donut chart"], ans: 2, expl: "Line charts show trends over time, not proportions. Pie or bar charts are used for part-to-whole relationships." },
      { q: "What does `plt.show()` do?", opts: ["Saves the figure", "Displays the plot", "Clears the canvas", "Exports to PNG"], ans: 1, expl: "`plt.show()` renders and displays the current Matplotlib figure in a window or notebook." },
    ]
  },
];

export const BADGES = [
  { icon: '🚀', name: 'First Lesson' },
  { icon: '🔥', name: '7 Day Streak' },
  { icon: '🧠', name: 'Quiz Master' },
  { icon: '⚡', name: '300 XP' },
  { icon: '📚', name: 'Bookworm' },
  { icon: '🏆', name: 'Top Learner' },
];
