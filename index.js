
    function calc(){
        let sleepHrs = document.getElementById('horaDormir').value;
        let wakeUpHrs = document.getElementById('horaAcordar').value;
        let sleepGoal = parseFloat(document.getElementById('metaSono').value);
        let result = document.getElementById('resultado');
        let list = document.getElementById('listaMetas');

        if(!sleepHrs || !wakeUpHrs || isNaN(sleepGoal)){
            result.innerText = 'Por favor, preencha todos os campos.';
        }else{
            let sleepTime = calcSleep(sleepHrs,wakeUpHrs);
            sleepTime = sleepTime.toFixed(2);
            if(sleepTime < sleepGoal){
                result.innerText = `Você vai dormir ${sleepTime} horas. Abaixo da meta. 💤`;
            }
            else if(sleepTime === sleepGoal){
                result.innerText = `Você vai dormir ${sleepTime} horas. Meta de sono atingida! ✅`
            }
            else{
                result.innerText = `Você vai dormir ${sleepTime} horas. Acima da meta de sono!  😴`
            }

            addToList(list, sleepTime, sleepGoal);
        }
        
        

    }

    function addToList(list,sleepTime, sleepGoal){
        
        let li = document.createElement('li');
        let msg = '';

        if(sleepTime < sleepGoal){
            msg = `Sua meta: ${sleepGoal} - Horas de sono: ${sleepTime}: Esse horario não atinge sua meta!`;
        }
        else if(sleepTime === sleepGoal){
            msg = `Sua meta: ${sleepGoal} - Horas de sono: ${sleepTime}: Esse horario atinge sua meta!`;
        }
        else{
            msg = `Sua meta: ${sleepGoal} - Horas de sono: ${sleepTime}: Esse horario esta acima da sua meta!`;
        }
        li.textContent = msg;
        list.appendChild(li);

        li.addEventListener('click', () => {
            list.removeChild(li);
        })
    }

    function calcSleep(sleepHrs,wakeUpHrs){
        let [sleepH, sleepMin] = sleepHrs.split(':').map(Number);
        let [wakeHrs, wakeMin] = wakeUpHrs.split(':').map(Number);

        

        const dateSleep = new Date();
        dateSleep.setHours(sleepH,sleepMin,0);

        const dateWakeUp = new Date();
        dateWakeUp.setHours(wakeHrs,wakeMin,0);

        //Diferanca do pulo da madrugada
        if(dateWakeUp <= dateSleep){
            dateWakeUp.setDate(dateWakeUp.getDate() + 1);
        }

        let HrsDiff = dateWakeUp - dateSleep;
        let TotalHoursSleep = HrsDiff / (1000*60*60);
        console.log(TotalHoursSleep);
        return TotalHoursSleep;
    }

    

