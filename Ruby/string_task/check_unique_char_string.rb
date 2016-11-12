def isUnique?(str)
  status = true
  str.each_char do |v|
  	status = false unless str.count(v) == 1
  end
  status
end
