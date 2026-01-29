#!/bin/bash

# Script de validation automatique - Neuroptimize POC v5.3
# Usage: ./validate.sh

set -e  # Exit on error

echo "🚀 Validation Neuroptimize POC v5.3"
echo "===================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
PASSED=0
FAILED=0

# Test function
test_step() {
    echo -n "Testing: $1... "
    if eval "$2" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ PASS${NC}"
        ((PASSED++))
        return 0
    else
        echo -e "${RED}❌ FAIL${NC}"
        ((FAILED++))
        return 1
    fi
}

# Test function with output
test_step_verbose() {
    echo "Testing: $1..."
    if eval "$2"; then
        echo -e "${GREEN}✅ PASS${NC}"
        ((PASSED++))
        return 0
    else
        echo -e "${RED}❌ FAIL${NC}"
        ((FAILED++))
        return 1
    fi
    echo ""
}

echo "📦 Phase 1: Dependencies"
echo "------------------------"
test_step "Node.js installed" "node --version"
test_step "npm installed" "npm --version"
test_step "node_modules exists" "test -d node_modules"
echo ""

echo "🔧 Phase 2: Project Structure"
echo "------------------------------"
test_step "package.json exists" "test -f package.json"
test_step "tsconfig.json exists" "test -f tsconfig.json"
test_step "next.config.ts exists" "test -f next.config.ts"
test_step "app/ directory exists" "test -d app"
test_step "components/ directory exists" "test -d components"
test_step "hooks/ directory exists" "test -d hooks"
test_step "lib/ directory exists" "test -d lib"
test_step "types/ directory exists" "test -d types"
test_step "public/ directory exists" "test -d public"
echo ""

echo "📄 Phase 3: Core Files"
echo "----------------------"
test_step "app/layout.tsx exists" "test -f app/layout.tsx"
test_step "app/page.tsx exists" "test -f app/page.tsx"
test_step "app/globals.css exists" "test -f app/globals.css"
test_step "types/exercise.ts exists" "test -f types/exercise.ts"
test_step "lib/constants.ts exists" "test -f lib/constants.ts"
test_step "lib/feedback.ts exists" "test -f lib/feedback.ts"
echo ""

echo "🎨 Phase 4: Components"
echo "----------------------"
test_step "Neuron component" "test -f components/Neuron.tsx"
test_step "NeuralNetwork component" "test -f components/NeuralNetwork.tsx"
test_step "ChatContainer component" "test -f components/ChatContainer.tsx"
test_step "MessageBubble component" "test -f components/MessageBubble.tsx"
test_step "MessageList component" "test -f components/MessageList.tsx"
test_step "QuickReplyButtons component" "test -f components/QuickReplyButtons.tsx"
test_step "TypingIndicator component" "test -f components/TypingIndicator.tsx"
test_step "ExerciseControls component" "test -f components/ExerciseControls.tsx"
echo ""

echo "🪝 Phase 5: Hooks"
echo "-----------------"
test_step "useSequenceGenerator hook" "test -f hooks/useSequenceGenerator.ts"
test_step "useExerciseState hook" "test -f hooks/useExerciseState.ts"
echo ""

echo "🎯 Phase 6: Assets"
echo "------------------"
test_step "Max avatar SVG" "test -f public/max-avatar.svg"
test_step "Favicon SVG" "test -f public/favicon.svg"
echo ""

echo "🧪 Phase 7: Tests"
echo "-----------------"
test_step "useSequenceGenerator tests" "test -f hooks/__tests__/useSequenceGenerator.test.ts"
test_step "useExerciseState tests" "test -f hooks/__tests__/useExerciseState.test.ts"
test_step "feedback tests" "test -f lib/__tests__/feedback.test.ts"
test_step_verbose "Run unit tests" "npm run test"
echo ""

echo "🔨 Phase 8: TypeScript Compilation"
echo "-----------------------------------"
test_step_verbose "TypeScript compiles" "npx tsc --noEmit"
echo ""

echo "🏗️  Phase 9: Next.js Build"
echo "---------------------------"
test_step_verbose "Next.js builds successfully" "npm run build"
echo ""

echo "📚 Phase 10: Documentation"
echo "---------------------------"
test_step "README.md exists" "test -f README.md"
test_step "TESTING_CHECKLIST.md exists" "test -f TESTING_CHECKLIST.md"
test_step "TICKETS_IMPLEMENTATION_v5.3.md exists" "test -f TICKETS_IMPLEMENTATION_v5.3.md"
echo ""

echo "=================================================="
echo "📊 RÉSULTATS DE LA VALIDATION"
echo "=================================================="
echo -e "${GREEN}✅ Tests passés: $PASSED${NC}"
if [ $FAILED -gt 0 ]; then
    echo -e "${RED}❌ Tests échoués: $FAILED${NC}"
    echo ""
    echo -e "${RED}⚠️  VALIDATION ÉCHOUÉE${NC}"
    exit 1
else
    echo -e "❌ Tests échoués: $FAILED"
    echo ""
    echo -e "${GREEN}🎉 VALIDATION RÉUSSIE !${NC}"
    echo ""
    echo "✅ Le POC Neuroptimize v5.3 est prêt pour la démo"
    echo ""
    echo "Pour lancer l'application :"
    echo "  npm run dev"
    echo ""
    echo "Puis ouvrir : http://localhost:3000"
    exit 0
fi
