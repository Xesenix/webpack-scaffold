const context = require.context('.', true, /\.spec\.(t|j)sx?$/);
context.keys().forEach(context);
