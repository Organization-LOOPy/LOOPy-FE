interface TimeInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function TimeInput({ value, onChange, placeholder }: TimeInputProps) {
    const toMasked = (raw: string) => {
        // 숫자만 추출(최대 4자리: HHMM)
        let digits = raw.replace(/\D/g, '').slice(0, 4);

        let hh = digits.slice(0, 2);
        let mm = digits.slice(2, 4);

        // 시 범위 제한
        if (hh.length === 2 && parseInt(hh, 10) > 23) {
        hh = '00';
        }
        // 분 범위 제한
        if (mm.length === 2 && parseInt(mm, 10) > 59) {
        mm = '00';
        }

        // 2자리 미만이면 그대로(콜론 없음)
        if (digits.length < 2) return hh;
        // 정확히 2자리면 자동 콜론까지 노출
        if (digits.length === 2) return `${hh}:`;
        // 3~4자리면 HH:MM (MM은 입력된 만큼 보임)
        return `${hh}:${mm}`;
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const next = toMasked(e.target.value);
        onChange(next);
    };
    
    const handleBlur = () => {
        if (!value) return;
        const digits = value.replace(/\D/g, '').padEnd(4, '0').slice(0, 4);
        let hh = digits.slice(0, 2);
        let mm = digits.slice(2, 4);

        if (parseInt(hh, 10) > 23) hh = '00';
        if (parseInt(mm, 10) > 59) mm = '00';

        const normalized = `${hh}:${mm}`;
        if (normalized !== value) onChange(normalized);
    };

    return (
        <input
            type="text"
            inputMode="numeric"
            maxLength={5}            // HH:MM
            value={value}
            placeholder={placeholder ?? '00:00'}
            onChange={handleChange}
            onBlur={handleBlur}
            className="
                text-[1rem] font-semibold text-[#A8A8A8] leading-[100%] w-[6.25rem]
                px-[1.5rem] py-[0.75rem]
                rounded-[0.5rem] bg-white
                border border-white outline-none focus:border-[#6970F3] text-center
            "
        />
    );
}
