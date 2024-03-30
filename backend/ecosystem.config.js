module.exports = {
    apps : [{
      name: "backend",
      script: "ts-node",
      args: "src/server.ts",
      watch: true,
      interpreter: "/usr/local/bin/ts-node",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
    }]
  };