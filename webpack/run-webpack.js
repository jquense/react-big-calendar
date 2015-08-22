import webpack from 'webpack';
import { argv } from 'yargs';

let { config, ...options } = argv;

config = require('./' + config);

webpack(config, (err, stats)=>{
  if (err){
    console.error(err.stack || err)

    if (err.details){
      console.error(err.details)
    }

    return process.on("exit",()=> process.exit(1))
  }

  process.stdout.write(stats.toString() + '\n')
})