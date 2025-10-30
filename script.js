(() => {
	const burger = document.querySelector('.burger')
	const overlay = document.getElementById('overlayMenu')
	
	if (!burger || !overlay) return
	
	const grid = overlay.querySelector('.overlay-menu__grid')
	const leftList = overlay.querySelector('.overlay-menu__sections')
	const submenu = document.getElementById('overlaySub')
	const arrowBtn = overlay.querySelector('.overlay-menu__arrow')
	const mq = window.matchMedia('(max-width: 1024px)')
	
	// Лок/анлок скролла
	const setLocked = (on) => {
		document.documentElement.classList.toggle('overlay-lock', on)
		document.body.classList.toggle('overlay-lock', on)
	}
	
	// Открыть/закрыть оверлей (единая точка управления состоянием)
	const setOverlayOpen = (open) => {
		burger.classList.toggle('is-open', open)
		overlay.classList.toggle('active', open)
		overlay.setAttribute('aria-hidden', String(!open))
		burger.setAttribute('aria-expanded', String(open))
		setLocked(open)
		
		if (open) document.addEventListener('keydown', onEsc)
		else document.removeEventListener('keydown', onEsc)
		
		if (!open && mq.matches && submenu && arrowBtn) {
			submenu.classList.remove('is-open')
			arrowBtn.setAttribute('aria-expanded', 'false')
		}
	}
	
	const onEsc = (e) => (e.key === 'Escape') && setOverlayOpen(false)
	
	// Тоггл оверлея
	burger.addEventListener('click', () => {
		setOverlayOpen(!overlay.classList.contains('active'))
	})
	
	// Мобильное поведение «Услуги» / перенос подменю
	if (leftList && submenu && arrowBtn && grid) {
		const placeSubmenu = () => {
			if (mq.matches) {
				const firstLi = leftList.firstElementChild
				if (firstLi && submenu.parentElement !== leftList) firstLi.after(submenu)
				
				submenu.classList.remove('is-open')
				arrowBtn.disabled = false
				arrowBtn.setAttribute('aria-disabled', 'false')
				arrowBtn.setAttribute('aria-expanded', 'false')
			} else {
				if (submenu.parentElement !== grid) grid.appendChild(submenu)
				
				submenu.classList.remove('is-open')
				arrowBtn.disabled = true
				arrowBtn.setAttribute('aria-disabled', 'true')
				arrowBtn.setAttribute('aria-expanded', 'false')
			}
		}
		
		placeSubmenu()
		mq.addEventListener('change', placeSubmenu)
		
		arrowBtn.addEventListener('click', () => {
			if (!mq.matches) return
			const open = !submenu.classList.contains('is-open')
			submenu.classList.toggle('is-open', open)
			arrowBtn.setAttribute('aria-expanded', String(open))
		})
	}
})()
