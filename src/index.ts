import {Command, flags} from '@oclif/command'
import { join } from 'path'
import { readFileSync, writeFileSync, read } from 'fs'
import { safeLoad } from 'js-yaml'

class ServerlessYaml2Ts extends Command {
  private readonly cwd = process.cwd()
  private readonly targetYML = join(this.cwd, './serverless.yml')
  private readonly targetYAML = join(this.cwd, './serverless.yaml')
  private readonly targetTS = join(this.cwd, './serverless.ts')
  static description = 'describe the command here'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
    encode: flags.string({
      char: 'E',
      default: 'utf-8',
      description: 'file encode'
    })
  }
  loadYAML(encode: string) {
    try {
      this.log(`Loading: ${this.targetYAML}`)
      const file = readFileSync(this.targetYAML, encode)
      return file
    } catch (e) {
      if (e.code !== 'ENOENT') {
        throw e
      }
    }
    this.log(`serverless.yaml not found.`)
    this.log(`Loading: ${this.targetYML}`)
    return readFileSync(this.targetYML, encode)
  }

  hasTsFile() {
    const {flags} = this.parse(ServerlessYaml2Ts)
    if (flags.force) return
    try {
      readFileSync(this.targetTS)
      this.error(`${this.targetTS} is exists.`)
    } catch (e) {
      if (e.code !== 'ENOENT') {
        throw e
      }
      return
    }    
  }

  async run() {
    const {flags} = this.parse(ServerlessYaml2Ts)
    const encode = flags.encode
    const file = this.loadYAML(encode)
    const serverlessJSON = JSON.stringify(safeLoad(file), null, 2)
    this.hasTsFile()
    const serverlessTS = `import { Serverless } from 'serverless/aws';
export const service: Serverless = ${serverlessJSON}

module.exports = service`
    writeFileSync(this.targetTS, serverlessTS, {
      encoding: encode
    })
    this.log(`serverless.ts created`)
  }
}

export = ServerlessYaml2Ts
