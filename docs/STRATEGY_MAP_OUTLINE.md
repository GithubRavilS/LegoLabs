# DeFi Strategy Map — ChatGPT Outline (accumulating)

Source: ChatGPT educational guide outline for branching visual story (~12–15 screens), Lego Labs.
Status: collecting fragments · do not ask user · store every paste here.

Last updated: 2026-10-01 (outline complete · Strategy Map presentation shipped)

---

## STATUS

- [x] Hero + Screens 1–4 (scaffolded in `strategy-map.html`)
- [x] Screen 5 outcomes — COMPLETE
- [x] Screen 6 лестница — COMPLETE
- [x] Screen 7 верхняя граница — COMPLETE
- [x] Screen 8 цена вышла вниз — COMPLETE
- [x] Screen 9 рынок не вернулся — COMPLETE
- [x] Screen 10 возвращаем ETH — COMPLETE
- [x] Screen 11 развилка — COMPLETE
- [x] Screen 12 цена вышла вверх — COMPLETE
- [x] Screen 13 вся система целиком — COMPLETE
- [x] Screen 14 Финальная мысль + 3 products — COMPLETE (awaiting final wrap notes if any)
- [ ] Final wrap-up notes — optional

---

## PRODUCT ARCHITECTURE (HARD RULES)

- Не надо дублировать Lego Labs.
- Strategy Map объясняет решение → Lego Labs его считает.
- Strategy Map = educational / decision story; Lego Labs = calculator.
- Link only via CTA («Открыть Lego Labs →»). No embed / rebuild of calculator inside Strategy Map.
- **Core thesis:** Стратегия не меняется из-за движения цены. Меняется только её текущий этап.

## VISUAL POLICY (HARD RULES)

- Numbers, ranges, ladders, ETH/USDC mix, progress, flowchart, counters = **HTML/CSS/SVG only**.
- Do NOT use AI-generated images for logic/digital UI (полосы диапазонов, стрелки, карточки, состав ETH/USDC, лестница, progress, flowchart).
- Optional later: max 3–5 decorative illustrations (cover, two goals metaphor, market stress, final map vibe) — **do not block v1**; ship HTML/SVG first.

---

## ЭКРАН 5 — bottom outcomes (COMPLETE)

Context: ETH viz, narrow vs wide ranges, crash anim, dual positions.

### Узкий диапазон
- условный ориентир: $2,750
- при $1,500: −45.5%

### Широкий диапазон
- условный ориентир: $2,250
- при $1,500: −33.3%

### Пояснение
И пояснение, что это иллюстрация принципа; фактическая средняя цена LP рассчитывается по реальному составу позиции.

### Design note (viz > text)
Это намного лучше объясняет идею, чем три абзаца Telegram.

⸻

## ЭКРАН 6. Не выбирайте один диапазон (COMPLETE)

Теперь появляется «лестница».

### Лестница (allocation · band)

| Share | Band |
|------:|------|
| 10% | $2,500 ━━━━━ $3,000 |
| 20% | $2,200 ━━━━━━━━━ $3,000 |
| 30% | $1,800 ━━━━━━━━━━━━━━━ $3,000 |
| 40% | $1,500 ━━━━━━━━━━━━━━━━━━━━ $3,000 |

### Справа вертикально
- Доходность ↑ — наверху.
- Устойчивость ↑ — внизу.

### Главная фраза
Чем агрессивнее диапазон, тем меньшую долю капитала он получает. Чем больше запас движения вниз — тем больше капитала можно направить в эту часть конструкции.

### Design note (polish / priority)
Это может быть один из самых красивых экранов всей платформы.

⸻

## ЭКРАН 7. Почему верхнюю границу можно держать ближе (COMPLETE)

- Цена $2,700.
- Следующий сильный уровень условно $3,000.
- Визуально ETH движется вверх: $2,700 → $2,800 → $2,900 → $3,000
- А рядом состав LP:
  - ETH 50% / USDC 50%
  - постепенно превращается в:
  - ETH 0% / USDC 100%
- Параллельно счётчик: Fees collected +$…
- Главный смысл: При выходе через верхнюю границу капитал постепенно конвертируется в стейблкоин. Поэтому при стратегии максимизации денежного потока верхнюю границу можно располагать относительно близко к рынку и ориентировать на сильные уровни.
- Nuance / disclaimer: Я бы только не писал категоричное «здесь никаких рисков нет». Риск смарт-контракта, токенов, протокола и т. п. никуда не исчезает. Здесь отсутствует именно риск ликвидации собственного LP-капитала.

⸻

## ЭКРАН 8. Цена вышла вниз (COMPLETE)

Вот здесь начинается уже интерактивная история.

- Красная линия: LOWER RANGE: $2,500
- Цена: 2700 → 2550 → 2470
- Появляется: OUT OF RANGE
- И огромная кнопка не «Rebalance».
  - А: НЕ ДЕЛАТЬ НИЧЕГО
- Ниже: Наблюдаем ~3 дня
- И небольшая анимация длинной нижней тени: $2,700 → $2,420 → $2,620
- Takeaway: То есть визуально объясняем, почему не надо дёргаться после первого прокола.

⸻

## ЭКРАН 9. Рынок не вернулся (COMPLETE)

- Через условные три дня: Цена закрепилась ниже диапазона.
- Теперь: Считаем, что произошло с капиталом.
- Например:
  - Initial capital → $29,000
  - Final asset → 10 ETH
  - Average Formation Price = $2,900
- И огромная цифра: $2,900
- Takeaway: Теперь именно эта цена становится ориентиром следующего решения.

⸻

## ЭКРАН 10. Возвращаем ETH в работу (COMPLETE)

- Текущая цена: $2,700
- Средняя: $2,900
- Новый диапазон: $2,500 ━━━━━ $2,900 ━━━━━ $3,300
- Причём $2,900 физически находится ровно в центре картинки.
- Подпись: Average Formation Price
- И анимацией показать сценарий: ETH → LP → ETH/USDC → USDC при восстановлении рынка.
- Meta: Это практически визуальная версия твоего предыдущего VIP-поста.

⸻

## ЭКРАН 11. А если такой диапазон слишком широкий? (COMPLETE)

- Развилка:
  - Вариант А: ETH → Wide LP → Fees
  - Вариант Б: ETH → Collateral → ~40% Borrow → Narrow LP → Higher Fee Potential
- И предупреждение: Второй вариант возвращает кредитный риск. Поэтому перед его использованием конструкция должна пройти стресс-тест в Lego Labs.
- Кнопка: Открыть Lego Labs →
- Product note: Вот здесь появляется связь между продуктами.
- Design rule: Не надо дублировать Lego Labs.
- Architecture: Strategy Map объясняет решение → Lego Labs его считает.

⸻

## ЭКРАН 12. Цена вышла вверх

Отдельная короткая ветка. (Mirror/contrast to Screen 8 «цена вышла вниз».)

Full short up branch:
- $2,700 → $3,000 → $3,100
- OUT OF RANGE
- ↓
- Ждём подтверждение
- ↓
- USDC (capital converted to stable)
- ↓
- Определяем новый рыночный уровень
- ↓
- Открываем новый диапазон по тем же правилам

### Крупно (hero takeaway)
Стратегия не меняется из-за движения цены. Меняется только её текущий этап.

### Product thesis note
Это очень хорошая центральная мысль всего продукта.  
→ Elevate the hero above as **core product thesis** for Strategy Map.

⸻

## ЭКРАН 13. Вся система целиком

И вот здесь наконец появляется большая карта, ради которой всё строилось:

### Большая карта
1. ОПРЕДЕЛИ ЦЕЛЬ
   ↓
2. ВЫБЕРИ БАЗОВУЮ АРХИТЕКТУРУ
   - Накопление / Cash Flow
   ↓
3. ОПРЕДЕЛИ ИСТОЧНИК КАПИТАЛА
   - Own / Borrowed
   ↓
4. ВЫБЕРИ УРОВЕНЬ КОНЦЕНТРАЦИИ LP
   ↓
5. РАСПРЕДЕЛИ КАПИТАЛ ПО ДИАПАЗОНАМ
   ↓
6. ПРОВЕДИ STRESS TEST
   → Lego Labs (link only; explain ≠ calculate)
   ↓
7. ЗАПУСТИ ПОЗИЦИЮ
   ↓
8. PRICE IN RANGE?
   - Да → Collect Fees
   - Нет ↓
     - UP? → Wait → USDC → New Range
     - DOWN? → Wait → Calculate Average Price → New LP
       или Collateral → Borrow → New LP
       (mirrors Screen 11 fork A/B)
       ↓
       и стрелка обратно к: MONITOR
       (wraps the PRICE IN RANGE? / collect-fees cycle)

### Design note (viz treatment)
Это уже можно красиво анимировать как карту метро или flowchart.

⸻

## ЭКРАН 14. Финальная мысль

Практически пустой экран.

Большими буквами:
1. Вам не нужно каждый день решать, что делать с портфелем.
2. Это нужно решить один раз — до того, как рынок заставит принимать решение эмоционально.

И ниже три продукта:
1. STRATEGY MAP — «Понимаю, что делать.»
2. LEGO LABS — «Проверяю, выдержит ли это рынок.»
3. NAVIGATOR — «Контролирую реальные позиции.»

### Meta
Вот это уже выглядит как единая экосистема.

⸻
<!-- Screen 14 products complete · awaiting final wrap-up notes if any · then implement + push -->

---

## STILL MISSING

- (none blocking for v1)


## IMPLEMENTATION NOTES

- Page: `strategy-map.html` — full scroll-snap presentation (Hero + 1–14)
- Entry from calculator: `index.html` / `portfolio.html` → Strategy Map button
- Do NOT break calculator / simulator
- CTA to Lego Labs = link only (portfolio.html), no embed
- Shipped: 2026-10-01 · https://lego-labs.vercel.app/strategy-map

## NAV / UX (HARD)
- Full-viewport scenes (not article scroll of 15 stacked sections)
- Scene-to-scene transform on scroll (scroll-snap)
- Mobile: vertical stack of full scenes
- Desktop: large center viz + short side text
- HTML/CSS/SVG for logic viz; optional max 3–5 decorative later — do not block v1

## PRODUCT POSITIONING (HARD)
- Strategy Map = visual version of the 5 VIP posts (no new content fill-in)
- NOT a Strategy Builder / questionnaire / анкета
- No amount inputs / no calculator forms on Map
- Personal calc → CTA opens Lego Labs only
- VIP posts remain the full text strategy
- «Это гораздо точнее попадает в первоначальную идею, чем ещё один Strategy Builder с анкетой.»

## SHIPPED TO PRODUCTION


## OUTLINE COMPLETE — Strategy Map implemented as scroll-snap presentation (HTML/CSS/SVG).
