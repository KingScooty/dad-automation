#Build pipline (WIP)


##Path variables
All of the path variables are stored inside `_config.js` and are accessible via commonJS.

```
var config = require('./_config'); //config.basePaths
```

##Environment parameter

We can control the environment by passing an `--env` parameter when launching the build tool. By default, the build will launch in **development** mode. By passing `--env production`, we can change the environment to **production**.

##Tools

- Sass compilation
- CSS autoprefixing
- CSS minification
- CSS watch task

- Image minification

- JS concatenation - WIP
- JS minifcation - WIP
- JS watch task

- Run JS tests - WIP