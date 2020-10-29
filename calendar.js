let today = dayjs().date() //今天
let todayMonth = dayjs().month() //當下月份
let todayYear=dayjs().year()
let additems = document.querySelector("#item")
let user = document.querySelector("#user")
let itemDate = document.querySelector("#itemDate")
let itemYear = document.querySelector("#itemYear")
let tag = [{ todo: "Aclass", name: 'Alex', date: '2020-10-13' }, { todo: "Bclass", name: 'Bill', date: '2020-11-01' }]
let holiday=[{todo: "春節", date: '2020-01-23'},{todo: "春節", date: '2020-01-24'},{todo: "春節", date: '2020-01-25'},{todo: "春節", date: '2020-01-26'},{todo: "春節", date: '2020-01-27'},{todo: "春節", date: '2020-01-28'},{todo: "春節", date: '2020-01-29'},{todo: "228紀念日", date: '2020-02-28'},{todo: "清明節", date: '2020-04-04'},{todo: "端午節", date: '2020-06-25'},{todo: "彈性放假", date: '2020-06-26'},{todo: "中秋節", date: '2020-10-01'},{todo: "彈性放假", date: '2020-10-02'},{todo: "彈性放假", date: '2020-10-09'},{todo: "雙十節", date: '2020-10-10'},{todo: "元旦", date: '2020-01-01'},]
function forAddItem() {
    let newObj = { todo: '', name: '', date: '' }
    newObj.todo = additems.value
    newObj.name = user.value
    newObj.date = itemDate.value
    console.log('itemDate = ',itemDate)
    tag.push(newObj)
    let m=itemDate.value.split('-')[1]*1
    let d=itemDate.value.split('-')[2]*1
    let a = document.querySelector(`.month_${m} .day_${d}`)
    let tagItem = document.createElement("div")
    if(a.childNodes.length>3){
      alert('已超過增加項目')
      return false
    }
    tagItem.className = 'tagBorder'
    tagItem.innerHTML = newObj.todo + '-' + newObj.name
    a.appendChild(tagItem)
}
let chooseYear=document.querySelector("#itemYear")
let test = document.querySelector(".test")
let yearNow='year_'+2020
let stepNum=0

// step.1 選擇年分
//輸入年分
function forAddYear(){
    let delEl=document.querySelectorAll(`.${yearNow}`)
    if(test.children.length>0){
        console.log('delEl = ',delEl)
        console.log('yearNow = ',yearNow)
        for(let i=0;i<delEl.length;i++){
            delEl[i].remove()
        }
        
    }
    stepNum++
    console.log('forAddYear = ',stepNum)
    let add=chooseYear.value?chooseYear.value:dayjs().year()
    getYear(add)
}

// step.2 選擇執行箱子製造(天數),並判斷每個月的總天數以及每個月1號為星期幾
//獲取每個月的總天數
function getYear(theYear=2020){
    // console.log(yearNow)
    stepNum++
    console.log('getYear = ',stepNum)
    yearNow='year_'+theYear
    for (let i = 1; i <= 12; i++) {
      let getMonth = dayjs(`${theYear}-${i}-01`).daysInMonth() //當月總天數
      let firstWeek = dayjs(`${theYear}-${i}-01`).date(1).$W //1號的星期
      let lastWeek = dayjs(`${theYear}-${i}-01`).date(getMonth).$W
      makeBox(i, getMonth, firstWeek, lastWeek)
  }
}

// step.3 開始創造每天以及加入tag
//創造小盒子
function makeBox(m, totalDay, firstWeek, lastWeek) {
    if(makeBox_aa){
        stepNum++
        console.log('makeBox = ',stepNum)
    }
    makeBox_aa=false
    let aMonthBox = document.createElement("div")
    let monthBox = document.createElement("div")
    aMonthBox.className = 'aMonthBox'+' '+'month_'+m+ ' '+yearNow
    aMonthBox.name = 'aMonthBox_' + m
    monthBox.className = 'monthBorder'
    monthBox.innerHTML = yearNow.split("_")[1]+ ' / '+m + '月'
    aMonthBox.appendChild(monthBox)
    // test.appendChild(monthBox)
    let weekBoxs=document.createElement("div")
    weekBoxs.className='weekBoxBorder'
    for (let j = 1; j <= 7; j++) {
        let weekitem = document.createElement("div")
        weekitem.className = 'weekBorder'

        if (j >= 6) {
          weekitem.className = 'weekBorderHoliday'
        }
        weekitem.innerHTML = changeStr(j)
        weekBoxs.appendChild(weekitem)
        aMonthBox.appendChild(weekBoxs)
        // test.appendChild(weekBox)
    }
    //產生天數的box
    let dayBox=document.createElement("div")
    dayBox.className='dayBoxBorder'
    for (let i = 1; i <= totalDay; i++) {
        let itemBox = document.createElement("div")
        itemBox.className = "itemBorder"+' '+`day_${i}`
        //產生空格,將1號推至正確的星期
        if (i == 1) {
            if (firstWeek == 0) {
                firstWeek = 7
            }
            for (let k = 1; k < firstWeek; k++) {
                let spaceBox = document.createElement("div")
                spaceBox.className = "itemBorder"
                spaceBox.innerHTML = ' '
                dayBox.appendChild(spaceBox)
                aMonthBox.appendChild(dayBox)
                // test.appendChild(spaceBox)
            }
        }
        itemBox.innerHTML = i
        //今天的日期會顯示不同顏色
        if (i == today && m == todayMonth + 1) {
            itemBox.className = "todayColor"
        }

        //產生tag
        for (let x = 0; x < tag.length; x++) {
            let personMonth = tag[x].date.split("-")[1]
            let personDay = tag[x].date.split("-")[2]
            let tagItem = document.createElement("div")
            if (m == personMonth && i == personDay) {
                tagItem.className = 'tagBorder'
                tagItem.innerHTML = tag[x].todo + '-' + tag[x].name;
                itemBox.appendChild(tagItem)
            }
        }
        //產生tag
        for (let x = 0; x < holiday.length; x++) {
            let personMonth = holiday[x].date.split("-")[1]
            let personDay = holiday[x].date.split("-")[2]
            let tagItem = document.createElement("div")
            if (m == personMonth && i == personDay) {
                tagItem.className = 'holidaytagBorder'
                tagItem.innerHTML = holiday[x].todo;
                itemBox.appendChild(tagItem)
            }
        }
        
        dayBox.appendChild(itemBox)
        aMonthBox.appendChild(dayBox)
        // test.appendChild(itemBox)
        if (i == totalDay) {
            if(lastWeek!=0){
                for (let k = 1; k <= 7 - lastWeek; k++) {
                    let spaceBox = document.createElement("div")
                    spaceBox.className = "itemBorder"
                    spaceBox.innerHTML = ' '
                    dayBox.appendChild(spaceBox)
                    aMonthBox.appendChild(dayBox)
                }
            }
                
        }
    }
    test.appendChild(aMonthBox)
}

let changeStr_aa=true

// step.4 將星期幾的num更改為str
function changeStr(num) {
    if(changeStr_aa){
        stepNum++
        console.log('changeStr = ',stepNum)
    }
    changeStr_aa=false
    switch (num) {
        case 1:
            return 'Mon'
        case 2:
            return 'Tue'
        case 3:
            return 'Wed'
        case 4:
            return 'Thu'
        case 5:
            return 'Fri'
        case 6:
            return 'Sat'
        case 7:
            return 'Sun'
    }
}

let makeBox_aa=true

function test_1(){
    console.log('test_1')
}



function feauture2_test_1(){
    console.log('feauture2_test_1')
}
