const btn = document.querySelector('.btn')
const input = document.querySelector('input')
const ctx = document.createElement('canvas')
const att = document.querySelector('[name=att]')
const acc = document.querySelector('[name=acc]')

btn.addEventListener('click', function () {
    let file = input.files[0]
    let reader = new FileReader()
    let res = 0
    let data = []
    
    reader.readAsText(file)
    reader.onload = function () {
        res = reader.result
        res = res.replaceAll('\t', '').replaceAll('\r', '')
        res = res.split('\n')
        let lbls = []
        let dataA = []
        let dataG = []
        for (let i = 0; i < res.length; i++) {
            if(res[i].split(';').length == 10) {
                data.push(res[i].split(';'))
                lbls.push(+res[i].split(';')[1])
                dataA.push(+res[i].split(';')[2])
                dataG.push(+res[i].split(';')[4])
            }
        }
        //console.log(data)
        //console.log(lbls)
        //console.log(dataA)
        //console.log(dataG)
        console.log(Math.max(...dataA))
        document.body.innerHTML = ''
        ctx.height = window.innerHeight
        ctx.width = window.innerWidth
        document.body.appendChild(ctx)
        if (att.checked && acc.checked) {
            let myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: lbls,
                    datasets: [{
                            label: 'Высота',
                            data: dataA,
                            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                            borderColor: ['rgba(0,0,255,0.8)'],
                            borderWidth: 1,
                            radius: 2,
                            cubicInterpolationMode: 'monotone'
                        },
                        {
                            label: 'Ускорение',
                            data: dataG,
                            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                            borderColor: ['rgba(0,255,0,0.8)'],
                            borderWidth: 1,
                            radius: 2,
                            cubicInterpolationMode: 'monotone'
                        }
                    ],

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
        } else if (att.checked) {
            let myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: lbls,
                    datasets: [{
                        label: 'Высота',
                        data: dataA,
                        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                        borderColor: ['rgba(0,0,255,0.8)'],
                        borderWidth: 1,
                        radius: 2,
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
        } else if (acc.checked) {
            let myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: lbls,
                    datasets: [{
                        label: 'Ускорение',
                        data: dataG,
                        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                        borderColor: ['rgba(0,255,0,0.8)'],
                        borderWidth: 1,
                        radius: 2,
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