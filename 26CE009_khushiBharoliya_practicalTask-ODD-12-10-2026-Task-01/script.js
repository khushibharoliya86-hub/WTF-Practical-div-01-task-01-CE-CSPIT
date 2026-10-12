function calculateFee() {
    // S5 fixed: convert baseFee to Number to avoid text concatenation
    const baseFee = Number(document.getElementById("baseFee").value);
    const labFee = Number(document.getElementById("labFee").value);
    const semesters = Number(document.getElementById("semesters").value);
    const scholarship = document.getElementById("scholarship").value;
    
    const subtotal = baseFee + labFee;
    const rate = getRate(scholarship);
    const discount = calculateDiscount(subtotal, rate);
    
    // S6 fixed: policy requires 5% (0.05) instead of 50% (0.50)
    const adminCharge = subtotal * 0.05;
    const payable = calculateTotal(subtotal, discount, adminCharge);
    
    document.getElementById("result").textContent = "Subtotal: ₹" + subtotal + " | Discount: ₹" + discount + " | Administration: ₹" + adminCharge + " | Payable: ₹" + payable;
    document.getElementById("breakdown").textContent = buildBreakdown(payable, semesters);
}

function calculateDiscount(amount, percentage) {
    // TODO M6: Replace the return value with the formula for a percentage discount.
    return (amount * percentage) / 100;
}

function getRate(type) {
    // TODO D1: Use if / else if / else. Merit=20, Sports=10, None=0.
    if (type === "Merit") {
        return 20;
    } else if (type === "Sports") {
        return 10;
    } else {
        return 0;
    }
}

function calculateTotal(subtotal, discount, adminCharge) {
    // TODO D2: Return the payable amount after discount and administration charge.
    return subtotal - discount + adminCharge;
}

function buildBreakdown(payable, count) {
    // TODO D3: Use a for loop from semester 1 to count. Show cumulative fee (payable * semester).
    let breakdownText = "";
    for (let semester = 1; semester <= count; semester++) {
        const cumulativeFee = payable * semester;
        breakdownText += "Semester " + semester + ": Cumulative Fee = ₹" + cumulativeFee + "\n";
    }
    return breakdownText.trim();
}
