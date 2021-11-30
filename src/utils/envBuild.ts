import dotenv from 'dotenv'

// 定义接口类型声明
export interface Env {
  PORT: number;
  OPEN: boolean;
  PUBLIC_PATH: string
}

export function loadEnv (): Env {
  const env = process.env.NODE_ENV
  const ret: Env = { PORT: 0, OPEN: false, PUBLIC_PATH: '' }
  const envList = [`.env.${env}.local`, `.env.${env}`, '.env.local', '.env']
  envList.forEach((e) => {
    dotenv.config({ path: e })
  })
  for (const envName of Object.keys(process.env)) {
    let realName : string|boolean|number|undefined = process.env[envName]?.replace(/\\n/g, '\n')
    realName = realName === 'true' ? true : realName === 'false' ? false : realName
    if (envName === 'PORT') {
      realName = Number(realName)
      ret.PORT = realName
    }
    if (envName === 'OPEN') {
      realName = Boolean(realName)
      ret.OPEN = realName
    }
    process.env[envName] = String(realName)
  }
  return ret
}
