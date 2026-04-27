-- =====================================================================
-- 제품 5개 추가 시드 (엑셀 연혁.xlsx에서 발견)
-- 프리미엄 천연 / 기능성 라인
-- =====================================================================

insert into public.products (
  slug, sort_order, name, korean_name, short_desc, long_desc, use_tags,
  trait_lightweight, trait_warmth, trait_down_alt, trait_eco,
  trait_hypoallergenic, trait_washable, trait_resilient, trait_breathable,
  is_highlight, is_published
) values

-- 11. 캐시미어 (프리미엄 천연)
('cashmere', 11,
 'Cashmere',
 '캐시미어 · Cashmere Wool',
 '가볍고 부드러운 프리미엄 천연 섬유',
 E'매우 가늘고 부드러운 천연 섬유로, 피부에 닿는 촉감이 뛰어납니다.\n\n가볍지만 보온성이 우수해 겨울철에도 따뜻하고 편안하게 착용할 수 있으며, 생산량이 적고 채취가 까다로워 희소성이 높은 프리미엄 소재입니다.\n\n정전기 발생이 적고 내구성이 높아 장기간 사용이 가능합니다.',
 ARRAY['프리미엄 베딩', '의류', '고급 충전재'],
 true, true, false, false, true, false, false, true,
 false, true),

-- 12. 난연패딩 (기능성 가공)
('flame-retardant', 12,
 'Flame-Retardant',
 '난연 패딩',
 '화재 시 자체 소화되는 고기능성 안전 충전재',
 E'특수 난연 섬유를 적용하여 화재 시 연소 확산을 효과적으로 지연시키고, 불꽃 제거 시 자체 소화되는 안전성을 갖춘 고기능성 충전재입니다.\n\n내구성과 보온성을 동시에 고려하여 쾌적한 사용 환경을 제공합니다. 공공시설·상업 공간·방염 기준이 필요한 분야에 적합합니다.',
 ARRAY['방염', '공공시설', '기능성'],
 false, true, false, false, false, false, false, false,
 false, true),

-- 13. Smartcel (친환경 기능성)
('smartcel', 13,
 'Smartcel',
 '스마트셀 · 아연 기능성 섬유',
 '유칼립투스 + 산화아연, 유아용 적합',
 E'유칼립투스에서 추출한 목재 펄프 기반의 리오셀(Lyocell) 섬유와 특수 고급 아연 성분이 결합된 스마트셀(Smartcel™) 기능성 소재로, 피부 보호 기능에 특화되어 있습니다.\n\n구김이 적고 면 대비 뛰어난 흡습성을 지니며, 빠른 건조 속도로 쾌적한 착용감을 제공합니다. 친환경적인 생산 공정을 통해 제조되며 생분해성을 갖춘 대표적인 지속가능 섬유입니다.\n\n의약품 등급의 산화아연(Zinc Oxide)을 적용하여 민감 피부에서도 알레르기 및 자극 반응을 최소화하며, 자외선 차단 및 항산화 효과를 제공하여 유아용 제품에도 적합한 안전성을 갖추고 있습니다.',
 ARRAY['친환경', '유아용', '민감성 피부', '기능성'],
 false, false, false, true, true, false, false, true,
 false, true),

-- 14. 모헤어패딩 (프리미엄 천연)
('mohair', 14,
 'Mohair',
 '모헤어 · Mohair Padding',
 '광택과 부드러움을 겸비한 천연 충전재',
 E'광순백색으로 광택이 풍부하여 고급스러우며 캐시미어와 같은 부드러움과 뛰어난 보온성, 우수한 통기성을 동시에 갖춰 겨울철에도 쾌적한 수면 환경을 제공합니다.\n\n자연스러운 광택이 풍부하여 시각적으로도 고급스러운 마감감을 연출합니다.',
 ARRAY['프리미엄 베딩', '고급 충전재'],
 false, true, false, false, false, false, false, true,
 false, true),

-- 15. 알파카패딩 (프리미엄 천연)
('alpaca', 15,
 'Alpaca',
 '알파카 · Alpaca Padding',
 '라놀린 미함유, 위생적인 프리미엄 천연',
 E'알파카 섬유를 충전재로 사용한 프리미엄 침구로, 가볍지만 뛰어난 보온성과 우수한 통기성을 갖춘 것이 특징입니다.\n\n알파카 섬유는 공기층 형성이 뛰어나 체온을 효과적으로 유지하면서도 답답함이 적어 쾌적한 수면 환경을 제공합니다.\n\n또한 라놀린 함량이 거의 없어 보다 깔끔하고 산뜻한 촉감을 제공하며, 냄새와 유분감이 적어 위생적인 사용이 가능합니다. 이로 인해 민감한 사용자나 쾌적한 수면 환경을 선호하는 경우에 적합한 소재로 평가됩니다.',
 ARRAY['프리미엄 베딩', '민감성 피부', '고급 충전재'],
 true, true, false, false, true, false, false, true,
 false, true)

on conflict (slug) do nothing;

-- 회사정보의 제품 수도 15로 업데이트
update public.company_info set product_count = 15 where id = 1;
