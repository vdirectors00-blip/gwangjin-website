-- =====================================================================
-- 제품 10종 시드 데이터 (제품.pdf 기반)
-- 특성 매트릭스: 경량/보온/다운대체/친환경/저자극/세탁OK/탄성복원/흡습통기
-- 하이라이트 3종: F/T(브랜드대표) · Tencel(친환경) · Wool(프리미엄 천연)
-- =====================================================================

insert into public.products (
  slug, sort_order, name, korean_name, short_desc, long_desc, use_tags,
  trait_lightweight, trait_warmth, trait_down_alt, trait_eco,
  trait_hypoallergenic, trait_washable, trait_resilient, trait_breathable,
  is_highlight, is_published
) values

-- 01. F/T (Feather Touch) — 브랜드 대표
('ft', 1,
 'F/T',
 'Feather Touch · 깃털감',
 '새의 깃털 느낌. 실리콘 처리한 Conjugate 섬유',
 E'중공형태를 유지하는 실리콘 처리 Conjugate 섬유입니다.\n\n휴비스 복합방사 기술에 의해 섬유의 단면을 채우지 않고 중공(中空)형태를 유지하며 생산되는 Conjugate Fiber에 최고 품질의 벌키성(Bulkiness)과 탄성(Resilience)을 구현했으며, 실리콘 특수가공으로 Soft Feeling을 추가로 부여했습니다.',
 ARRAY['이불솜', '패딩', '베개'],
 true, true, false, false, false, false, true, false,
 true, true),

-- 02. AR — 3차원 Conjugate
('ar', 2,
 'AR',
 '3차원 Conjugate',
 '중공 형태 + 3차원 입체 Crimp 구조',
 E'섬유의 단면을 채우지 않고 중공(中空)형태를 유지하면서 이중 폴리머(Polymer)의 복합방사 기술에 의해 형성되는 3차원구조의 입체 Crimp가 우수한 벌키성(Bulkiness) 및 탄성(Resilience)을 발휘합니다.\n\n가볍고 보온성이 뛰어납니다.',
 ARRAY['이불솜', '패딩'],
 true, true, false, false, false, false, true, false,
 false, true),

-- 03. PE (Solid 단면)
('pe', 3,
 'PE',
 'Solid 단면 폴리에스터',
 '부직포 공정 범용 폴리에스터 단섬유',
 E'일반적인 Solid 단면의 섬유로, 휴비스의 우수한 품질을 발현한 폴리에스터 단섬유 제품입니다.\n\n특히 적절한 Crimp를 부여함으로써 Carding성이 우수하며, 부직포 공정에 범용적으로 널리 사용됩니다.',
 ARRAY['부직포', '범용 충전재'],
 false, true, false, false, false, false, false, false,
 false, true),

-- 04. 저데니아 / N/FT
('low-denier', 4,
 '저데니아 / N/FT',
 '초극세 + F/T 혼합',
 '가벼운 섬도, F/T 터치감 결합 프리미엄',
 E'가볍고 얇은 원사로 만들어지는 솜은 많은 공기층이 형성되며, 이에 따라 다른 제품보다 통기성·탄력성·복원력이 우수합니다.\n\n저데니아와 F/T 섬유를 혼합한 것을 당사에서는 N/FT라고 부르며, 저데니아성에 F/T의 터치감과 특성을 더한 프리미엄 제품입니다.',
 ARRAY['프리미엄 이불솜', '경량 패딩'],
 true, true, true, false, false, false, true, true,
 false, true),

-- 05. Tencel (친환경 하이라이트)
('tencel', 5,
 'Tencel',
 '텐셀 · 셀룰로즈 친환경',
 '유칼립투스 펄프 기반 100% 생분해 친환경',
 E'목재펄프에서 원료를 추출하여 만든 100% 생분해가능한 친환경 무공해섬유입니다.\n\n매끄러운 섬유표면과 뛰어난 흡습성으로 민감한 피부에도 안심하고 사용할 수 있으며, 텐셀이 소량이라도 혼방된 원단은 내구성이 향상되어 의류제품의 형태가 매우 안정합니다.\n\n친수성이며 우수한 쿨링효과와 함께 수분관리를 최적화하는 셀룰로즈 섬유입니다.',
 ARRAY['친환경 베딩', '의류', '민감성 피부'],
 false, false, false, true, true, false, false, true,
 true, true),

-- 06. Wool (프리미엄 하이라이트)
('wool', 6,
 'Wool',
 '호주산 양모',
 '천연 양모, 따뜻함과 통기성을 동시에',
 E'양모의 꼬불꼬불한 크림프가 공기를 많이 함유하고 있어 뙤약볕 아래에서는 열기를 차단해 더위를 막아주고, 추위 속에서는 외부로의 공기 유출을 막아 몸을 따뜻하게 보호합니다.\n\n비늘모양의 스케일로 표면이 덮여있어 물방울은 막아주고 습기는 빨아들임으로써 외부의 습도에 맞춰 섬유 내부의 온도를 스스로 조절하는 호흡기능을 가지고 있습니다.\n\n어떤 섬유보다도 탄력성이 커서 30% 정도 늘어났다가 다시 원상태로 돌아오는 복원력을 가진 섬유입니다. 난연성과 청결성도 우수합니다.',
 ARRAY['프리미엄 베딩', '의류', '천연소재'],
 false, true, false, false, false, true, true, true,
 true, true),

-- 07. 목화펀칭 (Cotton)
('cotton', 7,
 '목화펀칭',
 'Cotton · 천연 면화',
 '천연 면화, 온습도 자연 조절',
 E'면화(綿花)·목면(木綿)·목화(木花). 아욱과의 일년초로서 섬유 원료로 재배하는 농작물입니다.\n\n생산지는 미국·멕시코·파키스탄·인도·이집트 등으로, 산지에 따라 섬유의 길이와 굵기에 차이가 있습니다. 이집트 면이나 해도면(海島綿)이 그 대표격입니다.\n\n습할 때 강도가 붙어나므로 세탁에 강하고 보온성과 방서성에 뛰어나며, 또한 수분이 증발할 때 열을 빼앗으므로 여름 의료로서도 최적입니다.\n\n광진실업에서는 목화의 결경(구겨짐, 오그라듬)을 이용하여 만들 수 있는 침구류 제품에 들어가는 목화펀칭 제품을 제조합니다.',
 ARRAY['천연 베딩', '솜이불', '여름용'],
 false, true, false, false, false, false, false, true,
 false, true),

-- 08. Outlast (NASA PCM)
('outlast', 8,
 'Outlast',
 '아웃라스트 · NASA PCM',
 'NASA PCM 기술, 능동 온도 조절',
 E'아웃라스트(Outlast®) 기술은 원래 NASA 우주인을 위해서 개발된 것으로, 쾌적한 온도를 유지하기 위해 열을 흡수·저장·방출하는 상변환 물질(PCM: Phase Change Material)을 사용합니다.\n\n음료 안에 들어있는 얼음과 비교할 수 있습니다. 음료를 더 오래 원하는 온도로 유지하기 위해 고체에서 액체로 바뀌면서 열을 흡수하고 음료를 시원하게 합니다.\n\n특징과 장점:\n• 수분을 관리하기 위한 열관리\n• 피부온도 조절과 발한 감소 작용\n• 습기에 반응하는 것이 아닌 사전에 열을 관리\n• 온도 변화가 최소화될 때 신진대사 에너지가 보존됨',
 ARRAY['기능성 베딩', '아웃도어', '온도조절'],
 false, true, true, false, false, false, false, false,
 false, true),

-- 09. Needle Punching
('needle-punching', 9,
 'Needle Punching',
 '니들펀칭 가공',
 '솔리드 단면 섬유 압축 가공',
 'Solid 단면 섬유(일반 패딩)를 니들펀칭기로 앞뒤로 Punching하여 섬유를 압축시킨 상태의 제품입니다.',
 ARRAY['부자재', '가공 부직포'],
 false, false, false, false, false, false, false, false,
 false, true),

-- 10. Felt · 견면 · 카페트
('felt', 10,
 'Felt',
 '견면 · 카페트 베이스',
 '고데니어 견면, 침대 부자재·카페트용',
 '섬도가 높은(15데니어, 20데니어) Solid 단면 섬유를 니들펀칭기로 앞뒤로 Punching하여 섬유를 압축시킨 상태로, 침대 부자재 및 카페트로 많이 활용되고 있습니다.',
 ARRAY['카페트', '침대 부자재'],
 false, true, false, false, false, false, false, false,
 false, true)

on conflict (slug) do nothing;
