const startBtn = document.querySelector('.start-btn');
const deck = document.querySelector('.deck-preview');
const TOTAL_CARDS = 22; 
let cards = [];

// ★ 1. 메이저 아르카나 22장 전체 데이터
const tarotData = [
    { 
        name: "00. 바보 (The Fool)", 
        image: "./tarot cards/0.png", 
        uprightDesc: "자유로운 영혼, 새로운 시작, 무한한 가능성이 열려 있습니다. 계산하지 말고 마음이 이끄는 대로 도약하세요.",
        reversedDesc: "무모한 행동, 부주의함, 현실 도피를 주의하세요. 너무 생각 없이 뛰어들면 위험할 수 있습니다."
    },
    { 
        name: "01. 마법사 (The Magician)", 
        image: "./tarot cards/01.png", 
        uprightDesc: "창조력, 자신감, 잠재력의 발현. 당신에게는 이미 무언가를 시작하고 이루어낼 모든 도구와 능력이 갖춰져 있습니다.",
        reversedDesc: "의지 부족, 재능의 낭비, 또는 누군가의 속임수를 조심하세요. 아직 준비가 덜 되었을 수 있습니다."
    },
    { 
        name: "02. 여사제 (The High Priestess)", 
        image: "./tarot cards/02.png", 
        uprightDesc: "직관, 무의식, 통찰력. 겉으로 드러난 것보다 숨겨진 진실에 주목하세요. 당신의 내면의 목소리가 정답을 알고 있습니다.",
        reversedDesc: "억눌린 감정, 직관의 무시, 표면적인 것에 대한 집착. 누군가 당신에게 비밀을 숨기고 있을 수 있습니다."
    },
    { 
        name: "03. 여황제 (The Empress)", 
        image: "./tarot cards/03.png", 
        uprightDesc: "풍요, 모성애, 아름다움, 창조력. 당신의 노력들이 비로소 아름다운 결실을 맺는 따뜻하고 평화로운 시기입니다.",
        reversedDesc: "허영심, 지나친 의존, 감정의 기복. 자신을 돌보지 않고 타인에게만 헌신하거나 낭비가 심해질 수 있습니다."
    },
    { 
        name: "04. 황제 (The Emperor)", 
        image: "./tarot cards/04.png", 
        uprightDesc: "권위, 구조, 안정, 책임감. 감정보다는 논리와 규칙으로 상황을 통제하고 리더십을 발휘할 때입니다.",
        reversedDesc: "독재, 완고함, 통제력 상실. 너무 억압적인 태도가 주변과의 마찰을 빚거나, 반대로 무기력해질 수 있습니다."
    },
    { 
        name: "05. 교황 (The Hierophant)", 
        image: "./tarot cards/05.png", 
        uprightDesc: "전통, 신념, 교육, 조언자. 기존의 규칙과 지혜를 따르는 것이 좋습니다. 믿을 만한 멘토의 도움을 받을 수 있습니다.",
        reversedDesc: "맹신, 반항, 전통의 파괴. 틀에 박힌 규칙에서 벗어나고 싶은 충동이 들거나 잘못된 조언을 주의해야 합니다."
    },
    { 
        name: "06. 연인 (The Lovers)", 
        image: "./tarot cards/06.png", 
        uprightDesc: "사랑, 조화, 깊은 관계, 가치 있는 선택. 마음이 진정으로 끌리는 사람이나 일을 만나게 되며 긍정적인 결합을 이룹니다.",
        reversedDesc: "불화, 불균형, 잘못된 선택. 관계의 단절이나 내면의 갈등이 발생할 수 있으니 신중한 결정이 필요합니다."
    },
    { 
        name: "07. 전차 (The Chariot)", 
        image: "./tarot cards/07.png", 
        uprightDesc: "의지력, 승리, 결단력. 강한 추진력으로 장애물을 극복하고 목표를 향해 곧게 전진할 수 있습니다.",
        reversedDesc: "방향 상실, 통제력 부족, 공격성. 무리하게 밀어붙이다가 좌절을 겪거나 상황이 통제를 벗어날 수 있습니다."
    },
    { 
        name: "08. 힘 (Strength)", 
        image: "./tarot cards/08.png", 
        uprightDesc: "내면의 힘, 용기, 인내, 관용. 물리적인 힘이 아닌 부드러움과 끈기로 어려운 상황이나 두려움을 길들일 수 있습니다.",
        reversedDesc: "나약함, 자기 의심, 충동. 감정 통제에 실패하여 불안정해지거나 용기를 잃고 물러설 수 있습니다."
    },
    { 
        name: "09. 은둔자 (The Hermit)", 
        image: "./tarot cards/09.png", 
        uprightDesc: "성찰, 고독, 내면의 지혜. 잠시 세상과 거리를 두고 혼자만의 시간을 가지며 해답을 깊이 탐구할 때입니다.",
        reversedDesc: "고립, 소외, 지나친 은둔, 현실 도피. 세상과의 소통을 완전히 단절하여 외로움에 빠질 수 있습니다."
    },
    { 
        name: "10. 운명의 수레바퀴 (Wheel of Fortune)", 
        image: "./tarot cards/10.png", 
        uprightDesc: "긍정적인 전환점, 행운, 타이밍. 거스를 수 없는 운명의 흐름이 당신에게 유리한 쪽으로 돌아가기 시작합니다.",
        reversedDesc: "불운, 예상치 못한 방해, 정체. 지금은 억지로 상황을 바꾸려 하기보다 묵묵히 때를 기다리는 것이 현명합니다."
    },
    { 
        name: "11. 정의 (Justice)", 
        image: "./tarot cards/11.png", 
        uprightDesc: "공정함, 진실, 인과응보, 균형. 감정에 치우치지 않는 이성적이고 객관적인 판단이 결국 옳은 결과를 가져옵니다.",
        reversedDesc: "불공정, 편견, 책임 회피. 잘못된 판단을 내리거나 부당한 대우를 받을 수 있으니 신중해야 합니다."
    },
    { 
        name: "12. 매달린 사람 (The Hanged Man)", 
        image: "./tarot cards/12.png", 
        uprightDesc: "관점의 전환, 기다림, 깨달음을 위한 희생. 잠시 멈춰서서 세상을 거꾸로 바라보면 새로운 해결책이 보일 것입니다.",
        reversedDesc: "무의미한 희생, 이기심, 헛된 노력. 상황이 좀처럼 나아지지 않고 묶여 있는 듯한 답답함을 느낄 수 있습니다."
    },
    { 
        name: "13. 죽음 (Death)", 
        image: "./tarot cards/13.png", 
        uprightDesc: "끝과 새로운 시작, 불가피한 변화. 낡은 습관이나 관계를 끝맺어야만 비로소 새로운 챕터가 열립니다.",
        reversedDesc: "변화에 대한 두려움, 정체, 집착. 끝내야 할 것을 붙잡고 있어 고통이 길어지거나 새 출발을 가로막고 있습니다."
    },
    { 
        name: "14. 절제 (Temperance)", 
        image: "./tarot cards/14.png", 
        uprightDesc: "균형, 조화, 인내, 치유. 서로 다른 것들을 잘 융합하여 적절한 중용을 찾으면 평화로운 결과가 찾아옵니다.",
        reversedDesc: "불균형, 무절제, 갈등. 한쪽으로 극단적으로 치우치거나 성급한 행동으로 인해 관계나 일이 엇갈릴 수 있습니다."
    },
    { 
        name: "15. 악마 (The Devil)", 
        image: "./tarot cards/15.png", 
        uprightDesc: "구속, 집착, 유혹, 물질주의. 벗어나고 싶지만 달콤한 유혹이나 나쁜 습관에 얽매여 있을 수 있습니다.",
        reversedDesc: "해방, 깨달음, 구속에서의 탈피. 마침내 당신을 옭아매던 부정적인 상황이나 관계를 끊어내고 자유를 되찾습니다."
    },
    { 
        name: "16. 탑 (The Tower)", 
        image: "./tarot cards/16.png", 
        uprightDesc: "갑작스러운 붕괴, 재난, 급격한 변화. 견고해 보이던 기반이 흔들리지만, 이는 새로운 건물을 짓기 위한 필수적인 파괴입니다.",
        reversedDesc: "변화에 대한 저항, 간신히 피한 위기. 파국은 면했지만 근본적인 문제는 여전히 남아있어 불안감이 지속될 수 있습니다."
    },
    { 
        name: "17. 별 (The Star)", 
        image: "./tarot cards/17.png", 
        uprightDesc: "희망, 영감, 치유, 평화. 어두운 시기가 지나고 밝은 미래를 약속하는 긍정적인 에너지가 당신을 비춥니다.",
        reversedDesc: "절망, 실망, 영감 부족. 부정적인 생각에 사로잡혀 눈앞에 있는 희망의 빛을 보지 못하고 있을 수 있습니다."
    },
    { 
        name: "18. 달 (The Moon)", 
        image: "./tarot cards/18.png", 
        uprightDesc: "불안, 환상, 혼란, 숨겨진 진실. 상황이 뚜렷하지 않아 두렵고 모호합니다. 직감을 믿되 신중하게 걸음을 내디뎌야 합니다.",
        reversedDesc: "두려움의 극복, 진실의 발견. 혼란을 주던 안개가 걷히고 숨겨졌던 비밀이나 사실이 명확하게 드러납니다."
    },
    { 
        name: "19. 태양 (The Sun)", 
        image: "./tarot cards/19.png", 
        uprightDesc: "성공, 기쁨, 활력, 긍정. 먹구름이 걷히고 모든 일이 순조롭고 눈부시게 풀려나가는 최고의 행운을 의미합니다.",
        reversedDesc: "일시적인 우울, 연기된 성공. 행복이 잠시 가려져 있을 뿐, 본질적인 긍정의 에너지는 잃지 않았습니다."
    },
    { 
        name: "20. 심판 (Judgement)", 
        image: "./tarot cards/20.png", 
        uprightDesc: "부활, 재평가, 각성, 결단. 과거의 노력에 대한 정당한 보상을 받거나, 중요한 깨달음을 얻어 한 단계 도약하게 됩니다.",
        reversedDesc: "자기 의심, 잘못된 판단, 후회. 과거의 실수나 미련에 발목이 잡혀 새로운 기회를 놓치거나 외면할 수 있습니다."
    },
    { 
        name: "21. 세계 (The World)", 
        image: "./tarot cards/21.png", 
        uprightDesc: "완성, 통합, 성취, 해피엔딩. 하나의 긴 여정이 성공적으로 끝나고 완벽한 조화와 함께 더 큰 세상으로 나아갑니다.",
        reversedDesc: "미완성, 지연, 공허함. 목표 달성 직전에 정체되어 있거나, 성공을 이루었음에도 알 수 없는 허전함을 느낄 수 있습니다."
    }
];

// 배열을 무작위로 섞어주는 함수
function shuffleArray(array) {
    const shuffled = [...array]; 
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; 
    }
    return shuffled;
}

// 2. 초기 생성 (방향 결정 로직 추가!)
function initDeck() {
    deck.innerHTML = ''; 
    cards = [];
    deck.classList.add('is-ready'); 
    
    const shuffledTarotData = shuffleArray(tarotData);

    for (let i = 0; i < TOTAL_CARDS; i++) {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.zIndex = i;
        
        const myDestiny = shuffledTarotData[i % shuffledTarotData.length];
        
        // ★ 50% 확률로 역방향(true) 또는 정방향(false) 결정
        const isReversed = Math.random() < 0.5; 
        
        // 카드에 데이터 심어두기
        card.dataset.name = myDestiny.name;
        card.dataset.image = myDestiny.image;
        card.dataset.uprightDesc = myDestiny.uprightDesc;
        card.dataset.reversedDesc = myDestiny.reversedDesc;
        card.dataset.isReversed = isReversed; // 방향 정보 저장

        deck.appendChild(card);
        cards.push(card);
    }
}

initDeck();

// 3. 버튼 클릭 시 손 셔플 애니메이션
startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    startBtn.innerText = "운명을 섞는 중...";
    deck.classList.remove('is-ready'); 

    let shuffleCount = 0;
    const maxShuffles = 3; 
    let currentDeck = [...cards]; 

    function performHandShuffle() {
        if (shuffleCount >= maxShuffles) {
            currentDeck.forEach((card, i) => {
                card.classList.remove('is-shuffling');
                card.style.setProperty('--x-offset', '0px');
                card.style.setProperty('--y-offset', '0px');
                card.style.setProperty('--rot', '0deg');
                card.style.zIndex = i; 
            });

            setTimeout(() => {
                startBtn.innerText = "끌리는 카드를 한 장 선택하세요";

                currentDeck.forEach((card, i) => {
                    card.classList.add('can-hover');

                    const ratio = i / (TOTAL_CARDS - 1);
                    const leftPos = 15 + (ratio * 70); 
                    const yOffset = Math.abs(ratio - 0.5) * 40; 
                    const angle = -20 + (ratio * 40);

                    card.style.left = `${leftPos}%`;
                    card.style.setProperty('--y-offset', `${yOffset}px`);
                    card.style.setProperty('--rot', `${angle}deg`);

                    card.addEventListener('click', selectCard, { once: true });
                });
            }, 600); 
            return;
        }

        const cutPoint = Math.floor(Math.random() * 6) + 8; 
        let leftHand = currentDeck.slice(0, cutPoint);
        let rightHand = currentDeck.slice(cutPoint);
        let nextDeck = [...leftHand]; 

        leftHand.forEach(card => {
            card.classList.add('is-shuffling');
            card.style.setProperty('--x-offset', '-35px');
            card.style.setProperty('--y-offset', '15px');
            card.style.setProperty('--rot', '-5deg');
        });
        rightHand.forEach(card => {
            card.classList.add('is-shuffling');
            card.style.setProperty('--x-offset', '45px');
            card.style.setProperty('--y-offset', '-25px');
            card.style.setProperty('--rot', '5deg');
        });

        let dropInterval = setInterval(() => {
            if (rightHand.length === 0) {
                clearInterval(dropInterval);
                currentDeck = nextDeck; 
                shuffleCount++;
                setTimeout(performHandShuffle, 200); 
                return;
            }

            const dropCount = Math.min(Math.floor(Math.random() * 3) + 2, rightHand.length);
            const droppedCards = rightHand.splice(0, dropCount); 

            droppedCards.forEach(card => {
                nextDeck.push(card); 
                card.style.zIndex = nextDeck.length; 
                
                const rx = Math.random() * 8 - 4;
                const ry = Math.random() * 8 - 4;
                const rRot = -5 + (Math.random() * 6 - 3);
                
                card.style.setProperty('--x-offset', `${-35 + rx}px`);
                card.style.setProperty('--y-offset', `${15 + ry}px`);
                card.style.setProperty('--rot', `${rRot}deg`);
            });
        }, 150);
    }

    performHandShuffle(); 
});

// 4. 카드 선택 시 결과 처리 (방향에 따른 해설 및 이미지 회전 처리)
function selectCard(event) {
    const selectedCard = event.target;
    deck.classList.add('has-selection');
    
    cards.forEach(card => card.classList.remove('can-hover'));
    selectedCard.classList.add('is-selected');
    startBtn.innerText = "당신의 운명입니다";
    
    // 카드에 저장된 데이터 꺼내기
    const resultName = selectedCard.dataset.name;
    const resultImage = selectedCard.dataset.image;
    const isReversed = selectedCard.dataset.isReversed === 'true'; // 문자열을 boolean으로 변환
    
    // 역방향 여부에 따라 해설과 텍스트 결정
    const finalDesc = isReversed ? selectedCard.dataset.reversedDesc : selectedCard.dataset.uprightDesc;
    const directionLabel = isReversed ? "<span class='direction-text'> (역방향)</span>" : "<span class='direction-text'> (정방향)</span>";

    // 역방향이면 카드 자체를 180도 뒤집는 클래스 추가
    if (isReversed) {
        selectedCard.classList.add('is-reversed');
    }

    setTimeout(() => {
        selectedCard.style.backgroundImage = `url('${resultImage}')`;
        
        setTimeout(() => {
            document.getElementById('start-screen').style.display = 'none';
            
            // 결과 화면 데이터 입력
            document.getElementById('result-title').innerHTML = resultName + directionLabel;
            
            const resultImgEl = document.getElementById('result-img');
            resultImgEl.src = resultImage;
            
            // 결과 화면 이미지도 역방향 처리
            if (isReversed) {
                resultImgEl.classList.add('is-reversed');
            } else {
                resultImgEl.classList.remove('is-reversed'); // 이전 상태 초기화
            }
            
            document.getElementById('result-desc').innerText = finalDesc;
            
            document.getElementById('result-screen').style.display = 'flex';
        }, 2500); 

    }, 400); 
}

// 다시 뽑기 버튼
document.getElementById('retry-btn').addEventListener('click', () => {
    window.location.reload(); 
});