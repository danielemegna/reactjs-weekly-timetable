import fs from 'fs'
import { Moment } from 'moment'
import { WeekShifts } from './WeekShifts'

export default class ShiftsRepository {

  getFor(date: Moment): WeekShifts {
    try {
      console.log(`Retrieving shifts for ${date} ...`)
      const filePath = this.filePathFor(date)
      const fileRawContent = fs.readFileSync(filePath, 'utf-8')
      const weekShifts = JSON.parse(fileRawContent)
      console.log(`${filePath} found, use it`);
      return weekShifts
    } catch (error) {
      console.log(`Cannot find shifts for ${date}, return template and init file ..`);
      const template = this.weekShiftsTemplateFor(date)
        ; (async () => { this.store(date, template) })()
      return template
    }
  }

  private store(date: Moment, weekShifts: WeekShifts) {
    const filePath = this.filePathFor(date)
    fs.writeFile(filePath, JSON.stringify(weekShifts), (error) => {
      if (error) {
        console.log(`Cannot write ${filePath} file to filesystem`, error);
        throw error;
      }
      console.log(`${filePath} written to filesystem`);
    })
  }

  private filePathFor = (date: Moment) => './store/' + date.format('yyyyMMDD') + '.json'

  private weekShiftsTemplateFor(date: Moment): WeekShifts {
    return {
      date: '2021-11-22',
      shifts: [
        {
          date: '2021-11-22',
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
          date: '2021-11-23',
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
          date: '2021-11-24',
          morning: [
            { name: 'Sonia', color: 'green' },
            { name: 'Anna', color: 'default' },
            { name: 'Simone', color: 'default' },
            { name: 'Giulia in affiancamento', color: 'blue' }
          ],
          afternoon: []
        },
        {
          date: '2021-11-25',
          morning: [
            { name: 'Cristiana', color: 'default' },
            { name: 'Giuliana', color: 'default' }
          ],
          afternoon: [
            { name: 'Alice', color: 'default' }
          ]
        },
        {
          date: '2021-11-26',
          morning: [
            { name: 'Anna', color: 'default' },
          ],
          afternoon: [
            { name: 'Ylenia + Mamy', color: 'default' }
          ]
        },
        {
          date: '2021-11-27',
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
          date: '2021-11-28',
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