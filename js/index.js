let index = 0
let songs = [
    'BTS (防弹少年团) - Butterfly (prologue mix)',
    'Masque_Jupiter - Luv letter （Wind&Thunder&Rain）',
    '뷔 (V) - 안아줘 (抱紧我) (Cover.)',
]
const nextSong = function() {

    index = (index + 1) % songs.length
    let src = 'audio/' + songs[index] + '.mp3'
    return src
}

const replay = function() {

    // index = (index + 1) % songs.length
    let src = 'audio/' + songs[index] + '.mp3'
    return src
}

const PreviousSongs = function() {
    index = (index - 1 + songs.length) % songs.length
    let src = 'audio/' + songs[index] + '.mp3'
    return src
}

const bindEventEnded = function(audio) {
    let RandomtIcon = e('.shuffle')
    let ReplayIcon = e('.replay')
    let s = ''
    audio.addEventListener('ended', function() {
        log('播放结束')
        if (RandomtIcon.classList.contains('active')) {
            log("RandomPlay")
            s = RandomPlay()
            log('s is', s)
            audio.src = s
            // audio.play()
        } else if (ReplayIcon.classList.contains('active')) {
            // let a = e('#id-audio-player')
            // audio.currentTime = 0.2
            s = replay()
        } else {
            log("nextSong")
            s = nextSong()
            log('s is', s)
            audio.src = s
        }
        info(s)
        img(s)
        audio.play()
    })
}

const bindEventCanplay = function(audio) {
    // 只有在 canplay 事件的回调函数中才能获取这首歌的 duration
    // 在其他地方获取只能得到 NaN
    audio.addEventListener('canplay', function() {
        let current = audio.currentTime
        let duration = audio.duration

        log('current and duration in canplay', current, duration, audio.volume)
        // let currentTimeLabel = e('#id-label-currentTime')
        // currentTimeLabel.innerHTML = current
        // d.innerHTML = duration
        // let c = e("#id-span-duration")
        setDurationTime(audio)
    })
}

const timerDemo = function(audio) {
    let clockId = setInterval(function() {
        timer(audio)
    }, 1000)
}

const bindEventPlay = function(audio) {
    let button = e('#id-button-play')
    button.addEventListener('click', function() {
        if (button.classList.contains('fa-play')) {
            button.classList.remove('fa-play')
            button.classList.toggle('fa-pause')
            audio.play()
        } else {
            button.classList.remove('fa-pause')
            button.classList.toggle('fa-play')
            audio.pause()
        }
    })
}

// 点击播放下一首
const bindEventsNextSong = function(audio) {
    let button = e('#id-button-play')
    let NextIcon = e('#id-NextIcon')
    let RandomtIcon = e('.shuffle')
    let s = ''
    NextIcon.addEventListener('click', function() {
        log('下一首')
        if (button.classList.contains('fa-play')) {
            button.classList.remove('fa-play')
            button.classList.toggle('fa-pause')
        }
        if (RandomtIcon.classList.contains('active')) {
            s = RandomPlay()
            audio.src = s
        } else {
            s = nextSong()
            audio.src = s
        }
        info(s)
        img(s)
        audio.play()
    })
}

// 点击播放上一首
const bindEventsPreviousSong = function(audio) {
    // let currentsong = e('#id-audio-player')
    let button = e('#id-button-play')
    let PreviousSong = e('#id-PreviousSong')
    PreviousSong.addEventListener('click', function() {
        log('上一首')
        let s = PreviousSongs()
        log('s is', s)
        audio.src = s
        if (button.classList.contains('fa-play')) {
            button.classList.remove('fa-play')
            button.classList.toggle('fa-pause')
        }
        info(s)
        img(s)
        audio.play()
    })
}

// 点击爱心
const bindEventsHeartIcon = function() {
    let HeartIcon = e('.fa-heart')
    HeartIcon.addEventListener('click', function() {
    log('点击爱心')
        if (HeartIcon.classList.contains('fa-heart')) {
            HeartIcon.classList.remove('fa-heart')
            HeartIcon.classList.toggle('fa-heart-o')
        } else {
            HeartIcon.classList.remove('fa-heart-o')
            HeartIcon.classList.toggle('fa-heart')
        }
    })
}

// 随机播放
const choice = function(array) {
    return a = Math.ceil(Math.random() * 100) % array.length
}

const RandomPlay = function() {
    index = choice(songs)
    let src = 'audio/' + songs[index] + '.mp3'
    return src
}

// 点击随机播放图标
const bindEventsRandomPlay = function() {
    let RandomtIcon = e('.shuffle')
    let ReplayIcon = e('.replay')
    RandomtIcon.addEventListener('click', function() {
        log('点击随机播放图标')
        if (ReplayIcon.classList.contains('active')) {
            ReplayIcon.classList.remove('active')
        }
        RandomtIcon.classList.toggle('active')
    })
}

// 点击单曲循环图标
const bindEventsReplay = function(audio) {
    let RandomtIcon = e('.shuffle')
    let ReplayIcon = e('.replay')
    ReplayIcon.addEventListener('click', function() {
        log('点击单曲循环图标')
        if (RandomtIcon.classList.contains('active')) {
            RandomtIcon.classList.remove('active')
        }
        ReplayIcon.classList.toggle('active')
        // bindRandomPlay(audio)
    })
}

// 歌手、歌名显示
const info = function(s) {
    // log('debug3', audio.src)
    let s1 = s.slice(6, -4).split('-')
    log('sss', s1)
    let song = s1[1]
    let artist = s1[0]
    let sgElement = e('.song')
    let atElement = e('.artist')
    sgElement.innerHTML = song
    atElement.innerHTML = artist
    log('debug4')
}

const img = function(s) {
    // log('debug3', audio.src)
    let s1 = s.slice(0, -4) + '.jpg'
    let images = e('#id-img-1')
    images.src = s1
}

// 时长 duration
const timer = function(audio) {
    let t = ``
    log('debug a')
    let labelDuration = e('#id-label-currentTime')
    let minutes = String(Math.floor(audio.currentTime / 60))
    let seconds = String(Math.floor(audio.currentTime % 60))
    if (seconds.length < 2) {
        seconds = '0' + seconds
    }
    if (minutes.length < 2) {
        minutes = '0' + minutes
    }
    t = `${minutes}:${seconds}`
    labelDuration.innerHTML = t

    let inputProgress = e('.progress')
    let value = audio.currentTime / audio.duration * inputProgress.max
    inputProgress.value = value
}

// 点击进度条
const bindEventProgress = function(audio) {
    let inputProgress = e('.progress')
    bindEvent(inputProgress, 'click', (event) => {
        let value = event.target.value
        log('value', value)
        let newCurrentTime = value / inputProgress.max * audio.duration
        log('newCurrentTime', newCurrentTime)
        audio.currentTime = newCurrentTime
    })

}

// 音量调节
// const bindEventsVolumeAdjust = function() {
//     let VolumeAdjustIcon = e(".volume")
//     let volumeslider = e(".volume-slider")
//     VolumeAdjustIcon.addEventListener('click', function() {
//         log('点击音量调节图标')
//         // VolumeAdjustIcon.removeClass("active")
//         volumeslider.animate({marginTop: '-150px'}, 500)
//     })
// }
const bindEventVolume = function (audio) {

    let VolumeAdjustIcon = e(".fa-volume-up")
    let volumeSlider = e(".volume-slider")
    VolumeAdjustIcon.addEventListener('click', function() {
        volumeSlider.style.marginTop = '-150px'
        volumeSlider.style.display = 'inline-block'
    })

    let closeVolumeIcon = e("#closeVolume")
    closeVolumeIcon.addEventListener('click', function() {
        volumeSlider.style.marginTop = '0px'
        volumeSlider.style.display = 'none'
    })
}

// 调节音量
const updateVolume = function(audio) {
    audio.volume = 0.5
    let volume = e('#fader-1')
    log('debug', volume.value)
    bindEvent(volume, 'click', (event) => {
        let value = event.target.value
        log('value', value)
        audio.volume = value / volume.max
    })
    volume.value = audio.volume * 100
}

// 时长显示
// const bindEventcurrentTime = function() {
//     let currentTimeLabel = e('#id-label-currentTime')
//     RandomtIcon.addEventListener('click', function() {
//         log('点击随机播放图标')
//         if (ReplayIcon.classList.contains('active')) {
//             ReplayIcon.classList.remove('active')
//         }
//         RandomtIcon.classList.toggle('active')
//     })
// }

const bindEvents = function(audio) {
    bindEventEnded(audio)
    bindEventCanplay(audio)
    bindEventPlay(audio)
    bindEventsNextSong(audio)
    bindEventsPreviousSong(audio)
    timerDemo(audio)
    bindEventsHeartIcon()
    bindEventsRandomPlay()
    bindEventsReplay()
    bindEventProgress(audio)
    bindEventVolume(audio)
}

const setDurationTime = function (audio) {
    // 显示当前歌曲总时间
    let t = ``
    let labelDuration = e('#id-label-duration')
    let minutes = String(Math.floor(audio.duration / 60))
    let seconds = String(Math.floor(audio.duration % 60))
    if (seconds.length < 2) {
        seconds = '0' + seconds
    }
    if (minutes.length < 2) {
        minutes = '0' + minutes
    }
    t = `${minutes}:${seconds}`
    labelDuration.innerHTML = t
}

const __main = function() {
    let audio = e('#id-audio-player')
    bindEvents(audio)
    updateVolume(audio)
    // renderPlayer()
}

__main()

// 时间转换


