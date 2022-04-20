const btn = document.querySelector('.btn')
const input = document.querySelector('input')
const ctx = document.createElement('canvas')
const att = document.querySelector('[name=att]')
const acc = document.querySelector('[name=acc]')
function pars(arr) {
    let result = []
    let out = {}
    for(let i =0; i<arr.length; i++) {
        result.push(arr[i].split('\t'))
        for(let j = 0; j< result[i].length; j++) {
            result[i][j]= result[i][j].split(':')
            for(let q = 0; q<result[i][j].length;q++) {
                if(result[i][j][q]== +result[i][j][q]) {
                    result[i][j][q] = +result[i][j][q]
                }
            }
        }
    }
    for(let i =0;i<result.length;i++) {
        if(result[i].length == 12) {
            out[result[i][1][1]] = {
                [result[i][0][0]]: result[i][0][1],
                [result[i][2][0]]: result[i][2][1],
                [result[i][3][0]]: result[i][3][1],
                [result[i][4][0]]: result[i][4][1],
                [result[i][5][0]]: result[i][5][1],
                [result[i][6][0]]: [result[i][6][1], result[i][7][0], result[i][8][0]],
                [result[i][9][0]]: result[i][9][1],
                [result[i][10][0]]: result[i][10][1],
                [result[i][11][0]]: result[i][11][1]
            }
        }


    }
    return(out)
}
btn.addEventListener('click', function() {
    let file = input.files[0]
    let reader = new FileReader()
    let res =0
    reader.readAsText(file)
    reader.onload = function() {
        res = reader.result
        console.log(res)
        res = res.replaceAll('\t\r', '')
        res = res.split('\n')
        res.pop()
        console.log(res)
        let out = pars(res)
        let lbls = Object.keys(out)
        dataA = []
        for(let i =0; i< lbls.length; i++) {
            dataA.push(out[lbls[i]]['Altitude'])
        }
        dataG = []
        for(let i=0; i<lbls.length; i++) {
            dataG.push(out[lbls[i]]['accel']/9.81)
        }
        console.log(pars(res))
        document.body.innerHTML = ''
        ctx.height = window.innerHeight
        ctx.width = window.innerWidth
        document.body.appendChild(ctx)
        if(att.checked && acc.checked) {
            let myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: lbls,
                    datasets: [{
                        label: 'Высота',
                        data: dataA,
                        backgroundColor:['rgba(255, 99, 132, 0.2)'],
                        borderColor: ['rgba(0,0,255,0.8)'],
                        borderWidth: 2,
                        cubicInterpolationMode: 'monotone'
                    },
                    {
                        label: 'Ускорение',
                        data: dataG,
                        backgroundColor:['rgba(255, 99, 132, 0.2)'],
                        borderColor: ['rgba(0,255,0,0.8)'],
                        borderWidth: 2,
                        cubicInterpolationMode: 'monotone'
                    }],
    
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Андромеда'
                        }
                    }
                }
            })
        } else if(att.checked) {
            let myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: lbls,
                    datasets: [{
                        label: 'Высота',
                        data: dataA,
                        backgroundColor:['rgba(255, 99, 132, 0.2)'],
                        borderColor: ['rgba(0,0,255,0.8)'],
                        borderWidth: 2,
                        cubicInterpolationMode: 'monotone'
                    }],
    
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Андромеда'
                        }
                    }
                }
            })
        } else if(acc.checked) {
            let myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: lbls,
                    datasets: [
                    {
                        label: 'Ускорение',
                        data: dataG,
                        backgroundColor:['rgba(255, 99, 132, 0.2)'],
                        borderColor: ['rgba(0,255,0,0.8)'],
                        borderWidth: 2,
                        cubicInterpolationMode: 'monotone'
                    }],
    
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Андромеда'
                        }
                    }
                }
            })
        }

    }
})