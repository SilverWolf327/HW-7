class AlarmClock {
    constructor() {
        
        this.alarmCollection = [];
        this.intervalId = null;       
    }

    addClock(time, callback, id) {

        if (id === undefined) throw new Error('Отсутствуют обязательные аргументы');
        
        if (this.alarmCollection.find(element => element.id === id)) {
            console.warn('Уже присутствует звонок на это же время');
            return;
        }

        return this.alarmCollection.push(
            {id, time, callback}
        )
    }

    removeClock(id) {

        let preLength = this.alarmCollection.length;

        const indexResult = this.alarmCollection.findIndex((object) => object.id === id);
        this.alarmCollection.splice(indexResult, 1);

        return  (preLength - this.alarmCollection.length !==0);

    }

    getCurrentFormattedTime() {
        
        let nowDate = new Date();
        return (
            nowDate.toLocaleTimeString("ru-Ru", {
                hour: "2-digit",
                minute: "2-digit",
            })
        )
    }

    start() {
    
        checkClock = checkClock.bind(this);

        function checkClock(time, callback) {
            
            if (time === this.getCurrentFormattedTime()) callback();
        }  
 
        if (this.intervalId === null) {           

            this.intervalId = setInterval(() => {
                    for (const item of this.alarmCollection){
                       let currentTime = item.time;
                       let currentCallback = item.callback; 
                       checkClock(currentTime, currentCallback);
                    }
                }
            )
        }
    } 
   
    stop() {

        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }

    }

    printAlarms() {

        this.alarmCollection.forEach((item, idx) => console.log('Будильник №' + this.alarmCollection[idx].id + ' заведён на' + this.alarmCollection[idx].time));

    }

    clearAlarms() {
        this.stop();
        this.alarmCollection = [] ;
    }

}
