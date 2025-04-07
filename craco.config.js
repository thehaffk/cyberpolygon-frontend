module.exports = {
  babel: {
    plugins: [
      '@babel/plugin-proposal-private-property-in-object'
    ]
  },
  webpack: {
    configure: {
      module: {
        rules: [
          {
            test: /\.m?js$/,
            resolve: {
              fullySpecified: false
            }
          }
        ]
      }
    }
  },
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
}; 