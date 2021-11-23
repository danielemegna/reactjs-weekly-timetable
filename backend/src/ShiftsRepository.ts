import fs from 'fs'
import { Moment } from 'moment'
import 'moment/locale/it'
import { WeekShifts } from './WeekShifts'

export default class ShiftsRepository {

  getFor(date: Moment): WeekShifts {
    console.log(`Retrieving shifts for ${date.toISOString()} ...`)
    const startOfWeek = date.clone().startOf('week')
    console.log(`Start of week ${startOfWeek.toISOString()}`)
    const filePath = this.filePathFor(startOfWeek)

    try {
      const weekShifts = this.read(filePath)
      console.log(`${filePath} found, use it`);
      return weekShifts
    } catch (error) {
      console.log(`Cannot find shifts file ${filePath} for ${date.toISOString()}, return template and init file ..`);
      const defaultShifts = this.defaultShiftsFor(startOfWeek)
        ; (async () => { this.store(defaultShifts, filePath) })()
      return defaultShifts
    }
  }

  private read(filePath: string): WeekShifts {
      const fileRawContent = fs.readFileSync(filePath, 'utf-8')
      return JSON.parse(fileRawContent)
  }

  private store(weekShifts: WeekShifts, filePath: string): void {
    fs.writeFile(filePath, JSON.stringify(weekShifts), (error) => {
      if (error) {
        console.log(`Cannot write ${filePath} file to filesystem`, error);
        throw error;
      }
      console.log(`${filePath} written to filesystem`);
    })
  }

  private filePathFor = (startOfWeek: Moment) =>
    './store/' + startOfWeek.format('yyyyMMDD') + '.json'

  private defaultShiftsFor(startOfWeek: Moment): WeekShifts {
    return {
      date: startOfWeek,
      shifts: [
        {
          // lun
          date: startOfWeek,
          morning: [
            { name: 'Anna', color: 'default' },
            { name: 'Giuliana', color: 'default' }
          ],
          afternoon: [
            { name: 'Monica', color: 'default' },
            { name: 'Roby', color: 'default' },
            { name: 'Alessia', color: 'default' }
          ]
        },
        {
          // mar
          date: startOfWeek.clone().add(1, 'days'),
          morning: [
            { name: 'Cristina', color: 'default' },
            { name: 'Eleonora', color: 'default' },
            { name: 'Giulia', color: 'default' }
          ],
          afternoon: [
            { name: 'Alessia', color: 'default' },
            { name: 'Grazia', color: 'default' }
          ]
        },
        {
          // mer
          date: startOfWeek.clone().add(2, 'days'),
          morning: [
            { name: 'Sonia', color: 'green' },
            { name: 'Anna', color: 'default' },
            { name: 'Simone', color: 'default' },
            { name: 'Giulia in affiancamento', color: 'blue' }
          ],
          afternoon: []
        },
        {
          // gio
          date: startOfWeek.clone().add(3, 'days'),
          morning: [
            { name: 'Cristiana', color: 'default' },
            { name: 'Giuliana', color: 'default' }
          ],
          afternoon: [
            { name: 'Alice', color: 'default' }
          ]
        },
        {
          // ven
          date: startOfWeek.clone().add(4, 'days'),
          morning: [
            { name: 'Anna', color: 'default' },
          ],
          afternoon: [
            { name: 'Ylenia + Mamy', color: 'default' }
          ]
        },
        {
          // sab
          date: startOfWeek.clone().add(5, 'days'),
          morning: [
            { name: 'Gaia', color: 'default' },
            { name: 'Laura e Rina in affiancamento', color: 'blue' },
          ],
          afternoon: [
            { name: 'Daniele', color: 'default' },
            { name: 'Paola', color: 'default' }
          ]
        },
        {
          // dom
          date: startOfWeek.clone().add(6, 'days'),
          morning: [
            { name: 'Barbara', color: 'default' },
            { name: 'Laura', color: 'default' },
            { name: 'Erica in affiancamento', color: 'blue' }
          ],
          afternoon: [
            { name: 'Monica P', color: 'default' }
          ]
        },
      ]
    }
  }
}